<template lang="pug">
div
  .font-semibold Giấy phép kinh doanh
    hr
    FormKit(type='form' :actions='false' @submit='bLicenseSubmit()' style='width: 100%; padding: 16px;')
      FormKit(v-model='bussinessLicenseFile' name='bussiness_license' type='file' input-class='uppercase' validation='required')
      FormKit(type='submit' name='update-bl' input-class='w-max') Cập nhật
      NImage(width="200" :src='blBlobUrl')
  .font-semibold Hình ảnh khách sạn
    hr
    FormKit(type='form' :actions='false' @submit='hotelFilesSubmit()' style='width: 100%; padding: 16px;')
      FormKit(type='file' name='fileimage' id='fileimage' enctype='multipart/form-data' v-model='hotelFiles' multiple)
      FormKit(type='submit' name='update-img' input-class='w-max') Cập nhật
    .grid.grid-cols-3.gap-2.border.rounded-10.p-2
      figure(v-for='img in previewBlobUrls' class='w-max')
        NImage(width="200" :src='img')
    //- UploadImageForm(:files='files' @upload='upload' @change-file='changeFile')
</template>

<script setup lang="ts">
import { NImage } from 'naive-ui'
// import UploadImageForm from '../shared/UploadImageForm.vue'
import { type IFormKitFile } from '@/dtos/shared'

// -------- Bussiness License File ------------
const bussinessLicenseFile = ref<IFormKitFile[]>([])

const blBlobUrl = computed(() => {
  if (bussinessLicenseFile.value.length > 0) {
    return URL.createObjectURL(bussinessLicenseFile.value[0].file)
  }
})

const bLicenseSubmit = () => {
  console.log('Bussiness License Submit')
}

// -------- Hotel Image Files ------------
const hotelFiles = ref<IFormKitFile[]>([])
const previewBlobUrls = computed(() => {
  if (hotelFiles.value.length > 0) {
    return hotelFiles.value.map((f) => URL.createObjectURL(f.file))
  }
})
const hotelFilesSubmit = () => {
  console.log('Hotel Submit')
}

const deleteBlobUrl = () => {
  // before unmount -> delete blob url
  // Delete bussiness blob url
  if (blBlobUrl.value) {
    URL.revokeObjectURL(blBlobUrl.value)
  }
  // Delete hotel images blob url
  if (previewBlobUrls.value?.length > 0) {
    previewBlobUrls.value.forEach((b) => URL.revokeObjectURL(b))
  }
}

// watch([bussinessLicenseFile, hotelFiles], () => {
//   deleteBlobUrl()
// })

onBeforeUnmount(() => {
  deleteBlobUrl()
})
</script>

<style scoped></style>
