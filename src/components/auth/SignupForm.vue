<template lang="pug">
.flex.flex-col.gap-6.items-center.justify-center.select-none.w-full
  //- .text-3xl.font-bold Đăng ký

  FormKit(type='form' name='login_form' id='login_form' @submit="doSignup()" :actions='false' style='width: 100%; padding: 16px;')
    FormKit(type='text' label='Email' name="email" placeholder='Nhập email của bạn' validation="required|email")
    FormKit(type='text' label='Họ' name="first_name" placeholder='Nhập họ của bạn' validation="required")
    FormKit(type='text' label='Tên' name="last_name" placeholder='Nhập tên của bạn' validation="required")
    FormKit(type="password" label='Mật khẩu' name='password' placeholder='Nhập mật khẩu của bạn' validation="required|length:6")
      //- Confirm rule: ``name = [field_name]_confirm & validation: confirm
    FormKit(type="password" label='Xác nhận mật khẩu' name='password_confirm' placeholder='Nhập lại mật khẩu của bạn' validation="required|confirm")
    FormKit.block.w-full(type="submit" name='login') Đăng ký
</template>

<script setup lang="ts">
const doSignup = () => {}
</script>
