import { hotelsApi } from '@/apis/hotel'

function useRequestPayout() {
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
  return { send }
}

export { useRequestPayout }
