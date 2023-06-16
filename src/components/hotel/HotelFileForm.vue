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
import { type IFormKitFile } from '@/dtos/shared'
import { Image2Array } from '@/utils/format'

// -------- Upload Image API ------------
const { uploadPhotos, uploadBL } = useHotel()
const { currentHotel: hotel } = storeToRefs(useHotelsStore())
const hotelId = computed(() => hotel.value.id)
const hotelPhotos = computed(() => Image2Array(hotel.value.hotel_photos))

const { executeApi: doUploadBL } = uploadBL(hotelId.value)
const { executeApi: doUploadPhotos } = uploadPhotos(hotelId.value)

// -------- Bussiness License File ------------
const bussinessLicenseFile = ref<IFormKitFile[]>([])

const blBlobUrl = computed(() => {
  if (bussinessLicenseFile.value.length > 0) {
    return URL.createObjectURL(bussinessLicenseFile.value[0].file)
  }
})

async function bLicenseSubmit() {
  await doUploadBL({ images: bussinessLicenseFile.value[0].file, text: [] })
}

// -------- Hotel Image Files ------------
const hotelFiles = ref<IFormKitFile[]>([])
const previewBlobUrls = computed(() => {
  if (hotelFiles.value.length > 0) {
    return hotelFiles.value.map((f) => URL.createObjectURL(f.file))
  }
})
const hotelFilesSubmit = () => {
  // Get files
  const files = hotelFiles.value.map((f) => f.file) as File[]
  // Cách 1: Tạo ra formData chung cho 2 trường là images và text, loop for để add vào
  const formData = new FormData()
  // images fields
  for (let i = 0; i < files.length; i++) {
    formData.append('images', files[i])
  }
  // text fields 1
  for (let i = 0; i < hotelPhotos.value.length; i++) {
    formData.append('text', hotelPhotos.value[i])
  }
  // // text fields 2
  // formData.append('text', JSON.stringify(hotelPhotos.value))
  // // text field 3
  // formData.append('text', JSON.stringify(JSON.stringify(hotelPhotos.value)))
  doUploadPhotos(formData)

  // Cách 2: Tạo ra form gồm images:File[] và text:string[]
  // doUploadPhotos({ images: files, text: hotelPhotos.value })
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
