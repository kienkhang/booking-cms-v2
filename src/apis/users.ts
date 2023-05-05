const path = 'users/'
const admin = 'admin/'
class User {
  details = () => {
    const url = path + 'details'
    return useGet({ url, requiredToken: true })
  }
  createAccount = (data: any | {}) => {
    const url = admin + 'create-account'
    return usePost({ url, data, requiredToken: true })
  }
  updateAccount = (data: any | {}) => {
    const url = admin + 'update-account'
    return usePatch({ url, data, requiredToken: true })
  }
  getAccounts = (params: any | {}) => {
    const url = admin + 'accounts'
    return useGet({ url, params, requiredToken: true })
  }
  addWork = (data: any | {}) => {
    const url = admin + 'works'
    return usePost({ url, data, requiredToken: true })
  }
  deleteWork = (data: any | {}) => {
    const url = admin + 'works'
    return useDelete({ url, data, requiredToken: true })
  }
  getWorks = (params: any | {}, userId: string) => {
    const url = admin + `works/${userId}`
    return useGet({ url, params, requiredToken: true })
  }
}

const usersApi = new User()

export { usersApi }
