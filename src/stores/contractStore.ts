import { defineStore } from 'pinia'
import { ref } from 'vue'

export const  useContractStore  = defineStore('contractStore', ()=>{
  const  isEmailDialogOpen = ref({
    isOpen:false
  })

  const isLogoutDialogOpen = ref({
    isOpen:false
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



  return{
    isEmailDialogOpen,
    openAddEmailDialog,
    closeEmailDialog,
    isLogoutDialogOpen,
    openLogoutDialog,
    closeLogoutDialog

  }
})