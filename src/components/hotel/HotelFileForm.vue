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
    .flex.items-center.gap-5.flex-wrap.border.rounded-10.p-4(v-if='hotelFiles.length > 0')
      figure(v-for='img in previewBlobUrls' class='w-max')
        NImage(width="200" :src='img')
    //- UploadImageForm(:files='files' @upload='upload' @change-file='changeFile')
</template>

<script setup lang="ts">
import { NImage } from 'naive-ui'
import { type IFormKitFile } from '@/dtos/shared'
import { Image2Array } from '@/utils/format'

// -------- Hotel Default File ------------
const { currentHotel: hotel } = storeToRefs(useHotelsStore())
const hotelPhotos = computed(() => Image2Array(hotel.value.hotel_photos))

// -------- Hotel Upload API ------------
const { uploadBL, uploadPhotos } = useHotel()
const { executeApi: updateBL } = uploadBL(hotel.value.id)
const { executeApi: updatePhotos } = uploadPhotos(hotel.value.id)

// -------- Bussiness License File ------------
const bussinessLicenseFile = ref<IFormKitFile[]>([])

const blBlobUrl = computed(() => {
  if (bussinessLicenseFile.value.length > 0) {
    return URL.createObjectURL(bussinessLicenseFile.value[0].file)
  }
})

async function bLicenseSubmit() {
  await updateBL({
    images: bussinessLicenseFile.value[0].file,
    // because upload new file, so no need to keep old image
    text: []
  })
}

// -------- Hotel Image Files ------------
const hotelFiles = ref<IFormKitFile[]>([])
const previewBlobUrls = computed(() => {
  if (hotelFiles.value.length > 0) {
    return hotelFiles.value.map((f) => URL.createObjectURL(f.file))
  }
})
async function hotelFilesSubmit() {
  const files = hotelFiles.value.map((f) => f.file)
  const imgData = new FormData()
  for (let i = 0; i < files.length; i++) {
    imgData.append('images', files[i])
  }
  // for (let i = 0; i < hotelPhotos.value.length; i++) {
  //   imgData.append('text', hotelPhotos.value[i])
  // }
  imgData.append('text', JSON.stringify(JSON.stringify(hotelPhotos.value)))
  // const oldImgData = new FormData()
  // oldImgData.append('text', JSON.stringify(hotelPhotos.value))
  // formData.append('text',hotelPhotos.value)
  await updatePhotos(imgData)
  // getHotelLocalStore()
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
