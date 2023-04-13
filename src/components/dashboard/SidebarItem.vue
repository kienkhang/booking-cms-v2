<template lang="pug">
nav.rounded-lg.py-4.px-6.flex.flex-items.gap-3.cursor-pointer.select-none(:class='["text-roman-silver",{"text-white bg-green-500":activated},{"hover:bg-bright-gray":!activated}]' @click='navigate()')
  slot(name='icon')

  .font-bold {{ label }}

</template>

<script setup lang="ts">
const props = defineProps({
  activated: {
    type: Boolean,
    default: false,
    required: true
  },
  page: {
    type: String,
    default: '',
    required: true
  },
  label: {
    type: String,
    default: '',
    required: true
  }
})

const router = useRouter()

const navigate = () => {
  router.push({ name: props.page })
}
</script>

<style scoped></style>
