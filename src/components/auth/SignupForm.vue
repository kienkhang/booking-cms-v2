<template lang="pug">
.flex.flex-col.gap-6.items-center.justify-center.select-none.w-full
  //- .text-3xl.font-bold Đăng ký

  FormKit(type='form' v-model:model-value='signupData' name='signup_form' id='signup_form' @submit="doSignup()" :actions='false' style='width: 100%; padding: 16px;')
    FormKit(type='text' label='Email' name="email" placeholder='Nhập email của bạn' validation="required|email")
    FormKit(type='text' label='Họ' name="first_name" placeholder='Nhập họ của bạn' validation="required")
    FormKit(type='text' label='Tên' name="last_name" placeholder='Nhập tên của bạn' validation="required")
    FormKit(type="password" label='Mật khẩu' name='password' placeholder='Nhập mật khẩu của bạn' validation="required|length:6")
      //- Confirm rule: ``name = [field_name]_confirm & validation: confirm
    FormKit(type="password" label='Xác nhận mật khẩu' name='password_confirm' placeholder='Nhập lại mật khẩu của bạn' validation="required|confirm")
    FormKit.block.w-full(type="submit" name='Signup' input-class='bg-green-500') Đăng ký
</template>

<script setup lang="ts">
import useAuth from '@/composables/useAuth'

const signupData = reactive({
  email: '',
  password: '',
  first_name: '',
  last_name: ''
})

const { signup } = useAuth()
const { execute } = signup({})

const doSignup = () => execute({ data: { ...signupData } })
</script>
