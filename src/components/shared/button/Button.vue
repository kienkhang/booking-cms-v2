<template lang="pug">
button.inline-flex.items-center.rounded-md.transition-all(:class='["active:focus:scale-95 hover:bg-opacity-90",bgcolor,color,btnClass,{ "py-1 px-3 gap-1":size==="small"},{ "py-2 px-4 gap-1":size==="medium"},{ "py-3 px-6 gap-2":size==="large"}]' :type='type' @click='$emit("press")')
  slot

</template>

<script setup lang="ts">
type TButton = 'small' | 'medium' | 'large'

withDefaults(
  defineProps<{
    bgcolor?: string
    color?: string
    btnClass?: string
    size?: TButton
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    type: 'button'
  }
)
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
