<template lang="pug">
.flex.flex-col.gap-3
  .flex.items-center.gap-3
    form(type='form' :actions='false' @submit.prevent='doSubmit' class='flex items-center gap-3')
      NAutoComplete(v-model:value='searchInput'  :input-props="{autocomplete: 'disabled'}" :options='searchOptions' style='width: 300px;' placeholder='Nhập email cần tìm')
      NSelect(v-model:value='roleInput' :options='roleOptions' style='width: 150px')
      NButton(type='tertiary' attr-type='submit') Tìm kiếm
    .ml-auto
      Button(@press="openModal()" color='text-white' bgcolor='bg-green-crayola' size='small' class='gap-1')
        icon-ic:round-plus.w-6.h-6.flex-shrink-0
        .font-bold Thêm
  NDataTable(:columns='columns' :data='users' :bordered='true' :pagination='pagination')
  UserModal(type='add' v-model:show="showModal")
</template>

<script setup lang="ts">
import type { IUser } from '@/dtos/user'
import { type DataTableColumns, NDataTable, NAutoComplete, NSelect, NButton } from 'naive-ui'
import { SYSTEM_ROLE } from '@/constant/role'
// Components
import UserAction from './UserAction.vue'
import Button from '../shared/button/Button.vue'
import UserModal from './UserModal.vue'
import useUsers from '@/composables/user/useUsers'
// ============= MODAL ADD USER ====================
// open close modal
const showModal = ref(false)
const openModal = () => (showModal.value = true)

// Search & filter section
// Search input
const input = ref({
  searchInput: '',
  roleInput: ''
})
const { roleInput, searchInput } = toRefs(input.value)
// Debounced Search Input
const search = refDebounced(searchInput, 200)
// Auto complete
const searchOptions = computed(() => {
  return ['@gmail.com', '@hcmute.edu.vn', '@yahoo.com'].map((suffix) => {
    const prefix = search.value.split('@')[0]
    return {
      label: prefix + suffix,
      value: prefix + suffix
    }
  })
})
// Select Role
const roleOptions = computed(() => {
  const roles = [
    {
      label: 'TẤT CẢ',
      value: ''
    }
  ]
  for (let role in SYSTEM_ROLE) {
    roles.push({
      label: SYSTEM_ROLE[role] as string,
      value: role
    })
  }
  return roles
})

// ========== TABLE DATA ===============
// Pagination
const pagination = reactive({
  page: 1,
  pageSize: 8,
  onChange: (page: number) => {
    pagination.page = page
  }
})
// Columns
const createColumns = (): DataTableColumns<IUser> => {
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
      title: 'Email',
      key: 'email',
      resizable: true,
      minWidth: 50,
      maxWidth: 300
    },
    {
      title: 'Điện thoại',
      key: 'phone',
      resizable: true,
      minWidth: 50,
      maxWidth: 300
    },
    {
      title: 'Tên',
      key: 'full_name',
      resizable: true,
      minWidth: 50,
      maxWidth: 100
    },
    {
      title: 'Quyền',
      key: 'role',
      resizable: true,
      minWidth: 50,
      maxWidth: 100,
      render(data) {
        return h('span', { class: 'font-medium' }, SYSTEM_ROLE[data.role])
      }
    },
    {
      title: 'Hành động',
      key: 'action',
      render(data) {
        return h('div', { class: 'flex justify-center' }, h(UserAction, { user: data }))
      },
      width: 100
    }
  ]
}

const columns = createColumns()
// Data
const { users, getUsers, paging } = useUsers()

onBeforeMount(() => {
  // if paging not null -> paging = null
  // assign paging -> auto getUsers (useUsers)
  if (!paging.value) paging.value = null
})
// Submit with params paging
const doSubmit = () => {
  console.log('🐔🦢 ~ doSubmit ~ data:', { ...input.value })
  paging.value = {
    page: pagination.page,
    search: input.value.searchInput,
    role: input.value.roleInput,
    litmit: 10
  }
}
</script>

<style scoped></style>
