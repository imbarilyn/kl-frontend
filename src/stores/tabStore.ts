import { defineStore } from 'pinia'

export const useTabStore = defineStore({
  id: 'TabStore',
  state: ()=>({
    tabs: [
      'contracts',
      'expired-contracts',
      'emails'
    ] as string[],
    activeTab: localStorage.getItem('activeTab') || 'contracts' as string
  }),
   getters: {
    getActiveTab: (state)=>state.activeTab,
    getTabs: (state)=>state.tabs
   },

   actions: {
    setActiveTab(tab: string){
      if(this.tabs.includes(tab)){
        // this.activeTab = tab
        localStorage.setItem('activeTab', tab)
      } else{
        console.log(`${tab} not found`)
      }
    }
   }
})