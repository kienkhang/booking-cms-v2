import type { IUser } from '@/dtos/user'

const accountStore = () => {
  const account = ref<IUser>()

  const role = computed(() => {
    if (!account.value) return 'CUSTOMER'
    if (+account.value.role === 1) return 'CUSTOMER'
    else if (+account.value.role === 2) return 'HOTELIER'
    else if (+account.value.role === 3) return 'ACCOUNTANT'
    else if (+account.value.role === 4) return 'STAFF'
    else if (+account.value.role === 5) return 'MANAGER'
    else if (+account.value.role === 51) return 'ADMIN'
    else if (+account.value.role === 66) return 'SUPERADMIN'
  })

  const isHotelier = computed(() => role.value === 'HOTELIER')
  const isAdmin = computed(() => ['ADMIN', 'SUPERADMIN'].includes(role.value))
  const isAccountant = computed(() => role.value === 'ACCOUNTANT')
  const isStaff = computed(() => role.value === 'STAFF')
  const isManager = computed(() => role.value === 'MANAGER')

  const setAccount = (acc: IUser | undefined) => {
    account.value = acc
  }

  return {
    account,
    role,
    isHotelier,
    isAdmin,
    isAccountant,
    isStaff,
    isManager,
    setAccount
  }
}

export default defineStore('account_store', accountStore)
