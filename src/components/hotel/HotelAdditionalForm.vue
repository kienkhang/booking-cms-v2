<template lang="pug">
div
  FormKit(type='form' name='additional_form' id='config_form' :actions='false' style='width: 100%; padding: 16px;')
    .hotel_basic_info.flex.flex-col.gap-3
      .text-3xl.font-bold Mô hình kinh doanh
        hr
      .grid.grid-cols-3.gap-3
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Khách sạn' name='hotel')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Căn hộ' name='apartment')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Resort' name='resort')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Villa' name='villa')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Cắm trại' name='camping')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Nhà nghỉ' name='motel')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Home Stay' name='homestay')
    .hotel_basic_info.flex.flex-col.gap-3
      .text-3xl.font-bold Tiện ích
      hr
      .grid.grid-cols-3.gap-3
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Bãi biển' name='beach')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Hồ bơi' name='pool')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Quầy bar' name='bar')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Phòng không hút thuốc' name='no_smoking_room')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Phòng thể hình' name='fitness')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Bồn tắm' name='bath')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Wifi' name='wifi')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Breakfast' name='breakfast')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Casio' name='casio')
        FormKit(type='checkbox' decorator-icon="mdi:check:16" label='Bãi đỗ xe' name='parking')

</template>

<script setup lang="ts"></script>

<style scoped></style>
