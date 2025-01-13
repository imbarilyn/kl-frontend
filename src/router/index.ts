import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const routes =  [
  {
    path: '/',
    redirect: '/auth',
    meta: {
      requiresAuth: false,
    }
  },
  {
    name: 'User',
    path: '/auth',
    component: ()=>import ('@/views/auth/UserPage.vue'),
    children: [
      {
        name: 'Login',
        path: '',
        component: ()=>import('@/views/auth/LoginPage.vue'),
        meta: {
          requiresAuth: false,
        }
      },
      {
        name: 'Forgot-Password',
        path: 'forgot-password',
        component: ()=>import('@/views/auth/ForgotPasswordPage.vue'),
        meta: {
          requiresAuth: false,
        }
      },
      {
        name: 'Reset-Password',
        path: 'reset-password',
        component: () => import('@/views/auth/ResetPassword.vue'),
        props: (route: any)=>{
          const { query } = route
          return {
            token: query.token

          }
        },
        meta: {
          requiresAuth: false,
        }
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
        meta: {
          requiresAuth: true,
          title: 'Update Contract Section'
        },
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
        name: 'expired-contracts',
        path: 'expired-contracts',
        component: ()=> import ('@/components/ExpiredContracts.vue'),
        meta: {
          requiresAuth: true,
          title: 'Expired Contracts Section'
        }
      },
      {
        name: 'email',
        path: 'view-email',
        component: ()=>import ('@/components/EmailAddress.vue'),
        meta: {
          requiresAuth: true,
          title: 'Email address Section'
        }
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) =>{
  const authStore = useAuthStore()
  const requireAuth =to.meta.requiresAuth as boolean
  if(!requireAuth){
    next()
  }
  else{
    if(!authStore.isUserLoggedIn){
      next({
        name: 'Login'
      })
    }
    else{
      next()
    }
  }
})
export default router
