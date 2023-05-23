import { usersApi } from '@/apis/users'
import { IUser } from '@/dtos/user'

const useUsersStore = () => {
  const users = ref<IUser[]>([])
  const paging = ref<{
    offset?: number
    page?: number
    [filter: string]: any
  }>()

  const getUsers = async () => {
    const usedGetAccount = usersApi.getAccounts(paging.value)
    const { data, error } = usedGetAccount

    await usedGetAccount.execute()

    if (!error.value) {
      users.value = data.value.data
    }
    return usedGetAccount
  }

  return {
    users,
    paging,
    getUsers
  }
}

export default defineStore('users_store', useUsersStore)
