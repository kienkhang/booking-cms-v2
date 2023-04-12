<template lang="pug">
n-tabs.siphoria-tab(
    type="line"
    size='large'
    :default-value='String(route?.name)'
    @update:value='update'
    :bar-width="500"
    justify-content='space-evenly'
    :tab-style='tabStyle'
    style='width:400px'
    animated
  )
  //- tab label của Tab, name là value của Tab
  n-tab-pane(name="login" tab="Đăng nhập")
    LoginForm
  n-tab-pane(name="signup" tab="Đăng ký")
    SignupForm
</template>

<script setup lang="ts">
import { NTabs, NTabPane } from 'naive-ui'
import { type CSSProperties } from 'vue'

const router = useRouter()
const route = useRoute()

const update = (name: string) => {
  router.push({ name })
}

const tabStyle = computed<CSSProperties>(() => ({
  width: '200px',
  minWidth: '100px',
  minHeight: '50px',
  textAlign: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  fontWeight: 600,
  textColor: '#616161'
}))
</script>

<style scoped></style>
