const useUserModal = () => {
  const visible = ref(false)

  const open = () => (visible.value = true)
  const close = () => (visible.value = false)

  return {
    visible,
    open,
    close
  }
}

export default defineStore('user__userUserModal', useUserModal)
