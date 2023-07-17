<template lang="pug">
FormKit(type='form' name='rateplan_form' id='rateplan_form' @submit="doSubmit" :actions='false' style='width: 100%;')
    //- name input
    FormKit(type='text' v-model='name' label='Tên gói' name="name" placeholder='Nhập tên gói' validation="required")
    //- type input
    FormKit(type='select' v-model='type' :options='options' label='Loại gói' name="type" placeholder='Chọn loại gói' validation="required")
    //- free breakfast input
    FormKit(type='checkbox' v-model='free_breakfast' decorator-icon="mdi:check:16" label='Miễn phí buổi sáng' name='free_breakfast')
    //- free lunch input
    FormKit(type='checkbox' v-model='free_lunch' decorator-icon="mdi:check:16" label='Miễn phí buổi trưa' name='free_lunch')
    //- free dinner input
    FormKit(type='checkbox' v-model='free_dinner' decorator-icon="mdi:check:16" label='Miễn phí buổi tối' name='free_dinner')
    .flex.flex-col.gap-1.justify-start.mb-4
      label.font-bold Kích hoạt
      NSwitch.w-full(v-model:value='activate' style="width:max-content")
    //- submit button
    FormKit.block.w-full(type="submit" name='submit-button' input-class='bg-green-500')
      span {{ type ==='add'? 'Tạo':'Cập nhật' }}
      //- icon-custom-load.w-4.h-4.animate-spin(v-else)
</template>

<script setup lang="ts">
import type { IRatePlan } from '@/dtos'

// Define Props
const props = defineProps<{
  ratePlan?: IRatePlan
  type: 'add' | 'edit'
}>()

// ROUTE & ROUTER
const route = useRoute()

// Rate plan type options
const options = ref([
  {
    label: 'Hoàn tiền',
    value: '1'
  },
  {
    label: 'Không hoàn tiền',
    value: '2'
  }
])
// computed is edit form
const isEditForm = computed(() => props.type === 'edit')

// get roomId from url
const roomId = computed(() => route.params?.id as string)

// create form
const form = ref({
  activate: true,
  free_breakfast: false,
  free_dinner: false,
  free_lunch: false,
  name: '',
  type: '1',
  room_type_id: roomId.value,
  status: 1
})
// Destructuring form
const { activate, free_breakfast, free_dinner, free_lunch, name, type } = toRefs(form.value)

// Biding form
const bindingForm = () => {
  activate.value = props.ratePlan.activate
  free_breakfast.value = props.ratePlan.free_breakfast
  free_dinner.value = props.ratePlan.free_dinner
  free_lunch.value = props.ratePlan.free_lunch
  name.value = props.ratePlan.name
  type.value = props.ratePlan.type
}
// if is edit form -> biding value to form
if (isEditForm.value) {
  bindingForm()
}

// ================== CALL API ========================
const { createRatePlan, updateRatePlan } = useRatePlan()

const { executeApi: exeCreate } = createRatePlan(form)

const { executeApi: exeUpdate } = updateRatePlan(form, props.ratePlan?.id)

const doSubmit = async () => {
  if (!isEditForm.value) {
    await exeCreate()
  } else {
    await exeUpdate()
  }
}
</script>

<style scoped></style>
