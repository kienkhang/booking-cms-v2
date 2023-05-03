<template lang="pug">
div
  FormKit(type='form' name='config_form' id='config_form' @submit='doSubmit' :actions='false' style='width: 100%; padding: 16px;')
    .hotel_basic_info.flex.flex-col.gap-3
      .text-2xl.font-semibold Cơ bản
      hr
      //- activate
      .flex.flex-col.gap-1.justify-start
        label.font-bold Kích hoạt
        NSwitch.w-full(v-model:value='activated' style="width:max-content")
      //- name
      FormKit(type='text' v-model='name' label='Tên phòng' name="name" placeholder='Nhập tên phòng' validation="required")
      //- overview
      EditorQuill(v-model:content='description' title='Mô tả')
      //- bathroom_nums
      FormKit(type='number' value='1' :min='1' v-model='bathroom_nums' label='Số phòng tắm' name="bathroom_nums" placeholder='Số phòng tắm' validation="required|number|min:1")
      //- bed_nums
      FormKit(type='number' value='1' :min='1' v-model='bed_nums' label='Số giường ngủ' name="bed_nums" placeholder='Nhập số giường ngủ' validation="required|number|min:1")
      //- max_adult
      FormKit(type='number' value='1' :min='1' v-model='max_adult' label='Số người lớn' name="max_adult" placeholder='Nhập số người lớn tối đa' validation="required|number|min:1")
      //- max_children
      FormKit(type='number' value='0' :min='0' v-model='max_children' label='Số trẻ em' name="max_children" placeholder='Nhập số trẻ em tối đa' validation="required|number|min:1")
      
    .hotel_additional_info.flex.flex-col.gap-3
      .text-2xl.font-semibold Cảnh quang xung quanh
      hr
      .grid.grid-cols-3.gap-3
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Vịnh' name='bay' v-model='bay')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Đại dương' name='ocean' v-model='ocean')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Biển' name='sea' v-model='sea')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Thành phố' name='city' v-model='city')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Vườn' name='garden' v-model='garden')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Hồ' name='lake' v-model='lake')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Núi' name='mountain' v-model='mountain')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Sông' name='river' v-model='river')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Ban công riêng' name='private_balcony' v-model='private_balcony')
    .hotel_additional_info.flex.flex-col.gap-3
      .text-2xl.font-semibold Tiện nghi phòng
      hr
      .grid.grid-cols-3.gap-3    
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Máy lạnh' name='air_conditional' v-model='air_conditional')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='BBQ' name='bbq' v-model='bbq')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Bàn làm việc' name='desk' v-model='desk')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Nồi chiên' name='fryer' v-model='fryer')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Trái cây' name='fruit' v-model='fruit')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Máy sấy tóc' name='hairdry' v-model='hairdry')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Bàn ủi' name='iron' v-model='iron')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Bếp' name='kitchen' v-model='kitchen')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Dụng cụ bếp' name='kitchen_tool' v-model='kitchen_tool')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Hồ bơi riêng' name='private_pool' v-model='private_pool')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Bồn tắm' name='shower' v-model='shower')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Dép' name='slippers' v-model='slippers')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Sofa' name='sofa' v-model='sofa')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Cách âm' name='soundproof' v-model='soundproof')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Tivi' name='tivi' v-model='tivi')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Đồ vệ sinh' name='toiletries' v-model='toiletries')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Khăn tắm' name='towels' v-model='towels')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Rượu' name='wine' v-model='wine')

    FormKit(type='submit' name='submit-btn' input-class='w-max' wrapper-class='flex justify-end')
      span {{ isEdit ? 'Cập nhật':'Tạo mới' }}

</template>

<script setup lang="ts">
import type { IRoom } from '@/dtos/room'

const props = defineProps<{
  room?: IRoom
}>()

const isEdit = computed(() => !!props.room)
// ============= ROOM INFO ==================
const { hotelId } = useHotelStorage()
const roomInfo = reactive({
  name: '',
  description: '',
  bed_nums: 0,
  bathroom_nums: 0,
  activated: false,
  max_children: 0,
  max_adult: 0
})
const { activated, bathroom_nums, bed_nums, description, max_adult, max_children, name } =
  toRefs(roomInfo)

// ============= ROOM VIEWS ================

const roomViews = reactive({
  bay: false,
  ocean: false,
  sea: false,
  city: false,
  garden: false,
  lake: false,
  mountain: false,
  river: false,
  private_balcony: false
})
const { bay, city, garden, lake, mountain, ocean, private_balcony, river, sea } = toRefs(roomViews)

// ============= ROOM FACILITIES ================
const roomFacilities = reactive({
  air_conditional: false,
  tivi: false,
  kitchen: false,
  private_pool: false,
  iron: false,
  sofa: false,
  desk: false,
  soundproof: false,
  towels: false,
  toiletries: false,
  fruit: false,
  shower: false,
  slippers: false,
  hairdry: false,
  fuirt: false,
  bbq: false,
  wine: false,
  fryer: false,
  kitchen_tool: false
})
const {
  air_conditional,
  bbq,
  desk,
  fryer,
  fruit,
  hairdry,
  iron,
  kitchen,
  kitchen_tool,
  private_pool,
  shower,
  slippers,
  sofa,
  soundproof,
  tivi,
  toiletries,
  towels,
  wine
} = toRefs(roomFacilities)

const doSubmit = () => {
  const data = { ...roomInfo, ...roomViews, ...roomFacilities, hotel_id: hotelId.value }
  if (isEdit.value) {
    console.log('🐔🦢 ~ data:', data)
  }
}
</script>

<style scoped></style>
