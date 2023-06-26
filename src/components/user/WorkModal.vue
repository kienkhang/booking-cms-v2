<template lang="pug">
Modal(:show="show" @mask-click='closeModal()')
  .absolute.right-2.top-2 
    icon-ph:x-bold.w-4.h-4.cursor-pointer(@click='closeModal()')
  div(class='w-[600px] bg-white max-h-[500px] h-max rounded-10 p-8 mb-2 overflow-auto scroll-hide')
    .flex.flex-col.gap-3
      div(v-for='hotel in hotels' class='overflow-auto max-h-80')
        WorkList(:hotel='hotel' :user-id='userId' class='')
      .flex.items-center.gap-3
        NAutoComplete(v-model:value='search' :theme-overrides='theme.AutoComplete' :input-props="{autocomplete: 'disabled'}" :options='hotelOptions' placeholder='Nhập khách sạn cần tìm' :loading='fetchHotelLoading' clearable @select='selectHotel')
        Button(size='small' class='text-white bg-crayola' @click='doAddWork')
          icon-custom-load.w-4.h-4(v-if='creatingWork')
          span(v-else) Thêm
      //- FormKit(type='form' :actions='false' @submit='doAddWork')
      //-   .flex.items-start.gap-2
      //-     FormKit(type='text' name='Mã khách sạn' v-model='form.hotel_id' placeholder='Nhập mã khách sạn' validation='required' wrapper-class='w-full' outer-class='w-full')
      //-     FormKit(type='submit' ) Thêm
</template>

<script setup lang="ts">
import { type GlobalThemeOverrides, NAutoComplete } from 'naive-ui'
import Modal from '../shared/modal/Modal.vue'
import WorkList from './WorkList.vue'
import Button from '../shared/button/Button.vue'
const props = defineProps<{
  show: boolean
  userId: string
}>()

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const closeModal = () => emit('update:show', false)

// ADD HOTEL HANDLER
const { createWork } = useWork()
const { works } = storeToRefs(useWork())
const hotels = computed(() => works.value?.hotels)

const form = ref({
  hotel_id: '',
  user_id: props.userId
})

const { executeApi: addWork, isLoading: creatingWork } = createWork(form)

async function doAddWork() {
  await addWork()
}

// SEARCH HOTEL HANDLER
const { hotels: lists, filter } = useHotel()
const { getHotels } = useHotelsStore()
const { executeApi: fetchHotels, isLoading: fetchHotelLoading } = getHotels()

const theme: GlobalThemeOverrides = {
  AutoComplete: {
    peers: {
      Input: {
        borderRadius: '8px'
      }
    }
  }
}

// Search field
const search = ref('')

const hotelOptions = computed(() => {
  return lists?.value?.map((hotel) => ({
    label: hotel.name,
    value: hotel.id
  }))
})

// When select hotel -> set hotel_id
function selectHotel(value: string) {
  form.value.hotel_id = value
}

// when email change -> get hotel with paging
watchDebounced(
  search,
  () => {
    filter.value = {
      search: search.value,
      offset: 10,
      page: 1
    }
    fetchHotels()
  },
  { debounce: 200 }
)
</script>

<style scoped></style>
