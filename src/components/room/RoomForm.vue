<template lang="pug">
div
  Loading(v-if='isLoading')
  FormKit(type='form' name='config_form' id='config_form' @submit='doSubmit' :actions='false' style='width: 100%; padding: 16px;' v-else='')
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
import { useRoomStore } from '@/stores'
import Loading from '../shared/Loading.vue'
import type { IRoom } from '@/dtos'
// Route page /room/{id}/edit
const route = useRoute()
const router = useRouter()
// Get room id from route
const roomId = computed(() => route.params.id as string)
// if exist id -> isEdit === true
const isEdit = computed(() => !!roomId.value)

// Destructuring function getRoom and currentRoom
const { currentRoom } = useRoom()
const { getRoomById } = useRoomStore()
// Destructuring isLoading get room
const { isLoading, execute } = getRoomById(roomId.value)

whenever(roomId, () => {
  execute()
})

// ============= ROOM INFO ==================
const { hotelId } = useHotelStorage()
// Define Info
const roomInfo = reactive({
  name: '',
  description: '',
  bed_nums: 0,
  bathroom_nums: 0,
  activated: false,
  max_children: 0,
  max_adult: 0
})
// Destructuring Info
const { activated, bathroom_nums, bed_nums, description, max_adult, max_children, name } =
  toRefs(roomInfo)

// ============= ROOM VIEWS ================

// Define Views
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
// Destructuring Views
const { bay, city, garden, lake, mountain, ocean, private_balcony, river, sea } = toRefs(roomViews)

// ============= ROOM FACILITIES ================
// Define Facilities
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
  bbq: false,
  wine: false,
  fryer: false,
  kitchen_tool: false
})
// Destructuring reactive state
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
// Biding room function if exist currentRoom
const bindingEditRoom = () => {
  // Room Info Binding
  roomInfo.activated = currentRoom.value.activated
  roomInfo.bathroom_nums = currentRoom.value.bathroom_nums
  roomInfo.bed_nums = currentRoom.value.bed_nums
  roomInfo.description = currentRoom.value.description
  roomInfo.max_adult = currentRoom.value.max_adult
  roomInfo.max_children = currentRoom.value.max_children
  roomInfo.name = currentRoom.value.name
  // Room View Binding
  roomViews.bay = currentRoom.value.room_type_views.bay
  roomViews.ocean = currentRoom.value.room_type_views.ocean
  roomViews.sea = currentRoom.value.room_type_views.sea
  roomViews.city = currentRoom.value.room_type_views.city
  roomViews.garden = currentRoom.value.room_type_views.garden
  roomViews.lake = currentRoom.value.room_type_views.lake
  roomViews.mountain = currentRoom.value.room_type_views.mountain
  roomViews.river = currentRoom.value.room_type_views.river
  roomViews.private_balcony = currentRoom.value.room_type_views.private_balcony
  // Room Facilites Biding
  roomFacilities.air_conditional = currentRoom.value.room_type_facility.air_conditional
  roomFacilities.tivi = currentRoom.value.room_type_facility.tivi
  roomFacilities.kitchen = currentRoom.value.room_type_facility.kitchen
  roomFacilities.private_pool = currentRoom.value.room_type_facility.private_pool
  roomFacilities.iron = currentRoom.value.room_type_facility.iron
  roomFacilities.sofa = currentRoom.value.room_type_facility.sofa
  roomFacilities.desk = currentRoom.value.room_type_facility.desk
  roomFacilities.soundproof = currentRoom.value.room_type_facility.soundproof
  roomFacilities.towels = currentRoom.value.room_type_facility.towels
  roomFacilities.toiletries = currentRoom.value.room_type_facility.toiletries
  roomFacilities.fruit = currentRoom.value.room_type_facility.fruit
  roomFacilities.shower = currentRoom.value.room_type_facility.shower
  roomFacilities.slippers = currentRoom.value.room_type_facility.slippers
  roomFacilities.hairdry = currentRoom.value.room_type_facility.hairdry
  roomFacilities.bbq = currentRoom.value.room_type_facility.bbq
  roomFacilities.wine = currentRoom.value.room_type_facility.wine
  roomFacilities.fryer = currentRoom.value.room_type_facility.fryer
  roomFacilities.kitchen_tool = currentRoom.value.room_type_facility.kitchen_tool
}

// If reload edit room page -> biding whenever have cuurentRoom
watch(currentRoom, () => {
  if (currentRoom.value) {
    bindingEditRoom()
  }
})

// if redirect from another page -> binding Mounted
onMounted(() => {
  if (currentRoom.value) {
    bindingEditRoom()
  }
})
// HANDLE ADD/EDIT ROOM
const { createRoom, updateRoom } = useRoom()
const data = computed<Omit<IRoom, 'id' | 'photos'>>(() => ({
  air_conditional: air_conditional.value,
  bathroom_nums: bathroom_nums.value,
  bay: bay.value,
  bbq: bbq.value,
  bed_nums: bed_nums.value,
  city: city.value,
  description: description.value,
  desk: desk.value,
  fruit: fruit.value,
  fryer: fryer.value,
  garden: garden.value,
  hairdry: hairdry.value,
  kitchen: kitchen.value,
  iron: iron.value,
  kitchen_tool: kitchen_tool.value,
  lake: lake.value,
  max_adult: max_adult.value,
  max_children: max_children.value,
  mountain: mountain.value,
  name: name.value,
  ocean: ocean.value,
  private_balcony: private_balcony.value,
  private_pool: private_pool.value,
  river: river.value,
  sea: sea.value,
  shower: shower.value,
  slippers: slippers.value,
  sofa: sofa.value,
  soundproof: soundproof.value,
  tivi: tivi.value,
  toiletries: toiletries.value,
  towels: towels.value,
  wine: wine.value,
  hotel_id: hotelId.value,
  activated: activated.value
}))
const { executeApi: create } = createRoom(data.value)
const { executeApi: update } = updateRoom(data.value, roomId.value)

const doSubmit = async () => {
  if (isEdit.value) {
    await update()
    // router.push({ name: 'room' })
    return
  }
  await create()
}
</script>

<style scoped></style>
