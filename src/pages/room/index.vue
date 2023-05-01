<template lang="pug">
.flex.flex-wrap.items-center.gap-3
  RoomCardItem(v-for='room in fakeData' :data='room' :key='room.id')
</template>

<script setup lang="ts">
const fakeData = ref([
  {
    id: '75f38ce2-e254-4733-943c-76d6a003ead5',
    content:
      'Kích thước phòng: 38 m² / 409 ft². Không hút thuốc. Vòi hoa sen. Wifi miễn phí Wifi miễn phí Wifi miễn phí Wifi miễn phí'
  },
  {
    id: '03bb21cb-7907-43b4-9459-40a4da3e21e6',
    content:
      'Kích thước phòng: 38 m² / 409 ft². Không hút thuốc. Vòi hoa sen. Wifi miễn phí Wifi miễn phí Wifi miễn phí Wifi miễn phí'
  },
  {
    id: '58a6be03-c92f-4d67-8ef9-b7d18bca0611',
    content:
      'Kích thước phòng: 38 m² / 409 ft². Không hút thuốc. Vòi hoa sen. Wifi miễn phí Wifi miễn phí Wifi miễn phí Wifi miễn phí'
  },
  {
    id: 'e9dbaebf-b9f5-44b0-92a8-792a1b5b3762',
    content:
      'Kích thước phòng: 38 m² / 409 ft². Không hút thuốc. Vòi hoa sen. Wifi miễn phí Wifi miễn phí Wifi miễn phí Wifi miễn phí'
  }
])
</script>

<style scoped></style>
