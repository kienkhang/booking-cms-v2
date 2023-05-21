<template lang="pug">
div
  Loading(v-if='isLoading')
  .flex.flex-wrap.items-center.gap-3(v-else='')
    RoomCardItem(v-for='room in rooms' :data='room' :key='room.id')
  .flex.items-center.justify-between.mt-6
        NPagination(
          v-model:page='pagination.page',
          :item-count='roomCount',
          :page-size='6'
        )
</template>

<script setup lang="ts">
import Loading from '@/components/shared/Loading.vue'
import { NPagination, type PaginationInfo } from 'naive-ui'

const { roomCount, rooms } = storeToRefs(useRoomStore())
const { getRooms } = useRoomStore()

const { isLoading } = getRooms()
// Handle Paging rooms
const pagination = ref<Partial<PaginationInfo>>({
  page: 1,
  pageSize: 6
})
</script>

<style scoped></style>
