<template lang="pug">
div
  //- Loading(v-if='isLoading')
  NCollapse(display-directive='show' :default-expanded-names="['1','2','3','4']")
    NCollapseItem(title='Thông tin' name='1')
      template(#arrow)
        
      template(#header)
        .font-bold.text-lg Thông tin cơ bản
      .flex.flex-col.gap-4
        .grid.grid-cols-12.room-name
            .col-span-3
              span.font-semibold Tên phòng
            .col-span-9
              span.font-semibold {{ currentHotel?.name }}
        .grid.grid-cols-12.room-overview
            .col-span-3
              span.font-semibold Mô tả
            .col-span-9
              span(v-html='currentHotel?.overview')
        .grid.grid-cols-12.room-overview
            .col-span-3
              span.font-semibold Địa chỉ
            .col-span-9
              span.font-medium {{ currentHotel?.raw_address }}
        .grid.grid-cols-12.room-overview
            .col-span-3
              span.font-semibold Xếp hạng
            .col-span-9
              NRate( readonly allow-half :value='3.5')
    NCollapseItem(title='Thông tin ngân hàng' name='2')
      template(#arrow)
        
      template(#header)
        .font-bold.text-lg Thông tin ngân hàng
      .flex.flex-col.gap-4
        .grid.grid-cols-12.room-name
            .col-span-3
              span.font-semibold Tên người thụ hưởng
            .col-span-9
              span.font-semibold {{ currentHotel?.bank_beneficiary }}
        .grid.grid-cols-12.room-overview
            .col-span-3
              span.font-semibold Số tài khoản
            .col-span-9
              span.font-semibold {{ currentHotel?.bank_account }}
        .grid.grid-cols-12.room-overview
            .col-span-3
              span.font-semibold Ngân hàng
            .col-span-9
              span.font-semibold {{ bankName?.name }} ({{ bankName?.shortName }})
    NCollapseItem(title='Loại hình kinh doanh và tiện ích' name='3')
      template(#header)
        .font-bold.text-lg Loại hình kinh doanh và tiện ích
      .flex.flex-col.gap-4
        .grid.grid-cols-12.room-views
            .col-span-3
              span.font-semibold Loại hình kinh doanh
            .col-span-9
              .flex.items-center.gap-x-10.gap-y-2.flex-wrap
                .flex.items-center.gap-2(v-for='t in hotelTypes' :key='t.type') 
                  icon-icon-park-outline:check-one.w-4.h-4.text-green-500
                  span.font-semibold {{ t.label }}
        .grid.grid-cols-12.room-views
            .col-span-3
              span.font-semibold Tiện ích
            .col-span-9
              .flex.items-center.gap-x-10.gap-y-2.flex-wrap
                .flex.items-center.gap-2(v-for='f in hotelFacilities' :key='f.facility') 
                  icon-icon-park-outline:check-one.w-4.h-4.text-green-500
                  span.font-semibold {{ f.label }}
    NCollapseItem(title='Hình ảnh' name='4')
      template(#header)
        .font-bold.text-lg Hình ảnh
      .flex.items-center.flex-wrap.gap-4
        .rounded-lg.overflow-hidden(v-for='photo in roomPhotos' class='max-h-[120px]')
          NImage(:width='200' :src='photo' object-fit='cover')
  
</template>

<script setup lang="ts">
// import Loading from '../shared/Loading.vue'
import { NCollapse, NCollapseItem, NImage, NRate } from 'naive-ui'
import _omit from 'lodash-es/omit'
import _capitalize from 'lodash-es/capitalize'
import { Image2Array } from '@/utils/format'
import { VIETNAM_BANKING_LIST } from '@/constant/bank'
// const route = useRoute()

// ============== GET ROOM BY ID ===============
const { currentHotel } = storeToRefs(useHotelsStore())

// Hotel Types
const hotelTypes = computed<
  {
    type: string
    label: string
    enabled: boolean
  }[]
>(() => {
  // Create array to contain results
  const types = []
  // Omit unescessary fields
  const omitted = _omit(currentHotel.value?.hotel_type, ['hotel_id', 'created_at', 'updated_at'])
  // Filter view or
  for (const type in omitted) {
    ;(omitted[type] as boolean) &&
      types.push({
        type: type,
        label: _capitalize(type.replace('_', ' ')),
        enabled: omitted[type] as boolean
      })
  }
  return types
})
// Hotel Facilities
const hotelFacilities = computed<
  {
    facility: string
    label: string
    enabled: boolean
  }[]
>(() => {
  const facilities = []
  const omitted = _omit(currentHotel.value?.hotel_facility, [
    'hotel_id',
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
// Hotel Photos
const roomPhotos = computed(() => {
  if (currentHotel.value?.hotel_photos) return Image2Array(currentHotel.value?.hotel_photos)
})
// Hotel Banks
const bankName = computed(() =>
  VIETNAM_BANKING_LIST.find((bank) => bank.code === currentHotel.value?.bank_name)
)
</script>

<style scoped></style>
