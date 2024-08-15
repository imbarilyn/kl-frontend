import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: ()=>import ('@/views/DashboardPage.vue'),
      children: [
        {
          name: 'addContract',
          path: 'add-contract',
          component: ()=>import ('@/components/ContractForm.vue')
        }
      ]
    },

  ]
})

export default router
