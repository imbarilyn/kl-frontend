import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useNotificationsStore } from '@/stores/notificationStore'

const BASE_URL = import.meta.env.VITE_BASE_URL as string

export interface EmailAddressPayload {
  id: number
  email: string
}
export const  useContractStore  = defineStore('contractStore', ()=>{
  const appIsFetching = ref<boolean>(false)
  const  isEmailDialogOpen = ref({
    isOpen:false
  })

  const isLogoutDialogOpen = ref({
    isOpen:false
  })

  const isDeleteDialogOpen = ref({
    isOpen: false
  })


  const openAddEmailDialog
    = ()=>{
    isEmailDialogOpen.value.isOpen = true
  }

  const closeEmailDialog =()=>{
    isEmailDialogOpen.value.isOpen = false
  }

  const openLogoutDialog = ()=>{
    isLogoutDialogOpen.value.isOpen = true
  }

  const closeLogoutDialog = ()=>{
    isLogoutDialogOpen.value.isOpen = false
  }

  const openDeleteDialog = ()=>{
    isDeleteDialogOpen.value.isOpen = true
  }
  const closeDeleteDialog = ()=>{
    isDeleteDialogOpen.value.isOpen = false
  }

 async function getContracts (){
    try{
      const res = await fetch(`${BASE_URL}/contracts/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      })
      const response = await res.json()
      console.log(response)
      return response
    }
    catch (error){
      console.log(error)
    }
 }

 async function addContract(contract: any){
    console.log(contract)
    try {
      const res = await fetch(`${BASE_URL}/add-contracts/`, {
        method: 'POST',
        body: contract,
        mode: 'cors',
      })
      const response = await res.json()
      console.log(response)
      return response
    }
    catch (error){
      console.log(error)
    }
 }

 async function getContract(contractId: Number ){
    try{
      const res = await fetch(`${BASE_URL}/contract/${contractId}`, {
        method: 'GET',
        mode: 'cors'
      })
      const response = await res.json()
      console.log(response)
      return response
    }
    catch(error){
      console.log('here at get contract', error)
    }

  }

 async function updateContract(contractId: Number, contract: any){
    try{
      const response = await fetch(`${BASE_URL}/update-contract/${contractId}`, {
        method: 'PUT',
        mode: 'cors',
        body: contract,
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const res = await response.json()
      console.log(res)
      return res
    }
    catch(error){
      console.log('here at update', error)
    }
 }

 async function deleteContract(contractId: Number) {
    const notificationStore = useNotificationsStore()
   try {
     const response = await fetch(`${BASE_URL}/delete-contract/${contractId}`, {
       method: 'DELETE',
       mode: 'cors'
     })
     const res = await response.json()
     console.log(res)
     return res
   } catch (error) {
     notificationStore.addNotification('Unable to delete contract', 'error')
     console.log('here at delete', error)
   }
 }

 async function addEmail(email: string){
    console.log(email)
    try{
      const response = await fetch(`${BASE_URL}/add-emails`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({email})
      })
      const resp = await response.json()
      console.log(resp)
      return resp
    }
    catch(error){
      console.log(error)
    }
 }

 async function getEmailAddresses (){
    try{
      const response  = await fetch(`${BASE_URL}/emails`)
      const resp =  await response.json()
      return {
        result: resp.result,
        data: resp.emails
      }

    }
    catch(error) {
      console.log(error)
    }
 }

async function editEmail(emailPayload: EmailAddressPayload){
    console.log('Email address to be edited', emailPayload)
    try {
      const response = await fetch(`http://localhost:8000/update-email/${emailPayload.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
          email: emailPayload.email,
          id: emailPayload.id
        })
      })

      // console.log(response)
      const resp = await response.json()
      return {
        result: resp.result,
        message: resp.message
      }
    }
    catch (e) {
      return {
        result: 'fail',
        message: 'An error occurred while trying to edit email'
      }
    }
}


async function deleteEmail(email: string) {
  console.log('Email address to be deleted', email)
  const notification = useNotificationsStore()
  try {
    const response = await fetch(`${BASE_URL}/delete-email/${email}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({ email })
    })
    const resp = await response.json()
    return {
      result: resp.result,
      message: resp.message
    }
  } catch (e) {
    notification.addNotification('Unable to delete email', 'error')
    return {
      result: 'fail',
      message: 'An error occurred while trying to delete email'
    }
  }
}

  return{
    isEmailDialogOpen,
    openAddEmailDialog,
    closeEmailDialog,
    isLogoutDialogOpen,
    openLogoutDialog,
    closeLogoutDialog,
    getContracts,
    addContract,
    updateContract,
    getContract,
    deleteContract,
    isDeleteDialogOpen,
    closeDeleteDialog,
    openDeleteDialog,
    addEmail,
    getEmailAddresses,
    editEmail,
    appIsFetching
  }
})