const useActionRoom = () => {
  const visibleActions = ref(false)
  const closeActions = () => (visibleActions.value = false)
  const openActions = () => (visibleActions.value = true)

  const activeRoom = (id: string) => {
    console.log('🐔🦢 ~ activeRoom ~ id:', id)
    // handle activeRoom
  }
  const deActiveRoom = (id: string) => {
    console.log('🐔🦢 ~ deActiveRoom ~ id:', id)

    //
  }
  const deleteRoom = (id: string) => {
    console.log('🐔🦢 ~ deleteRoom ~ id:', id)
  }
  return {
    visibleActions,
    activeRoom,
    deActiveRoom,
    deleteRoom,
    openActions,
    closeActions
  }
}
export default useActionRoom
