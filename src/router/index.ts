import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/auth'
    },
    {
      name: 'User',
      path: '/auth',
      component: ()=>import ('@/views/auth/UserPage.vue'),
      children: [
        {
          name: 'Login',
          path: '',
          component: ()=>import('@/views/auth/LoginPage.vue')
        },
        {
          name: 'Forgot-Password',
          path: 'forgot-password',
          component: ()=>import('@/views/auth/ForgotPasswordPage.vue')
        }
      ]
    },
    {
      name: 'Home',
      path: '/dashboard',
      component: ()=>import ('@/views/DashboardPage.vue'),
      children: [
        {
          name: 'DataTable',
          path: '',
          component: ()=>import ('@/components/DataTables.vue'),
          meta: {
            requiresAuth: true,
            title: 'Contract Section'
          }
        },
        {
          name: 'EditContract',
          path: 'edit-contract/:id',
          component: ()=>import('@/components/EditContract.vue'),
          props: (route: any)=>{
            return{
              id: route.params.id
            }
          }
        },
        {
          name: 'addContract',
          path: 'add-contract',
          component: ()=>import ('@/components/ContractForm.vue'),
          meta: {
            requiresAuth: true,
            title: 'Create Contract Section'
          }
        },
        {
          name: 'email',
          path: 'view-email',
          component: ()=>import ('@/components/EmailAddress.vue'),
          meta: {
            requiresAuth: true,
            title: 'Create Contract Section'
          }
        }
      ]
    },

  ]
})

export default router
