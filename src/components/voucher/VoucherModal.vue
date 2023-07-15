<template lang="pug">
NModal(
  :show='show'
  @mask-click='closeModal'
)
  .bg-white.rounded-lg.max-w-lg.w-full.px-5.pt-6(class='overflow-auto scroll-hide')
    CreateVoucherForm(@close-modal='closeModal')

</template>

<script setup lang="ts">
import { NModal } from 'naive-ui'
import CreateVoucherForm from './CreateVoucherForm.vue'

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', val: boolean): void
}>()

function closeModal() {
  emit('update:show', false)
}
</script>

<style scoped></style>
