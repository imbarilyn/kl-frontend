import { defineStore } from 'pinia'
import { ref } from 'vue'

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
      const res = await fetch('http://localhost:8000/add_contracts/', {
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



  return{
    isEmailDialogOpen,
    openAddEmailDialog,
    closeEmailDialog,
    isLogoutDialogOpen,
    openLogoutDialog,
    closeLogoutDialog,
    getContracts,
    addContract
  }
})