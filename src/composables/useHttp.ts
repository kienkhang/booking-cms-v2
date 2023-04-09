import { useAxios } from '@vueuse/integrations/useAxios'
import { useAuthStorage } from './useAuthStorage'
import instance from '@/apis/instance'

const { getToken } = useAuthStorage()

const useGet = ({ url = '', data = {}, params = {}, headers = {}, requiredToken = false }) => {
  const fullHeaders = { ...headers }

  requiredToken && (fullHeaders['Authorization'] = `Bearer ${getToken()}`)

  const usedGet = useAxios(url, { data, params, headers: fullHeaders, method: 'GET' }, instance, {
    immediate: false
  })
  return usedGet
}
const usePost = ({ url = '', data = {}, params = {}, headers = {}, requiredToken = false }) => {
  const fullHeaders = { ...headers }

  requiredToken && (fullHeaders['Authorization'] = `Bearer ${getToken()}`)

  const usedPost = useAxios(url, { data, params, headers: fullHeaders, method: 'POST' }, instance, {
    immediate: false
  })
  return usedPost
}
const useDelete = ({ url = '', data = {}, params = {}, headers = {}, requiredToken = false }) => {
  const fullHeaders = { ...headers }

  requiredToken && (fullHeaders['Authorization'] = `Bearer ${getToken()}`)

  const usedDelete = useAxios(
    url,
    { data, params, headers: fullHeaders, method: 'DELETE' },
    instance,
    {
      immediate: false
    }
  )
  return usedDelete
}
const usePut = ({ url = '', data = {}, params = {}, headers = {}, requiredToken = false }) => {
  const fullHeaders = { ...headers }

  requiredToken && (fullHeaders['Authorization'] = `Bearer ${getToken()}`)

  const usedPut = useAxios(url, { data, params, headers: fullHeaders, method: 'PUT' }, instance, {
    immediate: false
  })
  return usedPut
}
const usePatch = ({ url = '', data = {}, params = {}, headers = {}, requiredToken = false }) => {
  const fullHeaders = { ...headers }

  requiredToken && (fullHeaders['Authorization'] = `Bearer ${getToken()}`)

  const usedPatch = useAxios(
    url,
    { data, params, headers: fullHeaders, method: 'PATCH' },
    instance,
    {
      immediate: false
    }
  )
  return usedPatch
}
export { useGet, usePost, useDelete, usePut, usePatch }
