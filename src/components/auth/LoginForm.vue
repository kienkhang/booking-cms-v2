<template lang="pug">
.flex.flex-col.gap-6.items-center.justify-center.select-none.w-full
  //- .text-3xl.font-bold Đăng nhập

  FormKit(type='form' v-model:model-value="loginData" name='login_form' id='login_form' @submit="doLogin()" :actions='false' style='width: 100%; padding: 16px;')
    FormKit(type='text' label='Email' name="email" placeholder='Nhập email của bạn' validation="required|email")
    FormKit(type="password" label='Password' name='password' placeholder='Nhập mật khẩu của bạn' validation="required|length:6")
    FormKit.block.w-full(type="submit" name='login' input-class='bg-green-500') Login
    FormKit.block.w-full(type="button" input-class='bg-red-500' @click='doRefresh()') Refresh
    FormKit.block.w-full(type="button" input-class='bg-purple-500' @click='doGetMe()') Details
    

</template>

<script setup lang="ts">
import useAuth from '@/composables/useAuth'
const loginData = reactive({
  email: '',
  password: ''
})
const { getRToken } = useAuthStorage()
const refreshToken = getRToken()
const { login, refresh, getMe } = useAuth()

const { execute } = login({})
const doLogin = () => execute({ data: { ...loginData } })
const doRefresh = () => refresh().execute({ data: { refresh_token: refreshToken } })
const doGetMe = () => getMe().execute()
</script>

<style scoped></style>
