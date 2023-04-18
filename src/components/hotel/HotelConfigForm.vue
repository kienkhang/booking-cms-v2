<template lang="pug">
div
  FormKit(type='form' name='config_form' id='config_form' :actions='false' style='width: 100%; padding: 16px;')
    .hotel_basic_info.flex.flex-col.gap-3
      .text-3xl.font-bold Cơ bản
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
              :options='pOptions||[]'
              @focus='doFocusProvince()'
              )
      //- Address - District
      FormKit(v-model="district"
              type="select"
              label="Huyện/Thành phố"
              name="district"
              placeholder="Chọn huyện/thành phố"
              validation='required'
              :options='dOptions||[]'
              @focus='doFocusDistrict()'
              )
      //- Address - Ward
      FormKit(v-model="ward"
              type="select"
              label="Xã/Thị trấn"
              name="ward"
              placeholder="Chọn xã/thị trấn"
              validation='required'
              :options='wOptions||[]'
              @focus='doFocusWard()'
              )
    .hotel_bank_info.flex.flex-col.gap-3
      .text-3xl.font-bold Tài khoản nhận tiền
        hr
      FormKit(v-model='bankName' label='Ngân hàng' name='bank_name' type='select' validation='required')
        option(v-for='bank in VIETNAM_BANKING_LIST' :value='bank.code' class='flex items-center gap-2 uppercase')
          span ({{ bank.code }}) {{ bank.name }} 
            
      FormKit(v-model='bankBeneficiary' label='Người thụ hưởng' name='bank_beneficiary' type='text' input-class='uppercase' validation='required|length:6' help="Tên người thụ hưởng phải giống trên thẻ ngân hàng")
      FormKit(v-model='bankAccount' label='Số tài khoản' name='bank_account' type='text' validation='required|number|length:6' help="Số tài khoản ngân hàng của bạn")

    
    .hotel_additional_info.flex.flex-col.gap-3
      .text-3xl.font-bold Hình ảnh
        hr
      div
        FormKit(v-model='bussinessLicense' label='Giấy phép kinh doanh' name='bussiness_license' type='file' input-class='uppercase' validation='required')
        NImage(width="200" :src='imgss')

</template>

<script setup lang="ts">
import { NSwitch, NImage } from 'naive-ui'
import EditorQuill from '../shared/EditorQuill.vue'
import { VIETNAM_BANKING_LIST } from '@/constant/bank'
import imgss from '@/assets/images/home.jpg'
// ---------------------- HOTEL INFO ----------------------
const {
  activate,
  bankAccount,
  bankBeneficiary,
  bankName,
  bussinessLicense,
  name,
  overview
  // photos
} = toRefs(
  reactive({
    name: '',
    overview: '',
    activate: true,
    photos: '',
    bankAccount: 0,
    bankName: '',
    bankBeneficiary: '',
    bussinessLicense: ''
  })
)

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
    selectDistrict(province.value).executeAPI()
  }
}
const doFocusWard = async () => {
  // Khi focus ward select, kiểm tra xem wOptions đã có hay chưa
  // Nếu chưa thì get
  if (!wOptions.value.length && district.value) {
    selectWard(district.value).executeAPI()
  }
}
</script>

<style scoped></style>
