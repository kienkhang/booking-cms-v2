import { User } from '@/dtos/user'

const accountStore = () => {
  const account = ref<User>()

  const setAccount = (acc: User) => {
    account.value = acc
  }

  return {
    account,
    setAccount
  }
}

export default defineStore('account_store', accountStore)
