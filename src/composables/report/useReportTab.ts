const useReportTab = defineStore('report__useReportTab', () => {
  const selectedTab = ref('report')

  // List tabs
  const tabs = [
    {
      key: 'report',
      name: 'Report'
    },
    {
      key: 'payout',
      name: 'Payout'
    }
  ]

  function changeTab(value: string) {
    selectedTab.value = value
  }

  return {
    tabs,
    selectedTab,
    changeTab
  }
})

export { useReportTab }
