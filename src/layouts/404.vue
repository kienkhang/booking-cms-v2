<template lang="pug">
div(class="flex flex-col items-center justify-center w-full h-screen")
  icon-custom-error(class='w-auto h-[245px] text-blue-600')
  div(class="flex flex-col items-center justify-center")
    p(class="mt-12 text-3xl text-gray-800 md:text-4xl lg:text-5xl") Page Not Found
    p(class="mt-8 text-gray-600 md:text-lg lg:text-xl") Sorry, the page you are looking for could not be found.
    button( class="flex items-center px-4 py-2 mt-12 space-x-2 text-gray-100 transition duration-150 bg-blue-600 rounded hover:bg-blue-700") Return Home
  router-view

</template>

<script setup lang="ts"></script>

<style scoped></style>
