import { hotelsApi } from '@/apis/hotel'

function usePayout() {
  const { getReports } = useReport()
  const { executeApi: fetchReports } = getReports()

  function send(data: Ref<any | {}>, hotelId: string) {
    const usedSend = hotelsApi.sendPayout(data, hotelId)

    const { execute } = usedSend

    async function executeApi() {
      try {
        await execute({ data: data.value })
        fetchReports()
      } catch (error) {
        throw error
      }
    }
    return {
      ...usedSend,
      executeApi
    }
  }

  const { getPayoutsAdmin } = useGetPayouts()
  const { executeApi: fetchPayoutsAdmin } = getPayoutsAdmin()

  function resolvePayout(payoutId: string) {
    const usedResolve = hotelsApi.resolvePayout(payoutId)

    const { execute } = usedResolve

    async function executeApi() {
      try {
        await execute()
        fetchPayoutsAdmin()
        // fetchReports()
        // fetchPayouts
      } catch (error) {
        throw error
      }
    }
    return {
      ...usedResolve,
      executeApi
    }
  }

  return { send, resolvePayout }
}

export { usePayout }
