<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter} from 'vue-router'
import { useNotificationsStore } from '@/stores'
import { showAlert } from '@/alert'


const resetPayload = reactive({
  password: '',
  confirmPassword: ''
})

const authStore = useAuthStore()
const notificationStore = useNotificationsStore()
const router = useRouter()
const props = defineProps<{
  token: string
}>()


const passwordValidator = (value: string) =>{
  if(!value){
    return "password is required"
  }
  return true
}

const {
  value: password,
  errorMessage: passwordErrorMessage,
  meta: passwordMeta
} = useField('password', passwordValidator)

watch(()=>resetPayload.password, (value)=>{
  password.value = value
})

const confirmPasswordValidator = (value: string) =>{
  if(!value){
    return "password is required"
  }
  if(value !== password.value){
    return "password does not match"
  }
  return true
}

const {
  value: confirmPassword,
  errorMessage: confirmPasswordErrorMessage,
  meta: confirmPasswordMeta
} = useField('confirmPassword', confirmPasswordValidator)

watch(()=>resetPayload.confirmPassword, (value)=>{
  confirmPassword.value = value
})
const everyThingOkay = computed(()=> {
  return(
    passwordMeta.validated && passwordMeta.valid
    && confirmPasswordMeta.validated && confirmPasswordMeta.valid
  )
})

const isLoading = ref(false)
const loginHandler = ()=>{
  if(everyThingOkay.value){
    isLoading.value = true
    authStore.resetPassword({...resetPayload, token: props.token})
      .then(resp =>{
        console.log(resp)
        if(resp.result == 'success'){
          isLoading.value = false
          showAlert({
            message: 'Password reset successful, please login',
            type: 'success'
          })
          setTimeout(()=>{
            router.push({
              name: 'Login'
            })
          }, 2000)
        } else{

          setTimeout(()=>{
            isLoading.value = false
            showAlert({
              type: 'error',
              message: resp.message
            })

          }, 1000)
        }
      })
      .catch((error)=>{

        setTimeout(()=>{
          isLoading.value = false
          showAlert({
            type: 'error',
            message: 'An error occurred while trying to reset password, please try again'
          })
        }, 1000)
        // notificationStore.addNotification('Incorrect credential, please try again', 'error')
      })
  }
  else{
    console.log('Incorrect details')
    notificationStore.addNotification('Please key in correct details', 'warning')
  }
}

</script>


<template>
  <div class="h-full w-full grid grid-cols-12 bg-AF-500 md:bg-white">

    <div
      class="bg-AF-500  md:rounded-tr-2xl md:rounded-br-2xl  md:h-screen flex  items-center md:justify-center md:col-span-6 col-span-12">
      <div class="md:block hidden">
        <div class="text-white">
          <p class="!text-5xl font-semibold">Reset Password</p>
          <span class="text-lg">Hello there, set your new password</span>
        </div>
        <div class="lg:w-80 w-72">
          <img src="/images/contract.png" alt="contract-image">
        </div>
      </div>
      <div class="md:hidden flex py-6 justify-start text-white ps-4">
        <router-link to="/auth/forgot-password" class="material-icons-outlined cursor-pointer btn btn-sm btn-ghost btn-circle">chevron_left</router-link>
        <span class="text-sm ps-4">Login</span>
      </div>
    </div>
    <div
      class="md:col-span-6 col-span-12 bg-white rounded-tl-2xl rounded-tr-2xl md:h-screen flex justify-center md:items-center ">
      <div
        class="w-10/12 "
      >
        <div class="md:mt-5">
          <!-- Form -->
          <form class="md:my-4" @submit.prevent="loginHandler">
            <div class="grid md:gap-y-4">
              <div class="flex flex-col md:space-y-1">
                <div class="flex flex-col space-y-5">
                  <div class="flex  flex-col justify-start pt-8 md:hidden">
                    <p class="!text-2xl font-semibold text-AF-500">Welcome Back</p>
                    <span class="text-sm">Hello there, login to continue</span>
                  </div>

                  <div class="md:hidden mx-auto block">
                    <div class="lg:w-80 w-72">
                      <img src="/images/contract.png" alt="contract-image">
                    </div>
                  </div>
                  <div class="flex justify-center items-center">
                    <span class="material-icons !text-4xl pt-3 text-AF-500 pe-3">flight_takeoff</span>
                    <img src="/images/klm-logo.png" alt="klm-logo" class="w-20">
                  </div>
                  <div>
                    <div class="flex items-center justify-between">
                      <label class="label font-semibold text-sm" for="email">New password</label>
                    </div>
                    <div>
                      <input
                        :class="[passwordMeta.validated && !passwordMeta.valid? 'input input-error input-bordered border-1 border-rose-400': '']"
                        v-model="resetPayload.password"
                        id="password"
                        class="input input-primary input-bordered border-1 border-AF-500 w-full text-sm"
                        required
                        type="password"
                      />
                      <div v-if="passwordMeta.validated && !passwordMeta.valid">
                        <span class="text-rose-500 text-sm">{{passwordErrorMessage}}</span>
                      </div>
                    </div>
                    <div>
                    <div class="flex items-center justify-between">
                      <label class="label font-semibold text-sm" for="email">Confirm password</label>
                    </div>
                      <div>
                        <input
                          :class="[confirmPasswordMeta.validated && !confirmPasswordMeta.valid? 'input input-error input-bordered border-1 border-rose-400': '']"
                          v-model="resetPayload.confirmPassword"
                          id="confirmPassword"
                          class="input input-primary input-bordered border-1 border-AF-500 w-full text-sm"
                          required
                          type="password"
                        />
                        <div v-if="confirmPasswordMeta.validated && !confirmPasswordMeta.valid">
                          <span class="text-rose-500 text-sm">{{confirmPasswordErrorMessage}}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div class="w-full">
                    <button class="btn w-full bg-AF-400 hover:bg-AF-300" type="submit">
                      <span class="text-white" v-if="!isLoading">Reset password</span>
                      <span class="loading loading-spinner loading-md text-white" v-else></span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </form>
          <!-- End Form -->

        </div>
      </div>
    </div>


  </div>
</template>
