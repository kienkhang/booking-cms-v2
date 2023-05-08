interface IUser {
  id: string
  avatar: string
  email: string
  first_name: string
  last_name: string
  full_name: string
  phone: string
  gender: boolean
  role: string
  status: number
  user_key_firebase: string
  created_at: string
  updated_at: string
  password?: string
}

type IAddUser = Pick<IUser, 'first_name' | 'last_name' | 'email' | 'role' | 'password'>
type IUpdateUser = Pick<IUser, 'first_name' | 'last_name' | 'status' | 'password' | 'id'>

export { IUser, IAddUser, IUpdateUser }
