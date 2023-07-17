<template lang="pug">
div(v-auto-animate)
  p.text-lg.font-bold Khách sạn được chọn:
  p.text-lg {{ currentHotel?.name }}
  .payout-action.flex.items-center.gap-3.mt-6(v-if='checkedRowKeys.length > 0')
    Button.p-2.rounded-md.border.text-white.bg-red-500(type='button' size="medium" @press="sendPayout") Yêu cầu thanh toán
    p Bạn đã chọn {{ checkedRowKeys.length }}
  NDataTable.mt-6(
    :columns='columns',
    :data='data',
    :bordered='true',
    :loading='isLoading'
    v-model:checked-row-keys="checkedRowKeys"
    :row-key='rowKey'
    @update:checked-row-keys='handleCheck'
  )
  .flex.flex-row-reverse.mt-6 
    NPagination(
      v-model:page='page'
      :page-count='calculatedPaging?.total_pages'
      @update:page='updatePage'
    )
</template>

<script setup lang="ts">
import { NPagination, type DataTableRowKey, type DataTableColumns, NDataTable } from 'naive-ui'
import dayjs from 'dayjs'
import { VND } from '@/utils/format'
import { useClipboard } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import Button from '../shared/button/Button.vue'

// Import mess hook
const mess = useMessage()
const dialog = useDialog()

// ========= HOTEL ==========
const { hotelId } = useHotelStorage()
const { currentHotel } = storeToRefs(useHotelsStore())

// Call api
const { filter, page, calculatedPaging } = storeToRefs(useReport())

const { getReports } = useReport()
const { executeApi: fetchReports, isLoading } = getReports()

// data filled
type TableData = {
  // index:number
  booking_date: string
  booking_id: string
  start_at: string
  room_name: string
  total_price: string
  commission_rate: number
  payment_status: string
  payout_status: string
}
const data = computed<TableData[]>(() =>
  calculatedPaging.value.data.map((payment, index) => {
    return {
      // index:index,
      booking_date: dayjs(payment.created_at).format('YYYY-MM-DD'),
      booking_id: payment.id,
      start_at: dayjs(payment.start_at).format('YYYY-MM-DD'),
      room_name: payment.room_type_name,
      total_price: `${VND.format(payment.total_price)}`,
      commission_rate: payment.commission_rate,
      payment_status: payment.payment_status,
      payout_status: payment.payout_status
    }
  })
)

// handle selection row
// If user select -> checkedRowKeys includes booking_id each row
const rowKey = (row: TableData) => row.booking_id
// Array includes key that rowKey function return
const checkedRowKeys = ref<DataTableRowKey[]>([])
// Every user check value in table -> change checkedRowKeys by rowKeys params
function handleCheck(rowKeys: DataTableRowKey[]) {
  checkedRowKeys.value = rowKeys
}

// define columns name
// booking_date, payment_id, from, room type, total
function createColumns({
  copyBooking
}: {
  // viewDetail: (bookingId: string) => void
  copyBooking: (bookingId: string) => void
}): DataTableColumns<TableData> {
  return [
    {
      type: 'selection',
      disabled(row) {
        return ['sent', 'paid'].includes(row.payout_status)
      }
    },
    {
      title: 'Ngày',
      key: 'booking_date'
      // align: 'center'
    },
    {
      title: 'Mã đặt',
      key: 'booking_id',
      ellipsis: true,
      render(row: TableData) {
        return h(
          'div',
          {
            class: 'flex items-center gap-2'
          },
          [
            // Booking id
            h(
              'span',
              {
                class: 'truncate'
              },
              row.booking_id
            ),
            // Icon copy
            h(Icon, {
              icon: 'ph:copy',
              class: 'w-4 h-4 flex-shrink-0 cursor-pointer',
              onClick: () => copyBooking(row.booking_id)
            })
          ]
        )
      }
      // align: 'center'
    },
    {
      title: 'Đêm nghỉ',
      key: 'start_at'
      // align: 'center'
    },
    {
      title: 'Phòng',
      key: 'room_name',
      ellipsis: true,
      minWidth: 150
      // align: 'center'
    },
    {
      title: 'Price',
      key: 'total_price',
      // align: 'center'
      render(row: TableData) {
        return h(
          'span',
          {
            class: 'text-vivid font-semibold'
          },
          row.total_price
        )
      }
    },
    {
      title: 'Tỉ lệ hoa hồng',
      key: 'commission_rate'
    },
    {
      title: 'Trạng thái đêm nghỉ',
      key: 'payment_status'
    },
    {
      title: 'Trạng thái thanh toán',
      key: 'payout_status'
    }
  ]
}

// ---- HANDLE PAGING HOTEL ----
async function updatePage() {
  calculatedPaging.value.changeServerPage(() => {
    filter.value.page = calculatedPaging.value.alpha
    fetchReports()
  })
}

// destruct useClipboard
const { copy } = useClipboard()
// create columns
const columns = createColumns({
  // viewDetail(bookingId) {
  //   console.log('pay', bookingId)
  // },
  copyBooking(bookingId) {
    copy(bookingId)
    mess.success('Copied')
  }
})

// ========== HANDLE SEND PAYOUT REQUEST ========
const payoutSelects = computed(() => ({ payments: checkedRowKeys.value }))
const { send } = useRequestPayout()
const { executeApi: callSend } = send(payoutSelects, hotelId.value)

function sendPayout() {
  dialog.info({
    title: 'Thông báo',
    content: 'Thao tác sẽ gửi yêu cầu thanh toán đến khách sạn. Bạn chắc chắn ?',
    positiveText: 'Đồng ý',
    negativeText: 'Huỷ',
    async onPositiveClick() {
      await callSend()
      // Reset checkbox
      checkedRowKeys.value = []
      dialog.destroyAll()
    },
    onNegativeClick() {
      dialog.destroyAll()
    }
  })
}
</script>

<style scoped></style>
