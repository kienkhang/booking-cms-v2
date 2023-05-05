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
  NDataTable(:columns='columns' :data='data' :bordered='true' :pagination='pagination')
  UserModal(type='add' v-model:show="showModal")
</template>

<script setup lang="ts">
import type { User } from '@/dtos/user'
import { type DataTableColumns, NDataTable, NAutoComplete, NSelect, NButton } from 'naive-ui'
import { SYSTEM_ROLE } from '@/constant/role'
// Components
import UserAction from './UserAction.vue'
import Button from '../shared/button/Button.vue'
import UserModal from './UserModal.vue'
// ============= MODAL ADD USER ====================
// open close modal
const showModal = ref(false)
const openModal = () => (showModal.value = true)

// Search & filter section
// Search input
const input = ref({
  searchInput: '',
  roleInput: '51'
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
  const roles = []
  for (let role in SYSTEM_ROLE) {
    roles.push({
      label: SYSTEM_ROLE[role],
      value: role
    })
  }
  return roles
})
//

const doSubmit = () => {
  console.log('🐔🦢 ~ doSubmit ~ data:', { ...input.value })
}

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
const createColumns = (): DataTableColumns<User> => {
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
      maxWidth: 100
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
const data = ref<User[]>([
  {
    id: '123',
    avatar: '',
    created_at: '123',
    email: 'trankienkhang2210@gmail.com',
    first_name: 'Khang',
    last_name: 'Tran',
    full_name: 'Khang Tran',
    gender: false,
    phone: '0912874401',
    role: '1',
    status: 1,
    updated_at: '123',
    user_key_firebase: ''
  },
  {
    id: '123',
    avatar: '',
    created_at: '123',
    email: 'trankienkhang2210@gmail.com',
    first_name: 'Khang',
    last_name: 'Tran',
    full_name: 'Khang Tran',
    gender: false,
    phone: '0912874401',
    role: '1',
    status: 1,
    updated_at: '123',
    user_key_firebase: ''
  },
  {
    id: '123',
    avatar: '',
    created_at: '123',
    email: 'trankienkhang2210@gmail.com',
    first_name: 'Khang',
    last_name: 'Tran',
    full_name: 'Khang Tran',
    gender: false,
    phone: '0912874401',
    role: '1',
    status: 1,
    updated_at: '123',
    user_key_firebase: ''
  },
  {
    id: '123',
    avatar: '',
    created_at: '123',
    email: 'trankienkhang2210@gmail.com',
    first_name: 'Khang',
    last_name: 'Tran',
    full_name: 'Khang Tran',
    gender: false,
    phone: '0912874401',
    role: '1',
    status: 1,
    updated_at: '123',
    user_key_firebase: ''
  },
  {
    id: '123',
    avatar: '',
    created_at: '123',
    email: 'trankienkhang2210@gmail.com',
    first_name: 'Khang',
    last_name: 'Tran',
    full_name: 'Khang Tran',
    gender: false,
    phone: '0912874401',
    role: '1',
    status: 1,
    updated_at: '123',
    user_key_firebase: ''
  },
  {
    id: '123',
    avatar: '',
    created_at: '123',
    email: 'trankienkhang2210@gmail.com',
    first_name: 'Khang',
    last_name: 'Tran',
    full_name: 'Khang Tran',
    gender: false,
    phone: '0912874401',
    role: '1',
    status: 1,
    updated_at: '123',
    user_key_firebase: ''
  },
  {
    id: '123',
    avatar: '',
    created_at: '123',
    email: 'trankienkhang2210@gmail.com',
    first_name: 'Khang',
    last_name: 'Tran',
    full_name: 'Khang Tran',
    gender: false,
    phone: '0912874401',
    role: '1',
    status: 1,
    updated_at: '123',
    user_key_firebase: ''
  },
  {
    id: '123',
    avatar: '',
    created_at: '123',
    email: 'trankienkhang2210@gmail.com',
    first_name: 'Khang',
    last_name: 'Tran',
    full_name: 'Khang Tran',
    gender: false,
    phone: '0912874401',
    role: '1',
    status: 1,
    updated_at: '123',
    user_key_firebase: ''
  },
  {
    id: '123',
    avatar: '',
    created_at: '123',
    email: 'trankienkhang2210@gmail.com',
    first_name: 'Khang',
    last_name: 'Tran',
    full_name: 'Khang Tran',
    gender: false,
    phone: '0912874401',
    role: '1',
    status: 1,
    updated_at: '123',
    user_key_firebase: ''
  },
  {
    id: '123',
    avatar: '',
    created_at: '123',
    email: 'trankienkhang2210@gmail.com',
    first_name: 'Khang',
    last_name: 'Tran',
    full_name: 'Khang Tran',
    gender: false,
    phone: '0912874401',
    role: '1',
    status: 1,
    updated_at: '123',
    user_key_firebase: ''
  },
  {
    id: '123',
    avatar: '',
    created_at: '123',
    email: 'trankienkhang2210@gmail.com',
    first_name: 'Khang',
    last_name: 'Tran',
    full_name: 'Khang Tran',
    gender: false,
    phone: '0912874401',
    role: '1',
    status: 1,
    updated_at: '123',
    user_key_firebase: ''
  },
  {
    id: '123',
    avatar: '',
    created_at: '123',
    email: 'trankienkhang2210@gmail.com',
    first_name: 'Khang',
    last_name: 'Tran',
    full_name: 'Khang Tran',
    gender: false,
    phone: '0912874401',
    role: '1',
    status: 1,
    updated_at: '123',
    user_key_firebase: ''
  },
  {
    id: '123',
    avatar: '',
    created_at: '123',
    email: 'trankienkhang2210@gmail.com',
    first_name: 'Khang',
    last_name: 'Tran',
    full_name: 'Khang Tran',
    gender: false,
    phone: '0912874401',
    role: '1',
    status: 1,
    updated_at: '123',
    user_key_firebase: ''
  },
  {
    id: '123',
    avatar: '',
    created_at: '123',
    email: 'trankienkhang2210@gmail.com',
    first_name: 'Khang',
    last_name: 'Tran',
    full_name: 'Khang Tran',
    gender: false,
    phone: '0912874401',
    role: '1',
    status: 1,
    updated_at: '123',
    user_key_firebase: ''
  }
])
</script>

<style scoped></style>
