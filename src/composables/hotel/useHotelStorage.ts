function useHotelStorage() {
  const hotelId = useStorage('hotel-id', null)

  return { hotelId }
}
export default useHotelStorage
