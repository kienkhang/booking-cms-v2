<template lang="pug">
div
  FormKit(type='form' name='config_form' id='config_form' @submit='doSubmit' :actions='false' style='width: 100%; padding: 16px;')
    .hotel_basic_info.flex.flex-col.gap-3
      .text-3xl.font-semibold Cơ bản
      hr
      //- Activate
      .flex.flex-col.gap-1.justify-start
        label.font-bold Kích hoạt
        NSwitch.w-full(v-model:value='activate' style="width:max-content")
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
      .text-3xl.font-semibold Tài khoản nhận tiền
        hr
      FormKit(v-model='bankName' label='Ngân hàng' name='bank_name' type='select' validation='required')
        option(v-for='bank in VIETNAM_BANKING_LIST' :value='bank.code' class='flex items-center gap-2 uppercase')
          span ({{ bank.code }}) {{ bank.name }} 
            
      FormKit(v-model='bankBeneficiary' label='Người thụ hưởng' name='bank_beneficiary' type='text' input-class='uppercase' validation='required|length:6' help="Tên người thụ hưởng phải giống trên thẻ ngân hàng")
      FormKit(v-model='bankAccount' label='Số tài khoản' name='bank_account' type='text' validation='required|number|length:6' help="Số tài khoản ngân hàng của bạn")

    
    .hotel_additional_info.flex.flex-col.gap-3
      .text-3xl.font-semibold Mô hình kinh doanh
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
      .text-3xl.font-semibold Tiện ích
      hr
      .grid.grid-cols-3.gap-3
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Bãi biển' name='beach' v-model='beach')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Hồ bơi' name='pool' v-model='pool')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Quầy bar' name='bar' v-model='bar')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Phòng không hút thuốc' name='no_smoking_room' v-model='no_smoking_room')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Phòng thể hình' name='fitness' v-model='fitness')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Bồn tắm' name='bath' v-model='bath')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Wifi' name='wifi' v-model='wifi')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Breakfast' name='breakfast' v-model='breakfast')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Casio' name='casio' v-model='casio')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Bãi đỗ xe' name='parking' v-model='parking')
    FormKit(type='submit' name='submit-btn' input-class='w-max' wrapper-class='flex justify-end') Cập nhật
</template>

<script setup lang="ts">
import { NSwitch } from 'naive-ui'
import EditorQuill from '../shared/EditorQuill.vue'
import { VIETNAM_BANKING_LIST } from '@/constant/bank'

// ---------------------- HOTEL INFO ----------------------
const hotelInfo = reactive({
  name: '',
  overview: '',
  activate: true,
  photos: '',
  raw_address: '',
  bankAccount: 0,
  bankName: '',
  bankBeneficiary: ''
})
const {
  activate,
  bankAccount,
  bankBeneficiary,
  bankName,
  name,
  overview,
  raw_address
  // photos
} = toRefs(hotelInfo)
// ---------------------- HOTEL ADDITIONAL ----------------------
const hotelAdditional = reactive({
  hotel: false,
  apartment: false,
  resort: false,
  villa: false,
  camping: false,
  motel: false,
  homestay: false,
  beach: false,
  pool: false,
  bar: false,
  no_smoking_room: false,
  fitness: false,
  bath: false,
  wifi: false,
  breakfast: false,
  casio: false,
  parking: false
})
const {
  hotel,
  apartment,
  bar,
  bath,
  beach,
  breakfast,
  camping,
  homestay,
  casio,
  fitness,
  motel,
  no_smoking_room,
  parking,
  pool,
  resort,
  villa,
  wifi
} = toRefs(hotelAdditional)

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

const { executeAPI: getDistrict } = selectDistrict(province.value)
const { executeAPI: getWard } = selectWard(district.value)

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
    getDistrict()
  }
}
const doFocusWard = async () => {
  // Khi focus ward select, kiểm tra xem wOptions đã có hay chưa
  // Nếu chưa thì get
  if (!wOptions.value.length && district.value) {
    getWard()
  }
}

// ---------------------- HANDLE SUBMIT FORM ----------------------
const doSubmit = () => {
  const data = { ...hotelInfo, ...hotelAdditional, district, province, ward }
  console.log('🐔🦢 ~ doSubmit ~ data:', data)
}
</script>

<style scoped></style>
