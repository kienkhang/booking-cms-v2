const path = 'users/'
class User {
  details = () => {
    const url = path + 'details'
    return useGet({ url, requiredToken: true })
  }
}

const usersApi = new User()

export { usersApi }
