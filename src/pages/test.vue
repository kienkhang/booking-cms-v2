<template lang="pug">
div
  h2.text-2xl.font-bold.mb-4 Upload Files
  div.flex.flex-col.items-center.justify-center.w-full
    form.w-full.max-w-lg(@submit.prevent="doSubmit")
      div.flex.flex-wrap.-mx-3.mb-6
        div.w-full.px-3.mb-6(class='md:mb-0')
          label.block.uppercase.tracking-wide.text-gray-700.text-xs.font-bold.mb-2(for="files") Select Files
          input(ref = "fileRef" type="file" id="files" name="files" multiple class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500", @change="doSelectFiles")
          button(type="submit" class='p-2 rounded-md bg-green-500 text-white') {{ !isLoading ? "Send":"Loading..." }} 
    div(v-for='file in files' v-if='files')
      span {{ file.name }}
</template>

<script setup lang="ts">
import { uploadFiles } from '@/apis/file'

const files = ref<File[]>([])
const { execute, isLoading, data: res } = uploadFiles(files.value)

const fileRef = ref()
const doSelectFiles = () => {
  // console.log('🐔🦢 ~ fileRef:', fileRef.value.files)
  files.value = fileRef.value.files
  console.log('🐔🦢 ~ files:', files.value)
}
const doSubmit = async () => {
  if (files.value) {
    await execute()
    console.log('🐔🦢 ~ doSubmit ~ response:', res.value)
  }
}
</script>

<style scoped></style>
