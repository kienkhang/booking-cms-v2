<template lang="pug">
NMessageProvider(placement='bottom-right')
  NDialogProvider
    RouterView
</template>

<script setup lang="ts">
import { NMessageProvider, NDialogProvider } from 'naive-ui'
import './styles/main.styl'
</script>

<style scoped></style>
