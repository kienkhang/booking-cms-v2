<template lang="pug">
FormKit(type='form' :actions='false' )
  FormKit(type='text' v-model='name' name='name' label='Tên gói', placeholder='Nhập tên gói giá')
  //- Activate
  .flex.flex-col.gap-1.justify-start
    label.font-bold Kích hoạt
    NSwitch.w-full(v-model:value='activated' style="width:max-content")
  FormKit(v-model="type"
              type="select"
              label="Loại gói"
              name="type"
              placeholder="Chọn gói giá"
              validation='required'
              :options='typeOptions||[{ label: "Không có dữ liệu", value: "nodata", attrs: { disabled: true } }]'
              )
  FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Bữa ăn sáng' name='free_breakfast' v-model='free_breakfast')
  FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Bữa ăn trưa' name='free_dinner' v-model='free_dinner')
  FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Bữa ăn tối' name='free_lunch' v-model='free_lunch')
  FormKit(type='submit' name='submit-btn' input-class='w-max' wrapper-class='flex justify-end')
    span {{isEditForm ?'Cập nhật':'Tạo'}}
</template>

<script setup lang="ts">
const props = defineProps<{
  formType: 'add' | 'edit'
}>()
const isEditForm = computed(() => props.formType === 'edit')
const form = reactive({
  name: '',
  type: 0,
  activated: false,
  free_breakfast: false,
  free_lunch: false,
  free_dinner: false
})
const { activated, free_breakfast, free_dinner, free_lunch, name, type } = toRefs(form)

const typeOptions = ref([
  {
    label: 'Hoàn tiền',
    value: 1
  },
  {
    label: 'Không hoàn tiền',
    value: 2
  }
])
</script>

<style scoped></style>
