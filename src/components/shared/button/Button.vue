<template lang="pug">
button.inline-flex.items-center.gap-2.rounded-md.transition-all(:class='["active:focus:scale-95 hover:bg-opacity-90",bgcolor,color,btnClass,{ "py-1 px-3":size==="small"},{ "py-2 px-4":size==="medium"},{ "py-3 px-6":size==="large"}]' @click='$emit("press")')
  slot

</template>

<script setup lang="ts">
type TButton = 'small' | 'medium' | 'large'

defineProps<{
  bgcolor?: string
  color?: string
  btnClass?: string
  size?: TButton
}>()
// defineProps({
//   bgcolor: {
//     type: String,
//     default: ''
//   },
//   color: {
//     type: String,
//     default: ''
//   },
//   prefixIcon: {
//     type: String,
//     default: ''
//   },
//   suffixIcon: {
//     type: String,
//     default: ''
//   },
//   btnClass: {
//     type: String,
//     default: ''
//   },
//   label: {
//     type: String,
//     default: 'Button'
//   },
//   size: {
//     type: Object as PropType<TButton>,
//     default: 'small'
//   }
// })
defineEmits<{
  (e: 'press'): void
}>()
// Hello
</script>

<style scoped></style>
