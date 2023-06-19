<template lang="pug">
div
  //- Business Licence Photo
  .business 
    span.font-bold.text-2xl Giấy phép kinh doanh
    .flex.gap-4.mt-5
      //- Upload photo
      Button(
          size='medium' 
          class='transition-all border-2 border-crayola text-crayola focus:outline-none hover:bg-crayola hover:text-white'
          @press='openChooseBL'
        )
        icon-mdi:folder-upload-outline.w-4.h-4.flex-shrink-0
        span.font-medium Tải hình lên
      //- Clear photo
      Button(
            size='medium' 
            class='text-red-500 transition-all border-2 border-red-500 focus:outline-none hover:bg-red-500 hover:text-white'
            @press='clearBL'
            v-if='blBlobUrl'
          )
        icon-mdi:close-circle-outline.w-4.h-4.flex-shrink-0
        span.font-medium Xoá hình ảnh
    //- Preview blob
    .mt-5(v-if='blBlobUrl')
      span.text-xl.font-bold Xem trước
      .flex.flex-wrap.gap-4.p-2
        figure(class='w-max')
          NImage(width="200" :src='blBlobUrl' lazy objectFit="cover")
      FormKit(type='form' @submit='bLicenseSubmit' :actions='false')
        FormKit(
          type='submit'
          name='uploadimage'
          id='uploadimage'
          prefixIcon='mdi:cloud-upload'
        )
          span.font-medium Xác nhận
  //- Hotel Photos
  .hotel-photos.mt-5
    span.font-bold.text-2xl Hình ảnh khách sạn
    .flex.gap-4.mt-5
      Button(
          size='medium' 
          class='transition-all border-2 border-crayola text-crayola focus:outline-none hover:bg-crayola hover:text-white'
          @press='openChoosePhotos'
        )
        icon-mdi:folder-upload-outline.w-4.h-4.flex-shrink-0
        span.font-medium Tải hình lên
      Button(
            size='medium' 
            class='text-red-500 transition-all border-2 border-red-500 focus:outline-none hover:bg-red-500 hover:text-white'
            @press='clearPhotos'
            v-if='previewBlobUrls?.length>0'
          )
        icon-mdi:close-circle-outline.w-4.h-4.flex-shrink-0
        span.font-medium Xoá hình ảnh
    .mt-5(v-if='previewBlobUrls?.length>0')
      span.text-xl.font-bold Xem trước
      .flex.flex-wrap.gap-4.p-2
        figure(class='w-max' v-for='photo in previewBlobUrls')
          NImage(width="200" :src='photo' lazy objectFit="cover")
      FormKit(type='form' @submit='hotelFilesSubmit' :actions='false')
        FormKit(
          type='submit'
          name='uploadimage'
          id='uploadimage'
          prefixIcon='mdi:cloud-upload'
        )
          span.font-medium Xác nhận

</template>

<script setup lang="ts">
import { Image2Array } from '@/utils/format'
// Component
import { NImage } from 'naive-ui'
const Button = defineAsyncComponent(() => import('../shared/button/Button.vue'))

// use message hook from naiveui
const mess = useMessage()

// -------- Upload Image API ------------
const { uploadPhotos, uploadBL } = useHotel()
const { currentHotel: hotel } = storeToRefs(useHotelsStore())
const hotelId = computed(() => hotel.value.id)
const hotelPhotos = computed(() => Image2Array(hotel.value.hotel_photos))

const { executeApi: doUploadBL } = uploadBL(hotelId.value)
const { executeApi: doUploadPhotos } = uploadPhotos(hotelId.value)

// -------- Bussiness License File ------------
// Define BS Array FILE
const businessLicenceFile = ref<File[]>([])
// Preview Business Licence Image
const blBlobUrl = computed(() => {
  if (businessLicenceFile.value.length > 0) {
    return URL.createObjectURL(businessLicenceFile.value[0])
  }
})
// open dialog to choose business licence image
const { open: openChooseBL } = useFileInput({
  accept: 'image/*',
  multiple: false,
  onChange: (f) => {
    // Delete blob first
    deleteBlobUrl()
    // Check file > 2MB -> return
    if (f.length > 0 && f[0].size > 1024 * 1024 * 2) {
      mess.error('Ảnh không thể lớn hơn 2MB')
      return
    }
    businessLicenceFile.value = [...f]
  }
})
// clear business licence uploaded to preview
function clearBL() {
  deleteBlobUrl()
  businessLicenceFile.value = []
}
// Call api upload business
async function bLicenseSubmit() {
  await doUploadBL({ images: businessLicenceFile.value[0], text: [] })
}

// -------- Hotel Image Files ------------
// Define hotel files array
const hotelFiles = ref<File[]>([])
// Create blob url from hotel files array
const previewBlobUrls = computed(() => {
  if (hotelFiles.value.length > 0) {
    return hotelFiles.value.map((f) => URL.createObjectURL(f))
  }
})
// open dialog to choose hotel photos
const { open: openChoosePhotos } = useFileInput({
  accept: 'image/*',
  onChange: (f) => {
    // Delete blob first
    deleteBlobUrl()
    let isLarge = false
    // Check file > 2MB -> return
    f.forEach((file) => {
      if (file.size > 1024 * 1024 * 2) {
        mess.error('Ảnh không thể lớn hơn 2MB')
        isLarge = true
        return
      }
    })

    if (!isLarge) {
      hotelFiles.value = [...f]
    }
  }
})
// clear hotel photos uploaded to preview
function clearPhotos() {
  deleteBlobUrl()
  hotelFiles.value = []
}

async function hotelFilesSubmit() {
  // Get files
  const files = hotelFiles.value.map((f) => f)
  // Create form data and loop for to add images and text field
  const formData = new FormData()
  // images fields
  for (let i = 0; i < files.length; i++) {
    formData.append('images', files[i])
  }
  // text fields
  for (let i = 0; i < hotelPhotos.value.length; i++) {
    formData.append('text', hotelPhotos.value[i])
  }
  await doUploadPhotos(formData)
}

function deleteBlobUrl() {
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
