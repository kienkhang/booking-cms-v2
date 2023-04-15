<template lang="pug">
QuillEditor(theme='snow' toolbar='essential' content-type="html" style='height: 150px;' v-model:content='content')

span {{ content }}
</template>

<script setup lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { QuillEditor } from '@vueup/vue-quill'
import {} from '@vueup/vue-quill'

const content = ref('')
</script>

<style scoped></style>
