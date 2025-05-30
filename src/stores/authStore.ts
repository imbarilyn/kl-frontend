import { defineStore } from 'pinia'
import {resolveUnref, useStorage} from '@vueuse/core'
import { computed, ref } from 'vue'
import moment from 'moment'
import { jwtDecode, type JwtPayload } from 'jwt-decode'


interface LoginPayload {
  email: string
  password: string
}

interface TokenPayload extends  JwtPayload{
  user_id: number
  email: string
  username: string
}

interface User {
  username: string
  email: string
  user_id: number
}

interface ResetPasswordPayload {
  resetToken: string
  password: string
  confirmPassword: string
}

interface AuthenticationError {
  isError: boolean
  message: string
  type:  'error' | 'warning' | 'info' | 'success'
}

const BASEURL = import.meta.env.VITE_BASE_URL
export  const useAuthStore = defineStore('useAuthStore', () =>{


  const token = useStorage('af-token', '')
  const tokenExpiry= useStorage('af-token-expiry', '')
  const userInfo = useStorage('af-user', '')
  // const isLoggedIn = ref<boolean>(false)
  const isAuthenticationError = ref<AuthenticationError>({
    isError: false,
    message: '',
    type: 'success'
  })

  const getUserInfo = () => {
    try{
      return JSON.parse(userInfo.value) as User
    }
    catch {
      return null
    }
  }

  const isUserLoggedIn = computed(()=>{
    const now = moment().utc()
    const expiry = moment.unix(Number(tokenExpiry.value)).utc()
    const isValid = token.value && moment(now).isBefore(expiry)
    if(!isValid){
      logout()
    }
    return isValid
  }
  )
  const setUserInfo = (user: User) =>{
    userInfo.value = JSON.stringify({
      ...user
    })
  }

  const setToken = (tokenData: string) => {
    token.value = tokenData
  }

  const decodeToken = (token: string) =>{
    const decode = jwtDecode<TokenPayload>(token)
    const {sub, user_id, username, exp} = decode
    tokenExpiry.value = exp?.toString()
    setToken(token)
    setUserInfo({
      username: username as string,
      email: sub as string,
      user_id: user_id as number
    })
  }

//   login user
  async function loginUser (loginPayload:  LoginPayload){
    console.log(loginPayload)
    const formData = new FormData()
    formData.append('email', loginPayload.email)
    formData.append('password', loginPayload.password)
    try {
      const response = await fetch(`${BASEURL}/auth/token`, {
        method: 'POST',
        body: formData,
        mode: 'cors'
      }
      )
      console.log('try block')
      if(!response.ok){
        return {
          result: 'fail',
        }
      }
      else{
        const resp = await response.json()
        decodeToken(resp.access_token)
        return {
          result: 'success'
        }
      }
    }
    catch(e) {
      // return
    }
  }

  async  function resetPassword(resetPasswordPayload: ResetPasswordPayload) {
    console.log(resetPasswordPayload)
    const formData = new FormData()
    formData.append('reset_token', resetPasswordPayload.resetToken)
    formData.append('new_password', resetPasswordPayload.password)
    formData.append('confirm_password', resetPasswordPayload.confirmPassword)
    try {
      const response = await fetch(`${BASEURL}/auth/reset-password`, {
        method: 'POST',
        mode: 'cors',
        body: formData
      })
      console.log('try block')
      if (!response.ok) {
        console.log('response not okay')
        return {
          result: 'fail',
          message: 'Something went wrong, please try again'
        }
      } else {
        console.log('response okay')
        const res = await response.json()
        console.log(res)
        return {
          result: res.result,
          message: res.message
        }
      }
    } catch (e) {
      console.log('catch block')
      return {
        result: 'fail',
        message: 'Something went wrong, please try again'
      }
    }
  }

  async function forgotPassword(email: string) {
    console.log(email)
    const formData = new FormData()
    formData.append('email', email)
    try {
      const response = await fetch(`${BASEURL}/auth/forgot-password`, {
        method: 'POST',
        body: formData,
        mode: 'cors'
      })
      if (!response.ok) {
        return {
          result: 'fail',
          message: 'An error occurred while trying to reset password, please try again'
        }
      } else {
        const resp = await response.json()
        return {
          result: resp.result,
          message: resp.message
        }
      }
    }
    catch(e){
      return{
        result: 'fail',
        message: 'An error occurred while trying to reset password, please try again'
      }
    }
  }

  const logout = () =>{
    token.value = null
    userInfo.value = null
  }

  const closeBanner = () => {
    isAuthenticationError.value = {
      isError: false,
      message: '',
      type: 'success'
    }
  }

return{
    token,
  userInfo,
  isUserLoggedIn,
  loginUser,
  getUserInfo,
  logout,
  resetPassword,
  forgotPassword,
  isAuthenticationError,
  closeBanner
}
})