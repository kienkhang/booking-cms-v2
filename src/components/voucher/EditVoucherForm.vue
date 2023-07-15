<template lang="pug">
NForm(
  ref='formRef'
  :rules='rules'
  :model='form'
)
  NFormItem(label='Kích hoạt', path='activate')
    NSwitch.w-full(v-model:value='form.activate' style="width:max-content")
  NFormItem( label='Tên voucher' path='name')
    NInput(
      placeholder="Input voucher name",
      v-model:value='form.name'
    )
  .flex.items-center.gap-2.justify-between
    NFormItem( label='Mã voucher' path='code')
      NInput(
        placeholder="Input voucher code",
        v-model:value='form.code'
        style='width:100%'
      )
    button(type='submit' class='inline-block p-2 border rounded w-36 h-max' @click='generateCode') Generate code
  NFormItem( label='Discount' path='discount')
    NInputNumber(
      v-model:value='form.discount'
      :step='0.01'
      :min='0'
      :max='1'
      style='width:100%'
    )
  NFormItem( label='Begin' path='begin_at')
    NDatePicker(
      v-model:value='form.begin_at'
      type='date'
      style='width:100%'
    )
  NFormItem( label='End' path='end_at')
    NDatePicker(
      v-model:value='form.end_at'
      type='date'
      style='width:100%'
    )
  NFormItem(style='width:100%')
    NButton(class='w-full p-3 border' @click='doSubmit') Submit

</template>

<script setup lang="ts">
import {
  type FormRules,
  type FormInst,
  NDatePicker,
  NInputNumber,
  NSwitch,
  NForm,
  NFormItem,
  NInput,
  NButton
} from 'naive-ui'
import dayjs from 'dayjs'
import voucher_codes from 'voucher-code-generator'

const props = defineProps<{
  voucher: {}
}>()

// Get hotel from store
const { currentHotel: hotel } = storeToRefs(useHotelsStore())
const hotelId = computed(() => {
  if (hotel.value) {
    return hotel.value.id
  }
})
// Whenever exist hotelid -> set hotel id
whenever(hotelId, () => {
  form.value.hotel_id = hotelId.value
})

// Define from ref
const formRef = ref<FormInst | null>(null)
// Define form value
const form = ref({
  hotel_id: hotelId.value,
  activate: false,
  name: '',
  discount: 0.15,
  begin_at: +dayjs(),
  end_at: +dayjs(),
  code: ''
})
// Define form rules
const rules = ref<FormRules>({
  name: {
    required: true,
    message: 'Please input your name',
    trigger: ['input', 'blur']
  },
  code: {
    required: true,
    message: 'Please input your code',
    trigger: ['input', 'blur']
  }
})

// auto create voucher code
function generateCode() {
  const codes = voucher_codes.generate({
    length: 8,
    count: 1
  })
  form.value.code = codes[0]
}

// Submit
function doSubmit(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log('form', { ...form.value })
    } else {
      // console.log(errors)
    }
  })
}
</script>

<style scoped></style>
