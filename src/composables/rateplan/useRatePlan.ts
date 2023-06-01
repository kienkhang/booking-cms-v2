import { rateplansApi } from '@/apis/rateplan'
import type { IRatePlanAdd, IRatePlanUpdate } from '@/dtos'
import useRatePlanStore from '@/stores/rateplan'

function useRatePlan() {
  // DEFINE AND DESTRUCTURING
  const message = useMessage()
  // Get current room
  const { currentRoom } = useRoom()
  // Destructuring rateplan, paging and filter and getRatePlans
  const { ratePlans, paging, filter } = storeToRefs(useRatePlanStore())
  const { getRatePlans } = useRatePlanStore()
  // Descutructring fetch handler
  const roomId = computed(() => currentRoom.value?.id)
  const { executeApi: fetchRatePlan } = getRatePlans(roomId)

  // CRUD HANDLER
  // Create Rate plan function
  const createRatePlan = (form: Ref<IRatePlanAdd>) => {
    // call api
    const usedCreateRatePlan = rateplansApi.createRatePlan(form.value)
    // destructuring useAxios struct
    const { isFinished, execute, error } = usedCreateRatePlan

    // after finished && not error -> Get hotel
    until(isFinished)
      .toBeTruthy()
      .then(() => {
        !error.value && fetchRatePlan() && message.success('Tạo gói thành công')
      })

    // return with custom useAxios struct
    return {
      ...usedCreateRatePlan,
      executeApi: () => execute({ data: { ...form.value } })
    }
  }
  // Update Rate plan function
  const updateRatePlan = (form: Ref<IRatePlanUpdate>, ratePlanId: string) => {
    // call api
    const usedUpdateRatePlan = rateplansApi.updateRatePlan(form.value, ratePlanId)
    // destructuring useAxios struct
    const { isFinished, execute, error } = usedUpdateRatePlan

    // after finished && not error -> Get hotel
    until(isFinished)
      .toBeTruthy()
      .then(() => {
        !error.value && fetchRatePlan() && message.success('Cập nhật gói thành công')
      })

    // return with custom useAxios struct
    return {
      ...usedUpdateRatePlan,
      executeApi: () => execute({ data: { ...form.value } })
    }
  }

  return {
    ratePlans,
    paging,
    filter,
    createRatePlan,
    updateRatePlan,
    getRatePlans
  }
}

export default useRatePlan
