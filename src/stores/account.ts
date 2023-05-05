import type { IUser } from '@/dtos/user'

const accountStore = () => {
  const account = ref<IUser>()

  const role = computed(() => {
    if (+account.value.role === 1) return 'CUSTOMER'
    else if (+account.value.role === 2) return 'HOTELIER'
    else if (+account.value.role === 3) return 'ACCOUNTANT'
    else if (+account.value.role === 4) return 'STAFF'
    else if (+account.value.role === 5) return 'MANAGER'
    else if (+account.value.role === 51) return 'ADMIN'
    else if (+account.value.role === 66) return 'SUPPERADMIN'
  })

  const setAccount = (acc: IUser) => {
    account.value = acc
  }

  return {
    account,
    role,
    setAccount
  }
}

export default defineStore('account_store', accountStore)
