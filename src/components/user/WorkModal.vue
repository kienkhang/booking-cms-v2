<template lang="pug">
Modal(:show="show" @mask-click='closeModal()')
  .absolute.right-2.top-2 
    icon-ph:x-bold.w-4.h-4.cursor-pointer(@click='closeModal()')
  div(class='w-[600px] bg-white max-h-[500px] h-max rounded-10 p-8 mb-2 overflow-auto scroll-hide')
    .flex.flex-col.gap-3
      WorkList(v-for='hotel in hotels' :hotel='hotel' :user-id='userId')
      FormKit(type='form' :actions='false' @submit='doAddWork')
        .flex.items-center.gap-2
          FormKit(type='text' name='Mã khách sạn' v-model='form.hotel_id' placeholder='Nhập mã khách sạn' validation='required' wrapper-class='w-full' outer-class='w-full')
          FormKit(type='submit') Thêm
</template>

<script setup lang="ts">
import Modal from '../shared/modal/Modal.vue'
import WorkList from './WorkList.vue'
const props = defineProps<{
  show: boolean
  userId: string
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const closeModal = () => emit('update:show', false)

// ADD HOTEL HANDLER
const { getWorks, createWork } = useWork()
const { works } = storeToRefs(useWork())
const hotels = computed(() => works.value.hotels)

const form = ref({
  hotel_id: '',
  user_id: props.userId
})

const { executeApi: addWork } = createWork(form)

async function doAddWork() {
  await addWork()
}

onMounted(() => {
  getWorks(props.userId).executeApi()
})
</script>

<style scoped></style>
