<template lang="pug">
div.flex.items-center(class='h-[100px] gap-2.5 py-4 px-5 bg-white')
  .logo-container.w-64.flex-shrink-0.flex.items-center.gap-1(class='cursor-pointer select-none')
    //- Import logo here
    icon-custom-logo-origin(class='w-max h-[64px]')
    .font-bold.text-lg Siphoria
  .main-header.flex.items-center.flex-grow.justify-between
    //- DashboardSearch
    .p-2
    .flex.items-center.gap-5
      DashboardNotification
      DashboardAvatar
</template>

<script setup lang="ts"></script>

<style scoped></style>
