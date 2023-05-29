<template lang="pug">
Modal(:show="show" @mask-click='closeModal()')
  .absolute.right-2.top-2 
    icon-ph:x-bold.w-4.h-4.cursor-pointer(@click='closeModal()')
  div(class='w-[500px] bg-white h-max rounded-10 p-8 mb-2 overflow-auto scroll-hide')
    | Hello world
</template>

<script setup lang="ts">
// Components
import type { IRatePlan } from '@/dtos'
import Modal from './Modal.vue'
// Define Props
const props = defineProps<{
  show: boolean
  type: string
  ratePlan?: IRatePlan
}>()
// Define Emits
const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()
// Define Models
const show = computed({
  set() {
    emit('update:show', !show.value)
  },
  get() {
    return props.show
  }
})

const isEditModal = computed(() => props.type === 'edit')

const bindingForm = () => {}

// close modal
const closeModal = () => (show.value = false)
</script>

<style scoped></style>
