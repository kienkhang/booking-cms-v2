<template lang="pug">
.flex.flex-col.gap-3
  .flex.items-center.gap-3
    .ml-auto
      Button(@press="openModal()" color='text-white' bgcolor='bg-green-crayola' size='small' class='gap-1')
        icon-ic:round-plus.w-6.h-6.flex-shrink-0
        .font-bold Thêm
  NDataTable(:columns='columns' :data='ratePlans' :bordered='true' :pagination='pagination' :loading='isLoading')
RatePlanModal(type='add' v-model:show='visible')

</template>

<script setup lang="ts">
import type { IRatePlan } from '@/dtos'
import { NDataTable, type DataTableColumns } from 'naive-ui'
import useRatePlan from '@/composables/rateplan/useRatePlan'
import { useRatePlanStore } from '@/stores'
import { Icon } from '@iconify/vue'
// Components
import RatePlanAction from './RatePlanAction.vue'
import RatePlanModal from '../shared/modal/RatePlanModal.vue'

// ===========  ROUTER & ROUTE HANDLER ===========
const route = useRoute()

// get room id from route
const roomId = computed(() => route.params.id as string)

// ===========  MODAL HANDLER ===========
// modal visible
const visible = ref(false)
// open modal function
const openModal = () => (visible.value = true)
// ========== TABLE HANDLER ===============
// Pagination
const pagination = reactive({
  page: 1,
  pageSize: 8,
  onChange: (page: number) => {
    pagination.page = page
  }
})
// create columns function
const createColumns = (): DataTableColumns<IRatePlan> => {
  return [
    {
      title: 'STT',
      key: 'stt',
      width: 60,
      // resizable: true,
      render(_, rowIndex) {
        return h('span', { class: 'font-semibold' }, rowIndex + 1)
      }
    },
    {
      title: 'Tên',
      key: 'name',
      resizable: true,
      minWidth: 200,
      maxWidth: 300
    },
    {
      title: 'Loại gói',
      key: 'type_rate_plan',
      resizable: true,
      minWidth: 150,
      maxWidth: 300,
      render(data) {
        return h(
          'span',
          { class: 'font-semibold' },
          data.type === '1' ? 'Hoàn tiền' : 'Không hoàn tiền'
        )
      }
    },
    {
      title: 'Ăn sáng',
      key: 'free_breakfast',
      resizable: true,
      minWidth: 50,
      maxWidth: 100,
      render(data) {
        return h(Icon, {
          icon: data.free_breakfast ? 'mdi:tick-circle' : 'mdi:cancel',
          color: data.free_breakfast ? '#54B435' : '#FF6464',
          width: 20,
          height: 20
        })
      }
    },
    {
      title: 'Ăn trưa',
      key: 'free_lunch',
      resizable: true,
      minWidth: 50,
      maxWidth: 100,
      render(data) {
        return h(Icon, {
          icon: data.free_lunch ? 'mdi:tick-circle' : 'mdi:cancel',
          color: data.free_lunch ? '#54B435' : '#FF6464',
          width: 20,
          height: 20
        })
      }
    },
    {
      title: 'Ăn tối',
      key: 'free_dinner',
      resizable: true,
      minWidth: 50,
      maxWidth: 100,
      render(data) {
        return h(Icon, {
          icon: data.free_dinner ? 'mdi:tick-circle' : 'mdi:cancel',
          color: data.free_dinner ? '#54B435' : '#FF6464',
          width: 20,
          height: 20
        })
      }
    },

    {
      title: 'Hành động',
      key: 'action',
      render(data) {
        return h('div', { class: 'flex justify-center' }, h(RatePlanAction, { ratePlan: data }))
      },
      width: 100
    }
  ]
}
const columns = createColumns()
// RatePlan data
const { ratePlans } = useRatePlan()

const { getRatePlans } = useRatePlanStore()

const { executeApi, isLoading } = getRatePlans(roomId)

onBeforeMount(() => {
  // if filter not null -> filter = null
  // assign filter -> auto get (useUsers)
  executeApi()
})
</script>

<style scoped></style>
