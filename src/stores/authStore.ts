import { defineStore } from 'pinia'
import {useStorage} from '@vueuse/core'
import { computed} from 'vue'
import moment from 'moment'
import { jwtDecode, type JwtPayload } from 'jwt-decode'


interface LoginPayload {
  username: string
  email: string
  password: string
}

interface TokenPayload extends  JwtPayload{
  user_id: number
  email: string
}

interface User {
  username: string
  email: string
  user_id: number
}

const BASEURL = import.meta.env.VITE_BASE_URL
export  const useAuthStore = defineStore('useAuthStore', () =>{


  const token = useStorage('af-token', '')
  const tokenExpiry= useStorage('af-token-expiry', '')
  const userInfo = useStorage('af-user', '')
  // const isLoggedIn = ref<boolean>(false)

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
    const expiry = moment.unix(Number(tokenExpiry.value))
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
    const {sub, user_id, email, exp} = decode
    tokenExpiry.value = exp?.toString()
    setToken(token)
    setUserInfo({
      username: sub as string,
      email: email as string,
      user_id: user_id as number
    })
  }

//   login user
  async function loginUser (loginPayload:  LoginPayload){
    console.log(loginPayload)
    const formData = new FormData()
    formData.append('email', loginPayload.email)
    formData.append('username',  loginPayload.username)
    formData.append('password', loginPayload.password)
    try {
      const response = await fetch(`${BASEURL}/auth/token`, {
        method: 'POST',
        body: formData,
        mode: 'cors'
      }
      )
     const resp = await response.json()
      console.log(resp)
      decodeToken(resp.access_token)
      return {
        result: 'success'
      }
    }

    catch{
      return {
        result: 'fail'
      }
    }
  }

  const logout = () =>{
    token.value = null
    userInfo.value = null
  }

return{
    token,
  userInfo,
  isUserLoggedIn,
  loginUser,
  getUserInfo,
  logout
  }
})