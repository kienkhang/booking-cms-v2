<template lang="pug">
.flex.flex-col.gap-6.items-center.justify-center.select-none.w-full
  //- .text-3xl.font-bold Đăng nhập
  FormKit(type='form' v-model:model-value="loginData" name='login_form' id='login_form' @submit="doLogin()" :actions='false' style='width: 100%; padding: 16px;')
    .flex.flex-col.gap-2
      FormKit(type='text' label='Email' name="email" placeholder='Nhập email của bạn' validation="required|email")
      FormKit(type="password" label='Password' name='password' placeholder='Nhập mật khẩu của bạn' validation="required|length:1")
      FormKit.block.w-full(type="submit" name='login' input-class='w-full bg-crayola') Login
    

</template>

<script setup lang="ts">
import useAuth from '@/composables/useAuth'
import type { AxiosError } from 'axios'

const router = useRouter()

// Login Form
const loginData = ref({
  email: '',
  password: ''
})
//
const mess = useMessage()

const { login } = useAuth()

const { executeAPI: exeLogin } = login(loginData.value)

const doLogin = () =>
  exeLogin()
    .then(() => {
      router.push('/')
    })
    .catch(function (e: AxiosError) {
      mess.error((e.response.data as any).message)
    })
</script>

<style scoped></style>
