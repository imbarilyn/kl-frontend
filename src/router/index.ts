import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      name: 'Home',
      path: '/dashboard',
      component: ()=>import ('@/views/DashboardPage.vue'),
      children: [
        {
          name: 'DataTable',
          path: '',
          component: ()=>import ('@/components/DataTables.vue')
        },
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
