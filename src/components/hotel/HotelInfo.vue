<template lang="pug">
div
  //- Loading(v-if='isLoading')
  NCollapse(display-directive='show' :default-expanded-names="['1','2','3','4','5']")
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
              .flex.items-center.justify-between
                NRate( readonly  :value='currentHotel?.rating' v-if='!isEditRating')
                NRate( v-model:value='rating' v-if='isEditRating')
                .flex.items-center.gap-2(v-auto-animate v-if='isAdmin')
                  Button(size="small" type='button' class='text-white bg-red-500' @click='isEditRating=false' v-if='isEditRating') Huỷ bỏ
                  Button(size="small" type='button' name='submit-update-cmsr' :class='["text-white bg-green-crayola",{"pointer-events-none cursor-not-allowed":uploading}]' @press='doUpdateRating' v-if='isEditRating')
                    icon-custom-load.w-4.h-4.animate-spin(v-if='uploading')
                    span(v-else) Cập nhật
                  Button(size="small" type='button' class='text-white bg-blue-500' @click='isEditRating=true' v-else) Chỉnh sửa
        .grid.grid-cols-12.room-overview
            .col-span-3
              span.font-semibold Tỉ lệ hoa hồng
            .col-span-9
                .flex.items-center.justify-between
                  span.font-bold.text-lg(v-if='!isEditCmsr') {{ currentHotel?.commission_rate * 100 }}%
                  NInputNumber(
                    v-model:value='commissionRate'
                    :step='0.01'
                    :min='0'
                    :max='1'
                    style='width:max-content'
                    v-else
                  )
                  .flex.items-center.gap-2(v-auto-animate v-if='isAdmin')
                    Button(size="small" type='button' class='text-white bg-red-500' @click='isEditCmsr=false' v-if='isEditCmsr') Huỷ bỏ
                    Button(size="small" type='button' name='submit-update-cmsr' :class='["text-white bg-green-crayola",{"pointer-events-none cursor-not-allowed":uploading}]' @press='doUpdateCmsr' v-if='isEditCmsr')
                      icon-custom-load.w-4.h-4.animate-spin(v-if='settingup')
                      span(v-else) Cập nhật
                    Button(size="small" type='button' class='text-white bg-blue-500' @click='isEditCmsr=true' v-else) Chỉnh sửa
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
        .rounded-lg.overflow-hidden(v-for='photo in hotelPhotos' class='max-h-[120px] relative')
          icon-mdi:close-circle.absolute.w-5.h-5.text-red-500.top-1.right-1.cursor-pointer(@click='deletePhotos(photo)' class='hover:opacity-80')
          NImage(:width='200' :src='photo' object-fit='cover')
    NCollapseItem(title='Giấy phép kinh doanh' name='5')
      template(#header)
        .font-bold.text-lg Giấy phép kinh doanh
      .flex.items-center.flex-wrap.gap-4
        .rounded-lg.overflow-hidden(class='max-h-[120px]')
          NImage(:width='200' :src='currentHotel?.business_licence' object-fit='cover')
  
</template>

<script setup lang="ts">
// import Loading from '../shared/Loading.vue'
import { NCollapse, NCollapseItem, NImage, NInputNumber, NRate } from 'naive-ui'
import _omit from 'lodash-es/omit'
import _capitalize from 'lodash-es/capitalize'
import { Image2Array } from '@/utils/format'
import { VIETNAM_BANKING_LIST } from '@/constant/bank'
import Button from '../shared/button/Button.vue'

// Authorization
const { isAdmin } = storeToRefs(useAccountsStore())

// ============== GET ROOM BY ID ===============
const { currentHotel } = storeToRefs(useHotelsStore())
const hotelId = computed(() => currentHotel.value?.id)

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
const hotelPhotos = computed(() => {
  if (currentHotel.value?.hotel_photos) return Image2Array(currentHotel.value?.hotel_photos)
})
// Hotel Banks
const bankName = computed(() =>
  VIETNAM_BANKING_LIST.find((bank) => bank.code === currentHotel.value?.bank_name)
)

// Edit rating & commission rate
const rating = ref(2)
const commissionRate = ref(currentHotel.value.commission_rate ?? 0.1)
const isEditRating = ref(false)
const isEditCmsr = ref(false)
const { settingCmsr, updateRating } = useHotel()
const { isLoading: settingup } = settingCmsr(hotelId.value)
const { isLoading: uploading } = updateRating(hotelId.value)

async function doUpdateRating() {
  const { executeApi: mutateUpdateRating } = updateRating(hotelId.value)
  await mutateUpdateRating(rating.value)
  isEditRating.value = false
}
async function doUpdateCmsr() {
  const { executeApi: mutateCmsr } = settingCmsr(hotelId.value)
  await mutateCmsr(commissionRate.value)
  isEditCmsr.value = false
}

// Delete image
const dialog = useDialog()

const { uploadPhotos } = useHotel()

function deletePhotos(photoUrl: string) {
  const { executeApi: doUploadPhotos } = uploadPhotos(hotelId.value)
  const restPhotos = hotelPhotos.value.filter((photo) => photo !== photoUrl)

  const formData = new FormData()
  restPhotos.forEach((photo) => {
    formData.append('text', photo)
  })

  dialog.warning({
    title: 'Xoá hình ảnh',
    content: 'Bạn có chắc là xoá hình ảnh này ?',
    negativeText: 'Huỷ',
    positiveText: 'Xoá',
    onPositiveClick: async () => {
      try {
        await doUploadPhotos(formData)
        dialog.destroyAll()
      } catch (error) {
        dialog.destroyAll()
      }
    }
  })
}
</script>

<style scoped></style>
