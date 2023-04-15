type IScreenState = 'main' | 'room' | 'rate_plan' | 'voucher' | 'inventory'
function useSettingsState() {
  const screen = ref<IScreenState>('room')

  const goto = (value: IScreenState) => {
    screen.value = value
  }
  return {
    screen,
    goto
  }
}

export default defineStore('setting__screen', useSettingsState)
