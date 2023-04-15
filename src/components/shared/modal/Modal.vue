<template lang="pug">
teleport(to='body')
  div(v-auto-animate)
    .modal-provider.fixed.inset-0.flex.items-center.justify-center(v-if="show" class='z-[9999]')
      .absolute.inset-0(class='bg-black/25 mask-overlay dark:bg-white/50' @click='$emit("mask-click")')
      .relative(class='z-50 body-modal')
        slot
</template>

<script setup lang="ts">
// Props
defineProps({
  show: {
    type: Boolean,
    default: false,
    required: true
  },
  maskClosable: {
    type: Boolean,
    default: true
  }
})
// Emits
defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'mask-click'): void
}>()
</script>

<style scoped></style>
