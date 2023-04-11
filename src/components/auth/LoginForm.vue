<template lang="pug">
.flex.flex-col.gap-6.items-center.justify-center.select-none.w-full
  //- .text-3xl.font-bold Đăng nhập

  FormKit(type='form' name='login_form' id='login_form' @submit="doLogin()" :actions='false' style='width: 100%; padding: 16px;')
    FormKit(type='text' label='Email' name="email" placeholder='Nhập email của bạn' validation="required|email")
    FormKit(type="password" label='Password' name='password' placeholder='Nhập mật khẩu của bạn' validation="required|length:6")
    FormKit.block.w-full(type="submit" name='login') Login

</template>

<script setup lang="ts">
const doLogin = () => {}
</script>

<style scoped></style>
