<template lang="pug">
div
  FormKit(type='form' :actions="false" @submit='doSubmit')
    FormKit(type='password', name='new_password', label='Mật khẩu mới' validation='required|length:6' placeholder='Nhập mật khẩu mới', v-model='form.new_password')
    FormKit(type='password', name='new_password_confirm', label='Nhập lại mật khẩu' validation='confirm' placeholder='Xác nhận mật khẩu')
    FormKit(type='submit') 
      span(v-if='!isLoading') Thay đổi
      icon-custom-load.w-8.h-8.animate-spin(v-else='')
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
// get token form querystring
const token = computed(() => route.query?.token)

// reactive form
const form = ref({
  new_password: '',
  token: token.value as string
})
// call api reset

const { reset } = useAuth()
const { isLoading, isFinished, error, executeAPI } = reset(form.value)
const doSubmit = () => {
  console.log(form.value)
  executeAPI()
}

until(isFinished && !error.value)
  .toBeTruthy()
  .then(() => {
    router.push({ name: 'auth' })
  })
</script>

<style scoped></style>
