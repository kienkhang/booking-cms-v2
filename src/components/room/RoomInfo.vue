<template lang="pug">
div
  Loading(v-if='isLoading')
  NCollapse(display-directive='show' :default-expanded-names="['1','2','3']")
    NCollapseItem(title='Thông tin cơ bản' name='1')
      template(#arrow)
        
      template(#header)
        .font-bold.text-lg Thông tin cơ bản
      .flex.flex-col.gap-4
        .grid.grid-cols-12.room-name
            .col-span-3
              span.font-semibold Tên phòng
            .col-span-9
              span.font-semibold {{ currentRoom?.name }}
        .grid.grid-cols-12.room-overview
            .col-span-3
              span.font-semibold Mô tả
            .col-span-9
              span.line-clamp-4 {{currentRoom?.description}}
    NCollapseItem(title='Phong cảnh và tiện ích' name='2')
      template(#header)
        .font-bold.text-lg Phong cảnh và tiện ích
      .flex.flex-col.gap-4
        .grid.grid-cols-12.room-views
            .col-span-3
              span.font-semibold Phong cảnh
            .col-span-9
              .flex.items-center.gap-x-10.gap-y-2.flex-wrap
                .flex.items-center.gap-2(v-for='view in roomViews' :key='view.view') 
                  icon-icon-park-outline:check-one.w-4.h-4.text-green-500
                  span.font-semibold {{ view.label }}
        .grid.grid-cols-12.room-views
            .col-span-3
              span.font-semibold Tiện ích
            .col-span-9
              .flex.items-center.gap-x-10.gap-y-2.flex-wrap
                .flex.items-center.gap-2(v-for='f in roomFacilities' :key='f.facility') 
                  icon-icon-park-outline:check-one.w-4.h-4.text-green-500
                  span.font-semibold {{ f.label }}
    NCollapseItem(title='Hình ảnh' name='3')
      template(#header)
        .font-bold.text-lg Hình ảnh
      .flex.items-center.flex-wrap.gap-4
        .rounded-lg.overflow-hidden(v-for='photo in roomPhotos' class='max-h-[120px]')
          NImage(:width='200' :src='photo' object-fit='cover')
  
</template>

<script setup lang="ts">
import Loading from '../shared/Loading.vue'
import { NCollapse, NCollapseItem, NImage } from 'naive-ui'
import _omit from 'lodash-es/omit'
import _capitalize from 'lodash-es/capitalize'
import { Image2Array } from '@/utils/format'
const route = useRoute()

// ============== GET ROOM BY ID ===============
// Route page /room/{id}/edit
// Get room id from route
const roomId = computed(() => route.params.id as string)
// if exist id -> isEdit === true
const { currentRoom } = storeToRefs(useRoomStore())

const { getRoomById } = useRoomStore()
const { isLoading } = getRoomById(roomId.value)
whenever(roomId, async () => {
  await getRoomById(roomId.value)
})

// Room Views
const roomViews = computed<
  {
    view: string
    label: string
    enabled: boolean
  }[]
>(() => {
  // Create array to contain results
  const views = []
  // Omit unescessary fields
  const omitted = _omit(currentRoom.value?.room_type_views, [
    'room_type_id',
    'created_at',
    'updated_at'
  ])
  // Filter view or
  for (const view in omitted) {
    ;(omitted[view] as boolean) &&
      views.push({
        view: view,
        label: _capitalize(view.replace('_', ' ')),
        enabled: omitted[view] as boolean
      })
  }
  return views
})
// Room Facilities
const roomFacilities = computed<
  {
    facility: string
    label: string
    enabled: boolean
  }[]
>(() => {
  const facilities = []
  const omitted = _omit(currentRoom.value?.room_type_facility, [
    'room_type_id',
    'created_at',
    'updated_at'
  ])
  for (const f in omitted) {
    ;(omitted[f] as boolean) &&
      facilities.push({
        facility: f,
        label: _capitalize(f.replace('_', ' ')),
        enabled: omitted[f] as boolean
      })
  }
  return facilities
})
// Room Photo
const roomPhotos = computed(() => {
  if (currentRoom.value?.photos) return Image2Array(currentRoom.value?.photos)
})
</script>

<style scoped></style>
