<template lang="pug">
div
  .font-semibold Hình ảnh phòng
    hr
    FormKit(type='form' :actions='false' @submit='hotelFilesSubmit()' style='width: 100%; padding: 16px;')
      FormKit(type='file' name='fileimage' id='fileimage' enctype='multipart/form-data' v-model='roomFiles' multiple)
      FormKit(type='submit' name='update-img' input-class='w-max') Cập nhật
    .grid.grid-cols-3.gap-2.border.rounded-10.p-2
      figure(v-for='img in previewBlobUrls' class='w-max')
        NImage(width="200" :src='img')
</template>

<script setup lang="ts">
import { NImage } from 'naive-ui'
import { type IFormKitFile } from '@/dtos/shared'

const roomFiles = ref<IFormKitFile[]>([])
const previewBlobUrls = computed(() => {
  if (roomFiles.value.length > 0) {
    return roomFiles.value.map((f) => URL.createObjectURL(f.file))
  }
})
const hotelFilesSubmit = () => {
  console.log('Hotel Submit')
}

const deleteBlobUrl = () => {
  // before unmount -> delete blob url
  // Delete hotel images blob url
  if (previewBlobUrls.value?.length > 0) {
    previewBlobUrls.value.forEach((b) => URL.revokeObjectURL(b))
  }
}
onBeforeUnmount(() => {
  deleteBlobUrl()
})
</script>

<style scoped></style>
