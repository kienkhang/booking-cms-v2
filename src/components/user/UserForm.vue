<template lang="pug">
FormKit(type='form' v-model:model-value='form' name='signup_form' id='signup_form' @submit="doSubmit" :actions='false' style='width: 100%;')
    FormKit(type='text' label='Email' name="email" placeholder='Nhập email của bạn' validation="required|email" v-if='formType==="add"')
    FormKit(type='select' :options='roleOptions' label='Quyền' name="role" placeholder='Chọn trạng thái' validation="required" v-if='formType==="add"')
    FormKit(type='select' :options='statusOptions' label='Trạng thái' name="status" placeholder='Chọn trạng thái' validation="required" v-else)
    FormKit(type='text' label='Họ' name="first_name" placeholder='Nhập họ của bạn' validation="required")
    FormKit(type='text' label='Tên' name="last_name" placeholder='Nhập tên của bạn' validation="required")
    FormKit(type="password" label='Mật khẩu' name='password' placeholder='Nhập mật khẩu của bạn' validation="required|length:6")
    FormKit.block.w-full(type="submit" name='Signup' input-class='bg-green-500')
      span(v-if='!isLoading') {{ formType ==='add'? 'Tạo':'Cập nhật' }}
      icon-custom-load.w-4.h-4.animate-spin(v-else)
</template>

<script setup lang="ts">
import useUsers from '@/composables/user/useUsers'
import { SYSTEM_ROLE } from '@/constant/role'
import type { IUser, IAddUser, IUpdateUser } from '@/dtos/user'

// ================== PROPS =====================
const props = defineProps<{
  formType: 'add' | 'edit'
  user?: IUser
}>()

// ================== HANDLE FORM ========================
const isEditForm = computed(() => props.formType === 'edit')

const updateForm = ref<IUpdateUser>({
  first_name: props?.user?.first_name || '',
  last_name: props?.user?.last_name || '',
  status: props?.user?.status || 1,
  password: '',
  id: props.user?.id || ''
})
const createForm = ref<IAddUser>({
  email: '',
  first_name: '',
  last_name: '',
  role: '2',
  password: ''
})
const form = computed(() => (isEditForm.value ? updateForm.value : createForm.value))
// Select Role
const roleOptions = computed(() => {
  const roles = []
  for (let role in SYSTEM_ROLE) {
    if (!['1', '66'].includes(role))
      roles.push({
        label: SYSTEM_ROLE[role],
        value: role + ''
      })
  }
  return roles
})
// Select Status
const statusOptions = ref([
  {
    label: 'Mở khóa',
    value: 1
  },
  {
    label: 'Khóa',
    value: 2
  }
])

// ================== CALL API ========================
const { createUser, updateUser } = useUsers()
const { executeApi: exeCreate, isLoading: isCLoading } = createUser(createForm)
const { executeApi: exeUpdate, isLoading: isULoading } = updateUser(updateForm)
const isLoading = computed(() => isCLoading.value || isULoading.value)
// Submit data
const doSubmit = async () => {
  if (!isEditForm.value) {
    console.log('Add api')
    await exeCreate()
  } else {
    console.log('Update api')
    await exeUpdate()
  }
}
</script>

<style scoped></style>
