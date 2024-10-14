import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useNotificationsStore } from '@/stores/notificationStore'

const BASE_URL = import.meta.env.BASE_URL as string


export const  useContractStore  = defineStore('contractStore', ()=>{
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
      const res = await fetch('http://localhost:8000/contracts/', {
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

    try {
      const res = await fetch('http://localhost:8000/add-contracts/', {
        method: 'POST',
        body: contract,
        mode: 'cors'
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
      const res = await fetch(`http://localhost:8000/contract/${contractId}`, {
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
      const response = await fetch(`http://localhost:8000/update-contract/${contractId}`, {
        method: 'PUT',
        mode: 'cors',
        body: contract
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
     const response = await fetch(`http://localhost:8000/delete-contract/${contractId}`, {
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
  }
})