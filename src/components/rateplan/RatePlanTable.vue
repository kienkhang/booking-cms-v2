<template lang="pug">
.flex.flex-col.gap-3
  .flex.items-center.gap-3
    .ml-auto
      Button(@press="openModal()" color='text-white' bgcolor='bg-green-crayola' size='small' class='gap-1')
        icon-ic:round-plus.w-6.h-6.flex-shrink-0
        .font-bold Thêm
  NDataTable(:columns='columns' :data='ratePlans' :bordered='true' :pagination='pagination')
  RatePlanModal(type='edit' v-model:show='visible')

</template>

<script setup lang="ts">
import type { IRatePlan } from '@/dtos'
import { NDataTable, type DataTableColumns } from 'naive-ui'
import useRatePlan from '@/composables/rateplan/useRatePlan'
// Components
import RatePlanAction from './RatePlanAction.vue'
import RatePlanModal from '../shared/modal/RatePlanModal.vue'

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
      minWidth: 300,
      maxWidth: 400
    },
    {
      title: 'Loại gói',
      key: 'type',
      resizable: true,
      minWidth: 50,
      maxWidth: 300
    },
    {
      title: 'Ăn sáng',
      key: 'free_breakfast',
      resizable: true,
      minWidth: 50,
      maxWidth: 100
    },
    {
      title: 'Ăn trưa',
      key: 'free_lunch',
      resizable: true,
      minWidth: 50,
      maxWidth: 100
    },
    {
      title: 'Ăn tối',
      key: 'free_dinner',
      resizable: true,
      minWidth: 50,
      maxWidth: 100
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
const { ratePlans, filter } = useRatePlan()

onBeforeMount(() => {
  // if filter not null -> filter = null
  // assign filter -> auto get (useUsers)
  if (filter.value) {
    filter.value = null
  }
})
</script>

<style scoped></style>
