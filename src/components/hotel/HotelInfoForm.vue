<template lang="pug">
div
  FormKit(type='form' name='config_form' id='config_form' @submit='doSubmit' :actions='false' style='width: 100%; padding: 16px;')
    .hotel_basic_info.flex.flex-col.gap-3
      .text-2xl.font-semibold Thông tin chung
      hr
      //- Activate
      .flex.flex-col.gap-1.justify-start
        label.font-bold Kích hoạt
        NSwitch.w-full(v-model:value='activate' style="width:max-content")
      NAutoComplete(v-model:value='email'  :input-props="{autocomplete: 'disabled'}" :options='hotelierOptions' style='width: 300px;' placeholder='Nhập email cần tìm' v-if='isAdmin')
      //- name
      FormKit(type='text' v-model='name' label='Tên khách sạn' name="name" placeholder='Nhập tên khách sạn bạn' validation="required")
      //- overview
      EditorQuill(v-model:content='overview' title='Mô tả')
      //- Address - Province
      FormKit(v-model="province"
              type="select"
              label="Tỉnh"
              name="province"
              placeholder="Chọn tỉnh thành"
              validation='required'
              :options='pOptions||[{ label: "Không có dữ liệu", value: "nodata", attrs: { disabled: true } }]'
              @focus='doFocusProvince()'
              )
      //- Address - District
      FormKit(v-model="district"
              type="select"
              label="Huyện/Thành phố"
              name="district"
              placeholder="Chọn huyện/thành phố"
              validation='required'
              :options='dOptions||[{ label: "Không có dữ liệu", value: "nodata", attrs: { disabled: true } }]'
              @focus='doFocusDistrict()'
              )
      //- Address - Ward
      FormKit(v-model="ward"
              type="select"
              label="Xã/Thị trấn"
              name="ward"
              placeholder="Chọn xã/thị trấn"
              validation='required'
              :options='wOptions||[{ label: "Không có dữ liệu", value: "nodata", attrs: { disabled: true } }]'
              @focus='doFocusWard()'
              )
      FormKit(v-model='raw_address' label='Địa chỉ' name='raw_address' type='text' validation='required|length:6')
      
    .hotel_bank_info.flex.flex-col.gap-3
      .text-2xl.font-semibold Tài khoản nhận tiền
        hr
      FormKit(v-model='bankName' label='Ngân hàng' name='bank_name' type='select' validation='required')
        option(v-for='bank in VIETNAM_BANKING_LIST' :value='bank.code' class='flex items-center gap-2 uppercase')
          span ({{ bank.code }}) {{ bank.name }} 
            
      FormKit(v-model='bankBeneficiary' label='Người thụ hưởng' name='bank_beneficiary' type='text' input-class='uppercase' validation='required|length:6' help="Tên người thụ hưởng phải giống trên thẻ ngân hàng")
      FormKit(v-model='bankAccount' label='Số tài khoản' name='bank_account' type='text' validation='required|number|length:6' help="Số tài khoản ngân hàng của bạn")

    
    .hotel_additional_info.flex.flex-col.gap-3
      .text-2xl.font-semibold Mô hình kinh doanh
        hr
      .grid.grid-cols-3.gap-3
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Khách sạn' name='hotel' v-model='hotel')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Căn hộ' name='apartment' v-model='apartment')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Resort' name='resort' v-model='resort')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Villa' name='villa' v-model='villa')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Cắm trại' name='camping' v-model='camping')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Nhà nghỉ' name='motel' v-model='motel')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Home Stay' name='homestay' v-model='homestay')
    .hotel_basic_info.flex.flex-col.gap-3
      .text-2xl.font-semibold Tiện ích
      hr
      .grid.grid-cols-3.gap-3
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Bãi biển' name='beach' v-model='beach')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Hồ bơi' name='pool' v-model='pool')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Quầy bar' name='bar' v-model='bar')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Phòng không hút thuốc' name='no_smoking_room' v-model='no_smoking_room')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Phòng thể hình' name='fitness' v-model='fitness')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Bồn tắm' name='bath' v-model='bath')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Wifi' name='wifi' v-model='wifi')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Ăn sáng' name='breakfast' v-model='breakfast')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Casio' name='casio' v-model='casino')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Bãi đỗ xe' name='parking' v-model='parking')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Spa' name='spa' v-model='spa')
    FormKit(type='submit' name='submit-btn' input-class='w-max' wrapper-class='flex justify-end')
      icon-custom-load.w-4.h-4.animate-spin(v-if='isLoading') 
      span(v-else) {{isEditForm ?'Cập nhật':'Tạo'}}
</template>

<script setup lang="ts">
import { NSwitch } from 'naive-ui'
import EditorQuill from '../shared/EditorQuill.vue'
import { VIETNAM_BANKING_LIST } from '@/constant/bank'
import type { IHotelAdd } from '@/dtos/hotel'
import { useAccountsStore } from '@/stores'
import useUsers from '@/composables/user/useUsers'

const route = useRoute()
const isEditForm = computed(() => route.name === 'hotel-settings')

// Hotel ID
const { hotelId } = useHotelStorage()
// ========================= HOTELIER ID ======================
const { account, isHotelier, isAdmin } = storeToRefs(useAccountsStore())
const { paging, users } = useUsers()

// select hotelier with email
const email = ref('')
const hotelierOptions = computed(() => {
  return users.value.map((user) => ({
    label: user.email,
    value: user.email
  }))
})
// if role is admin -> call api to get hotel role 2 and get hotelier
// else if role is hotelier -> get id from account store
const hotelier_id = computed(() => {
  if (isHotelier.value) {
    return account.value.id
  } else {
    const foundedAccount = users?.value.find((user) => user.email === email.value)
    return foundedAccount?.id
  }
})

// when email change -> get hotel with paging
watchDebounced(
  email,
  () => {
    paging.value = {
      search: email.value,
      offset: 10,
      page: 1,
      role: 2
    }
  },
  { debounce: 500 }
)
// ---------------------- HOTEL INFO ----------------------
const { currentHotel } = storeToRefs(useHotelsStore())

const hotelInfo = reactive({
  // Hotel Basic Info
  name: '',
  overview: '',
  activate: true,
  hotel_photos: '',
  raw_address: '',
  bankAccount: '',
  bankName: '',
  bankBeneficiary: '',
  // Hotel More info
  hotel: false,
  apartment: false,
  resort: false,
  villa: false,
  camping: false,
  motel: false,
  homestay: false,
  // Hotel facilities
  beach: false,
  pool: false,
  bar: false,
  no_smoking_room: false,
  fitness: false,
  bath: false,
  wifi: false,
  breakfast: false,
  casino: false,
  parking: false,
  spa: false
})
const {
  // Hotel Basic Info
  activate,
  bankAccount,
  bankBeneficiary,
  bankName,
  name,
  overview,
  raw_address,
  // Hotel More info
  hotel,
  apartment,
  bar,
  bath,
  beach,
  breakfast,
  camping,
  homestay,
  casino,
  fitness,
  motel,
  no_smoking_room,
  parking,
  pool,
  resort,
  villa,
  wifi,
  spa,
  hotel_photos
} = toRefs(hotelInfo)

// Binding if form is edit type
const bindingEditForm = () => {
  // Hotel Basic Info
  name.value = currentHotel.value?.name
  overview.value = currentHotel.value?.overview
  activate.value = currentHotel.value?.activate
  hotel_photos.value = currentHotel.value?.hotel_photos
  raw_address.value = currentHotel.value?.raw_address
  bankAccount.value = currentHotel.value?.bank_account
  bankName.value = currentHotel.value?.bank_name
  bankBeneficiary.value = currentHotel.value?.bank_beneficiary
  // Hotel More info
  hotel.value = currentHotel.value.hotel_type.hotel
  apartment.value = currentHotel.value.hotel_type.apartment
  bar.value = currentHotel.value.hotel_facility.bar
  bath.value = currentHotel.value.hotel_facility.bath
  beach.value = currentHotel.value.hotel_facility.beach
  breakfast.value = currentHotel.value.hotel_facility.breakfast
  camping.value = currentHotel.value.hotel_type.camping
  homestay.value = currentHotel.value.hotel_type.home_stay
  casino.value = currentHotel.value.hotel_facility.casino
  fitness.value = currentHotel.value.hotel_facility.fitness
  motel.value = currentHotel.value.hotel_type.motel
  no_smoking_room.value = currentHotel.value.hotel_facility.no_smoking_room
  parking.value = currentHotel.value.hotel_facility.parking
  pool.value = currentHotel.value.hotel_facility.pool
  resort.value = currentHotel.value.hotel_type.resort
  villa.value = currentHotel.value.hotel_type.villa
  wifi.value = currentHotel.value.hotel_facility.wifi
  spa.value = currentHotel.value.hotel_facility.spa
}

const requiredHotel = route.meta.requiredHotel
// if reload settings page -> binding Mounted
watch(currentHotel, () => {
  if (currentHotel.value && requiredHotel) {
    bindingEditForm()
  }
})
// if redirect from another page -> binding Mounted
onMounted(() => {
  if (currentHotel.value && requiredHotel) {
    bindingEditForm()
  }
})
// ---------------------- ADDRESS ----------------------
const {
  pOptions,
  dOptions,
  wOptions,
  selectProvince,
  selectDistrict,
  selectWard,
  district,
  province,
  ward
} = useProvinces()

const doFocusProvince = async () => {
  // Khi focus province select, kiểm tra xem pOptions đã có hay chưa
  // Nếu chưa thì get
  if (!pOptions.value.length) {
    selectProvince().executeAPI()
  }
}
const doFocusDistrict = async () => {
  // Khi focus district select, kiểm tra xem dOptions đã có hay chưa
  // Nếu chưa thì get
  if (!dOptions.value.length && province.value) {
    selectDistrict(province.value).execute()
  }
}
const doFocusWard = async () => {
  // Khi focus ward select, kiểm tra xem wOptions đã có hay chưa
  // Nếu chưa thì get
  if (!wOptions.value.length && district.value) {
    selectWard(district.value).execute()
  }
}
// SUBMIT DATA
const { createHotel, updateHotel } = useHotel()

const createForm = computed<IHotelAdd>(() => ({
  activate: activate.value,
  apartment: apartment.value,
  bank_account: bankAccount.value,
  bank_beneficiary: bankBeneficiary.value,
  bank_name: bankName.value,
  bar: bar.value,
  bath: bath.value,
  beach: beach.value,
  breakfast: breakfast.value,
  camping: camping.value,
  casio: casino.value,
  fitness: fitness.value,
  homestay: homestay.value,
  hotel: hotel.value,
  motel: motel.value,
  name: name.value,
  no_smoking_room: no_smoking_room.value,
  overview: overview.value,
  parking: parking.value,
  pool: pool.value,
  raw_address: raw_address.value,
  resort: resort.value,
  villa: villa.value,
  wifi: wifi.value,
  district: district.value,
  province: province.value,
  ward: ward.value,
  hotelier_id: hotelier_id.value,
  spa: spa.value
}))

const { isLoading: isCLoading, executeApi: add } = createHotel(createForm)
const { isLoading: isULoading, executeApi: update } = updateHotel(createForm, hotelId.value)
const isLoading = computed(() => isCLoading.value || isULoading.value)
// const isLoading = computed(() => isCLoading.value)

// ---------------------- HANDLE SUBMIT FORM ----------------------
const doSubmit = async () => {
  if (!isEditForm.value) {
    await add()
  } else {
    await update()
    return
  }
}
</script>

<style scoped></style>
