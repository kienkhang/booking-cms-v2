<template lang="pug">
Modal(:show="show" @mask-click='closeModal')
  .absolute.right-2.top-2 
    icon-ph:x-bold.w-4.h-4.cursor-pointer(@click='closeModal()')
  div(class='w-[750px] bg-white h-[600px] rounded-10 p-8 mb-2 overflow-auto')
    EditorQuill
</template>

<script setup lang="ts">
import EditorQuill from '../EditorQuill.vue'
import Modal from './Modal.vue'

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const closeModal = () => emit('update:show', false)
</script>

<style scoped></style>
