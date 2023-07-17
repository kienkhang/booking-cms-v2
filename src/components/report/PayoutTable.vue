<template lang="pug">
div
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
import { useClipboard } from '@vueuse/core'
import { Icon } from '@iconify/vue'

// Import mess hook
const mess = useMessage()

// Call api
const { filter, page, calculatedPaging } = storeToRefs(useGetPayouts())

const { getPayoutsPartner } = useGetPayouts()
const { executeApi: fetchPayoutsPartner, isLoading } = getPayoutsPartner()
onMounted(() => fetchPayoutsPartner())

// data filled
// payment_date is updated_at
type TableData = {
  // index:number
  open_at: string
  payout_id: string
  hotel_name: string
  total_request: number
  total_price: number
  hotel_bank: string
  resolve: boolean
  payer_name: string
  payment_date: string
}
const data = computed<TableData[]>(() =>
  calculatedPaging.value.data.map((payment) => {
    return {
      open_at: dayjs(payment.open_at).format('YYYY-MM-DD'),
      payout_id: payment.id,
      hotel_name: payment.hotel.name,
      total_request: payment.total_request,
      total_price: payment.total_price,
      hotel_bank: `${payment.hotel.bank_beneficiary} - ${payment.hotel.bank_name} - ${payment.hotel.bank_account}`,
      payer_name: payment?.payer.full_name ?? 'Chưa có',
      payment_date: dayjs(payment.updated_at).format('YYYY-MM-DD'),
      resolve: payment.resolve
    }
  })
)

// handle selection row
// If user select -> checkedRowKeys includes booking_id each row
const rowKey = (row: TableData) => row.payout_id
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
  copyBooking: (bookingId: string) => void
}): DataTableColumns<TableData> {
  return [
    {
      type: 'selection',
      disabled(row) {
        return row.resolve
      }
    },
    {
      title: 'Gửi ngày',
      key: 'open_at'
      // align: 'center'
    },
    {
      title: 'Mã yêu cầu',
      key: 'payout_id',
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
              row.payout_id
            ),
            // Icon copy
            h(Icon, {
              icon: 'ph:copy',
              class: 'w-4 h-4 flex-shrink-0 cursor-pointer',
              onClick: () => copyBooking(row.payout_id)
            })
          ]
        )
      }
      // align: 'center'
    },
    {
      title: 'Khách sạn',
      key: 'hotel_name'
      // align: 'center'
    },
    {
      title: 'Tổng yêu cầu',
      key: 'total_request'
      // align: 'center'
    },
    {
      title: 'Giá',
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
      title: 'Ngân hàng',
      key: 'hotel_bank'
    },
    {
      title: 'Trạng thái thanh toán',
      key: 'resolve'
    },
    {
      title: 'Người thanh toán',
      key: 'payer_name'
    },
    {
      title: 'Ngày thanh toán',
      key: 'payment_date'
    }
  ]
}

// ---- HANDLE PAGING HOTEL ----
async function updatePage() {
  calculatedPaging.value.changeServerPage(() => {
    filter.value.page = calculatedPaging.value.alpha
    fetchPayoutsPartner()
  })
}

// ========== HANDLE COPY PAYOUT REQUEST ========

// destruct useClipboard
const { copy } = useClipboard()
// create columns
const columns = createColumns({
  copyBooking(bookingId) {
    copy(bookingId)
    mess.success('Copied')
  }
})
</script>

<style scoped></style>
