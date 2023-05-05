interface User {
  id: string
  avatar: string
  email: string
  first_name: string
  last_name: string
  full_name: string
  phone: string
  gender: boolean
  role: number
  status: number
  user_key_firebase: string
  created_at: string
  updated_at: string
  password?: string
}

type AddUser = Pick<User, 'first_name' | 'last_name' | 'email' | 'role' | 'password'>
type UpdateUser = Pick<User, 'first_name' | 'last_name' | 'status' | 'password'>

export { User, AddUser, UpdateUser }
