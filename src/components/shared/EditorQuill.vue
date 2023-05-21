<template lang="pug">
div
  label.font-bold {{ title }}
  QuillEditor(theme='snow' toolbar='essential' content-type="html" style='height: 150px;' v-model:content='content' ref='target' @ready="true")
</template>

<script setup lang="ts">
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { QuillEditor } from '@vueup/vue-quill'
import {} from '@vueup/vue-quill'
// Props & Emits
const props = defineProps<{
  title: string
  content: string
}>()
const emit = defineEmits<{
  (e: 'update:content', value: string): void
}>()

// Reactive Content Biding default and setter by emit
const content = computed({
  get() {
    return props.content
  },
  set(newValue: string) {
    emit('update:content', newValue)
  }
})
</script>

<style scoped></style>
