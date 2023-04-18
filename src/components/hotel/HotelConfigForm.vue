<template lang="pug">
div
  FormKit(type='form' name='config_form' id='config_form' :actions='false' style='width: 100%; padding: 16px;')
    .hotel_basic_tab.flex.flex-col.gap-3
      .text-xl.font-bold Basic
      hr
      //- Activate
      .flex.flex-col.gap-1.justify-start
        label.font-bold Kích hoạt
        NSwitch.w-full(v-model:value='activate' style="width:max-content")
      //- name
      FormKit(type='text' v-model='name' label='Tên khách sạn' name="name" placeholder='Nhập tên khách sạn bạn' validation="required")
      //- overview
      EditorQuill(v-model:content='overview' title='Mô tả')
      //- Address
    
    .hotel_additional_tab.mt-3
      .text-xl.font-bold Additional
        hr

</template>

<script setup lang="ts">
import { NSwitch } from 'naive-ui'
import EditorQuill from '../shared/EditorQuill.vue'
import { provinceApi } from '@/apis/province'
const {
  activate,
  bankAccount,
  bankBeneficiary,
  bankName,
  bussinessLicense,
  district,
  name,
  overview,
  photos,
  province,
  wards
} = toRefs(
  reactive({
    name: '',
    overview: '',
    activate: true,
    province: 1,
    district: 1,
    wards: 1,
    photos: '',
    bankAccount: '',
    bankName: '',
    bankBeneficiary: '',
    bussinessLicense: ''
  })
)

const { selectProvince } = useProvinces()

const { executeAPI } = selectProvince()
onMounted(() => {
  executeAPI()
})
</script>

<style scoped></style>
