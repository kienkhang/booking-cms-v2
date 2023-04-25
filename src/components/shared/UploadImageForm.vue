<template lang="pug">
div
  FormKit(type='form' :actions='false' @submit='up' style='width: 100%; padding: 16px;')
    FormKit(type='file' name='fileimage' id='fileimage' enctype='multipart/form-data' v-model='fileRef' multiple)
    FormKit(type='submit' name='update-img' input-class='w-max') Cập nhật
  .grid.grid-cols-3.gap-2.border.rounded-10.p-2
    figure(v-for='img in previews' class='w-max')
      img(:src='img', alt="Demo", :srcset='img' class='object-cover h-56 min-w-[200px]')
</template>

<script setup lang="ts">
const files = ref<File[]>()
const fileRef = ref()

const previews = ref<string[]>([])

const emit = defineEmits<{
  (e: 'upload'): void
  (e: 'change-file', newFiles: File[]): void
}>()

const up = () => {
  emit('upload')
}

// Do fileRef trả ra [{name, file},{...}] nên cần map cho files
watch(fileRef, () => {
  if (fileRef.value) {
    files.value = [...fileRef.value].map((f) => f.file)
  }
})
// mỗi lần chọn file thì thay đổi
watch([files], () => {
  emit('change-file', files.value)
  // Mỗi lần files thay đổi thì phải xóa hết blob cũ của previews sau đó gán cho preview giá trị mới
  previews.value?.forEach((blobString) => URL.revokeObjectURL(blobString))
  // Sau đó set ảnh mới cho previews
  if (files.value.length) {
    previews.value = [...files.value].map((file) => URL.createObjectURL(file))
  }
})
// mỗi lần fileRef thay đổi, tức là xóa sự lựa chọn hoặc thay đổi sự lựa chọn
// thì preview sẽ xóa hết objectURL và previews sẽ không còn gì hết
watch([fileRef], () => {
  previews.value?.forEach((blobString) => URL.revokeObjectURL(blobString))
  previews.value = []
})
</script>

<style scoped></style>
