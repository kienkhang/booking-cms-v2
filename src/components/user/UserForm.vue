<template lang="pug">
FormKit(type='form' v-model:model-value='form' name='signup_form' id='signup_form' @submit="doSubmit" :actions='false' style='width: 100%;')
    FormKit(type='text' label='Email' name="email" placeholder='Nhập email của bạn' validation="required|email" v-if='formType==="add"')
    FormKit(type='select' :options='roleOptions' label='Quyền' name="role" placeholder='Chọn trạng thái' validation="required" v-if='formType==="add"')
    FormKit(type='select' :options='statusOptions' label='Trạng thái' name="status" placeholder='Chọn trạng thái' validation="required" v-else)
    FormKit(type='text' label='Họ' name="first_name" placeholder='Nhập họ của bạn' validation="required")
    FormKit(type='text' label='Tên' name="last_name" placeholder='Nhập tên của bạn' validation="required")
    FormKit(type="password" label='Mật khẩu' name='password' placeholder='Nhập mật khẩu của bạn' validation="required|length:6")
    FormKit.block.w-full(type="submit" name='Signup' input-class='bg-green-500')
      span {{ formType ==='add'? 'Tạo':'Cập nhật' }}
</template>

<script setup lang="ts">
import { SYSTEM_ROLE } from '@/constant/role'
import type { User } from '@/dtos/user'

const props = defineProps<{
  formType: 'add' | 'edit'
  user?: User
}>()
const isEditForm = computed(() => props.formType === 'edit')
const form = isEditForm
  ? reactive({
      first_name: props?.user?.first_name || '',
      last_name: props?.user?.last_name || '',
      status: props?.user?.status || '',
      password: ''
    })
  : reactive({
      email: '',
      first_name: '',
      last_name: '',
      role: 2,
      password: ''
    })
// Select Role
const roleOptions = computed(() => {
  const roles = []
  for (let role in SYSTEM_ROLE) {
    if (!['1', '66'].includes(role))
      roles.push({
        label: SYSTEM_ROLE[role],
        value: role
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
// Submit data
const doSubmit = (data) => {
  console.log('🐔🦢 ~ doSubmit ~ data:', data)
}
</script>

<style scoped></style>
