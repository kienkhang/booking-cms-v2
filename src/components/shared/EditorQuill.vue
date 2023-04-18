<template lang="pug">
div
  label.font-bold {{ title }}
  QuillEditor(theme='snow' toolbar='essential' content-type="html" style='height: 150px;' v-model:content='textEditor' ref='target')
</template>

<script setup lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { QuillEditor } from '@vueup/vue-quill'
import {} from '@vueup/vue-quill'
// Props & Emits
defineProps<{
  title: string
  content: string
}>()
const emit = defineEmits<{
  (e: 'update:content', value: string): void
}>()

// editor model
const textEditor = ref('')

// Change content in parent component
watchDebounced(
  [textEditor],
  () => {
    emit('update:content', textEditor.value)
  },
  {
    debounce: 200
  }
)
</script>

<style scoped></style>
