<template lang="pug">
div
  h2.text-2xl.font-bold.mb-4 Upload Files
  div.flex.flex-col.items-center.justify-center.w-full
    form.w-full.max-w-lg(@submit.prevent="doSubmit" enctype="multipart/form-data")
      div.flex.flex-wrap.-mx-3.mb-6
        div.w-full.px-3.mb-6(class='md:mb-0')
          label.block.uppercase.tracking-wide.text-gray-700.text-xs.font-bold.mb-2(for="files") Select Files
          input(ref = "fileRef" type="file" id="files" name="files" multiple class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500", @change="doSelectFiles")
          button(type="submit" class='p-2 text-white bg-green-500 rounded-md') {{ isLoading ? "Loading...":"Send" }}
    div(v-for='file in files' v-if='files')
      span {{ file.name }}
</template>

<script setup lang="ts">
import { uploadFiles } from '@/apis/file'

const files = ref<File[]>([])
const { execute, isLoading } = uploadFiles({})
const fileRef = ref()
const doSelectFiles = () => {
  files.value = fileRef.value.files
}
const doSubmit = async () => {
  let formData = new FormData()
  if (files.value) {
    for (let i = 0; i < files.value.length; i++) {
      formData.append(`images`, files.value[i])
    }
    await execute({ data: formData })
  }
}
</script>

<route lang="yaml">
meta:
  layout: dashboard
</route>
