import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useNotificationsStore } from '@/stores/notificationStore'

const BASE_URL = import.meta.env.VITE_BASE_URL as string

export interface EmailAddressPayload {
  id: string
  email: string
}

export const useContractStore = defineStore('contractStore', () => {
  const appIsFetching = ref<boolean>(false)
  const isEmailMax = ref<boolean>(false)
  const isEmailDialogOpen = ref({
    isOpen: false
  })
  const isEmailsMoreThanTwo = ref({
    message: '',
    show: false
  })

  const isLogoutDialogOpen = ref({
    isOpen: false
  })

  const isDeleteDialogOpen = ref({
    isOpen: false
  })


  const openAddEmailDialog
    = () => {
    isEmailDialogOpen.value.isOpen = true
  }

  const closeEmailDialog = () => {
    isEmailDialogOpen.value.isOpen = false
  }

  const openLogoutDialog = () => {
    isLogoutDialogOpen.value.isOpen = true
  }

  const closeLogoutDialog = () => {
    isLogoutDialogOpen.value.isOpen = false
  }

  const openDeleteDialog = () => {
    isDeleteDialogOpen.value.isOpen = true
  }
  const closeDeleteDialog = () => {
    isDeleteDialogOpen.value.isOpen = false
  }
  const getEmailMoreThanTwo = computed(()=>isEmailsMoreThanTwo.value)

  const setEmailMoreThanTwo = (message: string, show: boolean) => {
    isEmailsMoreThanTwo.value = {
      message: message,
      show: show
    }
  }

  async function getContracts() {
    try {
      const res = await fetch(`${BASE_URL}/contracts/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      })
      const response = await res.json()
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  async function addContract(contract: any) {
    console.log(contract)
    try {
      const res = await fetch(`${BASE_URL}/contracts/add-contracts`, {
        method: 'POST',
        body: contract,
        mode: 'cors'
      })
      const response = await res.json()
      console.log(response)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  async function getContract(contractId: string) {
    try {
      const res = await fetch(`${BASE_URL}/contracts/contract/${contractId}`, {
        method: 'GET',
        mode: 'cors'
      })
      if(!res.ok) {
        return {
          result: 'fail',
          message: 'Unable to get contract, kindly try again'
        }
      }
      else{
          const response = await res.json()
          console.log(response)
          return response
      }

    } catch (error) {
      console.log('here at get contract', error)
    }

  }

  async function updateContract(contractId: string, contract: any) {
    const notificationStore = useNotificationsStore()
    console.log('Contract-id', contractId)
    console.log('I am here')
    try {
      const response = await fetch(`${BASE_URL}/contracts/update-contract/${contractId}`, {
        method: 'PUT',
        mode: 'cors',
        body: contract
      })
      const res = await response.json()
      console.log(res)
      return res
    } catch (error) {
      notificationStore.addNotification('Unable to update contract please try again', 'error')
    }
  }

  async function deleteContract(contractId: string) {
    // const notificationStore = useNotificationsStore()
    try {
      const response = await fetch(`${BASE_URL}/contracts/delete-contract/${contractId}`, {
        method: 'DELETE',
        mode: 'cors'
      })
      if(!response.ok) {
        return {
          result: 'fail',
          message: 'Unable to delete contract, kindly try again'
        }
      }
      return await response.json()
    } catch (error) {
      console.log(error)
      return
    }
  }

  async function addEmail(email: string) {
    console.log(email)
    const formData = new FormData()
    formData.append('email', email)
    try {
      const response = await fetch(`${BASE_URL}/email/add-emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          mode: 'cors',
        },
        body: JSON.stringify({ email: email })
      })
      if(!response.ok){
        return {
          result: 'fail',
          message: 'Unable to add email, please try again'
        }
      }
      const resp = await response.json()
      console.log(resp)
      return resp
    } catch (error) {
      console.log(error)
    }
  }

  async function getEmailAddresses() {
    try {
      const response = await fetch(`${BASE_URL}/email/get-emails`)
      if(!response.ok){
        return {
          result: 'fail',
          data: []
        }
      }
      const resp = await response.json()
      console.log(resp)

      return {
        result: resp.result,
        data: resp.emails
      }

    } catch (error) {
      console.log(error)
    }
  }

  async function editEmail(emailPayload: EmailAddressPayload) {
    console.log('Email address to be edited', emailPayload)
    try {
      const response = await fetch(`${BASE_URL}/email/update-email/${emailPayload.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
          email: emailPayload.email,
        })
      })
      if(!response.ok){
        return {
          result: 'fail',
          message: 'Unable to update your email, please try again'
        }
      }
      // console.log(response)
      const resp = await response.json()
      return {
        result: resp.result,
        message: resp.message
      }
    } catch (e) {
      return {
        result: 'fail',
        message: 'Unable to update your email, please try again'
      }
    }
  }


  async function deleteEmail(emailPayload: EmailAddressPayload) {
    console.log('Email address to be deleted', emailPayload)
    const notification = useNotificationsStore()
    try {
      const response = await fetch(`${BASE_URL}/email/delete-email/${emailPayload.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      })
      if(!response.ok){
        return {
          result: 'fail',
          message: 'Unable to delete email, please try again'
        }
      }
      const resp = await response.json()
      return {
        result: resp.result,
        message: resp.message
      }
    } catch (e) {
      // notification.addNotification('Unable to delete email', 'error')
      return {
        result: 'fail',
        message: 'An error occurred while trying to delete email'
      }
    }
  }

  async function getExpiredContracts() {
    try {
      const response = await fetch(`${BASE_URL}/contracts/expired-contracts`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log()
      if (!response.ok) {
        return {
          result: 'fail',
          data: [],
          total:0
        }
      } else {
        const resp = await response.json()
        return {
          result: 'success',
          data: resp.data,
          total: resp.total
        }
      }
    } catch (e) {
      return {
        result: 'fail',
        data: [],
        total: 0
      }
    }
  }


  return {
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
    appIsFetching,
    deleteEmail,
    getExpiredContracts,
    getEmailMoreThanTwo,
    setEmailMoreThanTwo,
    isEmailMax
  }
})