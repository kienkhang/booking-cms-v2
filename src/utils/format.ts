const VND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND'
})

const Image2Array = (text: string) => {
  if (!text) return []
  const imgs = text.split(';')
  return imgs
}

export { VND, Image2Array }
