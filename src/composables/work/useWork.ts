import { workApis } from '@/apis/works'
import type { IWorkAdd, IWorks } from '@/dtos'

const useWorks = () => {
  // log message
  const message = useMessage()
  // works
  const works = ref<IWorks>(null)

  function getWorks(userId: string) {
    // call api
    const usedGetWorks = workApis.getHotelWorks(userId)
    // destructuring useAxios struct
    const { execute, data } = usedGetWorks

    // after finished && not error -> Get work
    async function executeApi() {
      try {
        await execute()
        works.value = data.value
      } catch (e) {
        message.error('Lấy thất bại')
        throw new Error(e)
      }
    }

    // return with custom useAxios struct
    return {
      ...usedGetWorks,
      executeApi
    }
  }

  // handle create work
  function createWork(form: Ref<IWorkAdd>) {
    // call api
    const usedCreateUser = workApis.createHotelWork(form.value)
    // destructuring useAxios struct
    const { execute } = usedCreateUser

    // after finished && not error -> Get work
    async function executeApi() {
      try {
        await execute({ data: { ...form.value } })
        message.success('Tạo thành công')
        getWorks(form.value.user_id).executeApi()
      } catch (e) {
        message.error('Tạo thất bại')
        throw new Error(e)
      }
    }
    // return with custom useAxios struct
    return {
      ...usedCreateUser,
      executeApi
    }
  }
  // handle delete work
  function deleteWork(form: Ref<IWorkAdd>) {
    // call api
    const usedDeleteWork = workApis.deleteHotelWork(form.value)
    // destructuring useAxios struct
    const { execute } = usedDeleteWork

    // after finished && not error -> Get work
    async function executeApi() {
      try {
        await execute({ data: { ...form.value } })
        message.success('Xoá thành công')
        getWorks(form.value.user_id).executeApi()
      } catch (e) {
        message.error('Xoá thất bại')
        throw new Error(e)
      }
    }
    // return with custom useAxios struct
    return {
      ...usedDeleteWork,
      executeApi
    }
  }

  return {
    works,
    getWorks,
    createWork,
    deleteWork
  }
}

export default defineStore('works__store', useWorks)
