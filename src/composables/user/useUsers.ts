import { usersApi } from '@/apis/users'
import type { IAddUser, IUpdateUser } from '@/dtos/user'
import { useUsersStore } from '@/stores'

const useUsers = () => {
  // log message
  const message = useMessage()
  // Get from store
  const { paging, users } = storeToRefs(useUsersStore())
  const { getUsers } = useUsersStore()

  // Every paging change -> getUsers
  watch(paging, () => {
    getUsers()
  })

  // handle create user
  const createUser = (form: Ref<IAddUser>) => {
    // call api
    const usedCreateUser = usersApi.createAccount(form.value)
    // destructuring useAxios struct
    const { execute, isFinished, error } = usedCreateUser

    // after finished && not error -> Get user
    until(isFinished)
      .toBeTruthy()
      .then(() => {
        !error.value && getUsers() && message.success('Tạo người dùng thành công')
      })

    // return with custom useAxios struct
    return {
      ...usedCreateUser,
      executeApi: () => execute({ data: { ...form.value } })
    }
  }
  // handle create user
  const updateUser = (form: Ref<IUpdateUser>) => {
    // call api
    const usedUpdateUser = usersApi.updateAccount(form.value)
    // destructuring useAxios struct
    const { execute, isFinished, error } = usedUpdateUser
    // after finished && not error -> Get user
    until(isFinished)
      .toBeTruthy()
      .then(() => {
        !error.value && getUsers() && message.success('Cập nhật người dùng thành công')
      })
    // return with custom useAxios struct
    return {
      ...usedUpdateUser,
      executeApi: () => execute({ data: { ...form.value } })
    }
  }

  return {
    users,
    paging,
    createUser,
    updateUser,
    getUsers
  }
}

export default useUsers
