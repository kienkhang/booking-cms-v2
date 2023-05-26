<template lang="pug">
Modal(:show="show" @mask-click='closeModal()')
  .absolute.right-2.top-2 
    icon-ph:x-bold.w-4.h-4.cursor-pointer(@click='closeModal()')
  div(class='w-[500px] bg-white h-max rounded-10 p-8 mb-2 overflow-auto scroll-hide')
    UserForm(form-type='add' v-if='type==="add"')
    UserForm(form-type='edit' :user='user' v-else-if='type==="edit"')
</template>

<script setup lang="ts">
import Modal from '../shared/modal/Modal.vue'
import UserForm from './UserForm.vue'
import type { IUser } from '@/dtos/user'
defineProps<{
  show: boolean
  type: 'add' | 'edit'
  user?: IUser
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const closeModal = () => emit('update:show', false)
</script>

<style scoped></style>
