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
      :is-date-disabled='disablePreviousDate'
    )
  NFormItem( label='End' path='end_at')
    NDatePicker(
      v-model:value='form.end_at'
      type='date'
      style='width:100%'
      :is-date-disabled='disablePreviousDate'
    )
  NFormItem(label='Except')
    NSelect(
      multiple 
      v-model:value='form.except_room'
      :options='exceptOptions'
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
  NButton,
  NSelect
} from 'naive-ui'
import dayjs from 'dayjs'
import voucher_codes from 'voucher-code-generator'

const props = defineProps<{
  voucher: IVoucher
}>()

const emit = defineEmits<{
  (e: 'close-modal'): void
}>()

// ======= HANDLE SELECT EXCEPT ROOM ========
// Get room to bind value
const { rooms } = storeToRefs(useRoomStore())
const { getRooms } = useRoomStore()
const { executeApi: fetchRooms } = getRooms()
onMounted(() => fetchRooms())

// Define options
const exceptOptions = computed(() => {
  return rooms.value.map((room) => {
    return {
      label: room.name,
      value: room.id
    }
  })
})

// Define from ref
const formRef = ref<FormInst | null>(null)
// Define form value
const form = ref({
  hotel_id: props.voucher.hotel_id,
  activate: props.voucher.activated,
  name: props.voucher.name,
  discount: props.voucher.discount,
  begin_at: +dayjs(props.voucher.begin_at),
  end_at: +dayjs(props.voucher.end_at),
  code: props.voucher.code,
  except_room: []
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

// Call api create voucher
const { updateVoucher } = useVoucher()
const { callUpdate } = updateVoucher(form, props.voucher.id)

// Submit
function doSubmit(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      const format = {
        ...form.value,
        begin_at: dayjs(form.value.begin_at).format('YYYY-MM-DD'),
        end_at: dayjs(form.value.end_at).format('YYYY-MM-DD')
      }
      console.log('form', { ...format })
      callUpdate(format)
      emit('close-modal')
    } else {
      // console.log(errors)
    }
  })
}

// // disable previous dates
function disablePreviousDate(ts: number) {
  return ts < Date.now()
}
</script>

<style scoped></style>
