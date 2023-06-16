<template lang="pug">
.flex.flex-col.gap-6.items-center.justify-center.select-none.w-full
  //- .text-3xl.font-bold Đăng nhập
  FormKit(type='form' v-model:model-value="loginData" name='login_form' id='login_form' @submit="doLogin()" :actions='false' style='width: 100%; padding: 16px;')
    FormKit(type='text' label='Email' name="email" placeholder='Nhập email của bạn' validation="required|email")
    FormKit(type="password" label='Password' name='password' placeholder='Nhập mật khẩu của bạn' validation="required|length:1")
    FormKit.block.w-full(type="submit" name='login' input-class='w-full bg-green-500') Login
    

</template>

<script setup lang="ts">
import useAuth from '@/composables/useAuth'
import { FormKit } from '@formkit/vue'

const router = useRouter()

// Login Form
const loginData = ref({
  email: '',
  password: ''
})
const { login } = useAuth()

const { executeAPI: exeLogin } = login(loginData.value)

const doLogin = () =>
  exeLogin().then((resp) => {
    if (resp.data.value) {
      router.push('/')
    }
  })
</script>

<style scoped></style>
