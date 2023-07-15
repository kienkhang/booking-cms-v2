<template lang="pug">
.bg-white.rounded-lg.w-64.border.overflow-hidden
  .flex.flex-col
    .flex.items-center.gap-4.px-4.py-3.shadow-md.bg-crayola.text-white
      icon-mdi:pencil.w-5.h-5.flex-shrink-0.cursor-pointer(class='hover:animate-pulse' @click='openModal()')
      span.text-lg.font-bold.line-clamp-2 {{ voucher.name }}
    .px-4.py-3.space-y-4
      .flex.items-center.justify-between
        span.font-bold Code
        span {{ voucher.code }}
      .flex.items-center.justify-between
        span.font-bold Expire
        span {{ format }}
  NModal(
    :show='show'
    @mask-click='closeModal'
  )
    .bg-white.rounded-lg.max-w-lg.w-full.px-5.pt-6(class='overflow-auto scroll-hide')
      EditVoucherForm(@close-modal='closeModal' :voucher='voucher')

</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { NModal } from 'naive-ui'
import EditVoucherForm from './EditVoucherForm.vue'

const props = defineProps<{
  voucher: IVoucher
}>()

const format = computed(
  () =>
    `${dayjs(props.voucher.begin_at).format('YYYY-MM-DD')} - ${dayjs(props.voucher.end_at).format(
      'YYYY-MM-DD'
    )}`
)

const show = ref(false)
function closeModal() {
  show.value = false
}
function openModal() {
  show.value = true
}
</script>

<style scoped></style>
