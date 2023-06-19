<template lang="pug">
div
  input(
    type='file' 
    ref='fileRef' 
    class='hidden' name='fileimage'
    accept="image/*"
    enctype='multipart/form-data' 
    multiple
    @change='onChangeFile'
    )
  .flex.flex-row-reverse.gap-4
    Button(
        size='medium' 
        class='border-2 border-crayola text-crayola focus:outline-none'
        @press='chooseFiles'
      )
      icon-mdi:folder-upload-outline.w-4.h-4.flex-shrink-0
      span.font-medium Tải hình lên
    Button(
          size='medium' 
          class='text-red-500 border-2 border-red-500 focus:outline-none'
          @press='clearPhotos'
        )
      icon-mdi:close-circle-outline.w-4.h-4.flex-shrink-0
      span.font-medium Xoá hình ảnh
  .mt-5(v-if='previewBlobUrls.length > 0')
    span.text-2xl.font-bold Xem trước
    .flex.flex-wrap.gap-4.p-2
      figure(v-for='img in previewBlobUrls' class='w-max')
        NImage(width="200" :src='img')
    FormKit(type='form' @submit='doUpload' :actions='false')
      FormKit(
        type='submit'
        name='uploadimage'
        id='uploadimage'
        prefixIcon='mdi:cloud-upload'
      )
        span.font-medium Xác nhận
</template>

<script setup lang="ts">
import { NImage } from 'naive-ui'
import Button from '../shared/button/Button.vue'
import { Image2Array } from '@/utils/format'

// useMessage Hook to notification
const message = useMessage()

// Define ref connect input(type='file')
const fileRef = ref<HTMLInputElement | null>(null)
const hotelFiles = ref<File[]>([])

// Call api to submit images
const { currentRoom: room, getRoomById } = useRoom()
const roomPhotos = computed(() => Image2Array(room.value.photos))

const { uploadPhotos } = useRoom()

// Click button to open window choose files
function chooseFiles() {
  const open = () => {
    fileRef.value && fileRef.value.click()
  }
  open()
}
// 2. Onchange file to check files <= 2 MB ?
function onChangeFile() {
  // If exist target
  if (fileRef.value) {
    // binding files get from input
    const files = [...fileRef.value.files]
    files.forEach((file) => {
      // Check if a file is an image ?
      if (!file.type.includes('image')) {
        message.error('File phải là hình ảnh')
        hotelFiles.value = []
        return
      }
      // check file > 2 MB
      if (file.size > 1024 * 1024 * 2) {
        message.error('File không được lớn hơn 2MB')
        hotelFiles.value = []
        return
      }
      // Concat files to
      hotelFiles.value = hotelFiles.value.concat(file)
    })
  }
}

// 3. Upload image
async function doUpload() {
  const { executeApi: postPhotos } = uploadPhotos(room.value.id)
  const { executeApi: fetchRoom } = getRoomById(room.value.id)
  const formData = new FormData()

  // load new image
  hotelFiles.value.forEach((f) => {
    formData.append('images', f)
  })
  // keep old images
  roomPhotos.value.forEach((image) => {
    formData.append('text', image)
  })
  // call api
  await postPhotos(formData)
  await fetchRoom()
}

// const roomFiles = ref<IFormKitFile[]>([])
const previewBlobUrls = computed(() => {
  if (hotelFiles.value.length > 0) {
    return hotelFiles.value.map((f) => URL.createObjectURL(f))
  }
  return []
})

function deleteBlobUrl() {
  // Delete hotel images blob url
  if (previewBlobUrls.value.length > 0) {
    previewBlobUrls.value.forEach((b) => URL.revokeObjectURL(b))
  }
}
// before unmount -> delete blob url
onBeforeUnmount(() => {
  deleteBlobUrl()
})

function clearPhotos() {
  hotelFiles.value = []
  deleteBlobUrl()
}
</script>

<style scoped></style>
