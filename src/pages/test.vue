<template lang="pug">
div
  h2.text-2xl.font-bold.mb-4 Upload Files
  div.flex.flex-col.items-center.justify-center.w-full
    form.w-full.max-w-lg(@submit.prevent="doSubmit" enctype="multipart/form-data")
      div.flex.flex-wrap.-mx-3.mb-6
        div.w-full.px-3.mb-6(class='md:mb-0')
          label.block.uppercase.tracking-wide.text-gray-700.text-xs.font-bold.mb-2(for="files") Select Files
          input(ref = "fileRef" type="file" id="files" name="files" multiple class="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500", @change="doSelectFiles")
          button(type="submit" class='p-2 text-white bg-green-500 rounded-md') {{ isLoading ? "Loading...":"Send" }}
    div(v-for='file in files' v-if='files')
      span {{ file.name }}

  //- test call page
  NDataTable(
    :columns='columns',
    :data='pagingData'
    :pagination='false'
   )
  NPagination(
        v-model:page='pagination.page',
        :page-count='cPaging?.total_pages'
        @update-page='callApiChange'
      )
</template>

<script setup lang="ts">
import { uploadFiles } from '@/apis/file'
import { calculatePaging } from '@/utils/paging'
import { type DataTableColumns, NDataTable, NPagination } from 'naive-ui'

const files = ref<File[]>([])
const { execute, isLoading } = uploadFiles({})
const fileRef = ref()
const doSelectFiles = () => {
  files.value = fileRef.value.files
}
const doSubmit = async () => {
  let formData = new FormData()
  if (files.value) {
    for (let i = 0; i < files.value.length; i++) {
      formData.append(`images`, files.value[i])
    }
    await execute({ data: formData })
  }
}

// test call page
function createColumn(): DataTableColumns<
  {
    id: string
    name: string
  }[]
> {
  return [
    {
      title: 'ID',
      key: 'id'
    },
    {
      title: 'Name',
      key: 'name'
    }
  ]
}

const columns = createColumn()
const { hotels, filter, paging } = storeToRefs(useHotelsStore())
const { getHotels } = useHotelsStore()
const { executeApi: fetchHotels } = getHotels()

const pagination = reactive({
  page: 1,
  // client_offset -> offset per page
  pageSize: 3,
  // toal_page ->
  pageCount: paging.value.total_pages
})

const cPaging = computed(() =>
  calculatePaging({
    offset: 3,
    page: pagination.page,
    serverData: hotels,
    total_items: paging.value.total_items,
    server_page: paging.value.page,
    server_offset: paging.value.offset
  })
)
const pagingData = computed(() => cPaging.value.data)
function callApiChange() {
  cPaging.value.changeServerPage(() => {
    filter.value.page = cPaging.value.alpha
    fetchHotels()
  })
}

// When fetch successful paging, exist totalPage -> assign pageCount
whenever(paging, () => {
  pagination.pageCount = paging.value.total_pages
})

onMounted(() => {
  filter.value = {
    page: 1,
    offset: 6
  }
  fetchHotels()
})
</script>

<route lang="yaml">
meta:
  layout: dashboard
  requiredAuth: true
</route>
