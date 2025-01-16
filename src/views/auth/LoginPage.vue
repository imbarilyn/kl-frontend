<script setup lang="ts">
import { useField } from 'vee-validate'
import { computed, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter} from 'vue-router'
import { useNotificationsStore } from '@/stores'


const loginPayload = reactive({
  username: '',
  email: '',
  password: ''
})

const authStore = useAuthStore()
const notificationStore = useNotificationsStore()
const router = useRouter()
const emailValidator = (value: string) => {
  if (!value) {
    return 'Email is required'
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@klm\.com$/
  // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(value)) {
    return 'Email must be valid ending with @klm.com'
  }

  if (value.length > 50) {
    return 'Email must be less than 30 characters'
  }
  return true
}
const {
  value: email,
  errorMessage: emailErrorMessage,
  meta: emailMeta
} = useField('email', emailValidator)


watch(() => loginPayload.email, (value) => {
  email.value = value
})


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

watch(()=>loginPayload.password, (value)=>{
  password.value = value
})

const usernameValidator = (value: string) => {
  if (!value) {
    return "username is required"
  }
  return true
}
const {
  value: username,
  errorMessage: usernameErrorMessage,
  meta: usernameMeta
} = useField('username', usernameValidator)

watch(()=>loginPayload.username, (value)=>{
  username.value = value
})

const everyThingOkay = computed(()=> {
  return(
    usernameMeta.validated && usernameMeta.valid &&
    emailMeta.validated && emailMeta.valid &&
    passwordMeta.validated && passwordMeta.valid
  )
})

const isLoading = ref(false)
const loginHandler = ()=>{
  if(everyThingOkay.value){
    isLoading.value = true
    authStore.loginUser(loginPayload)
      .then(resp =>{
        if(resp.result == 'success'){
          router.push({
            name: 'DataTable'
          })
        }
        else {
          setTimeout(()=>{
            isLoading.value = false
            authStore.isAuthenticationError = {
              isError: true,
              message: 'Invalid credentials',
              type: 'error'
            }
          }, 1000)
        }
      })
      .catch((error)=>{
        setTimeout(()=>{
          isLoading.value = false
          authStore.isAuthenticationError = {
            isError: true,
            message: 'Something went wrong, please try again',
            type: 'error'
          }
        }, 1000)
      })
  }
  else{
    console.log('Incorrect details')
    notificationStore.addNotification('Please key in correct details', 'warning')
  }
}

const goForgotPassword = ()=>{
  router.push({
    name: 'Forgot-Password'
  })
}

onBeforeUnmount(()=>{
  authStore.closeBanner()
})

</script>


<template>
  <div class="h-full w-full grid grid-cols-12 bg-AF-500 md:bg-white">

    <div
      class="bg-AF-500  md:rounded-tr-2xl md:rounded-br-2xl  md:h-screen flex  items-center md:justify-center md:col-span-6 col-span-12">
      <div class="md:block hidden">
        <div class="text-white">
          <p class="!text-5xl font-semibold">Welcome Back</p>
          <span class="text-lg">Hello there, login to continue</span>
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
                    <label class="label font-semibold text-sm" for="email">Username </label>
                    <input
                      v-model="loginPayload.username"
                      id="username"
                      class="input input-primary input-bordered  border-1 border-AF-500 w-full text-sm"
                      placeholder="John Doe"
                      required
                      type="text"
                    />
                    <div v-if="usernameMeta.validated && !usernameMeta.valid">
                      <span class="text-rose-500 text-sm">{{usernameErrorMessage}}</span>
                    </div>
                  </div>
                  <div>
                    <label class="label font-semibold text-sm" for="email">Email address </label>
                    <input
                      v-model="loginPayload.email"
                      id="email"
                      class="input input-primary input-bordered  border-1 border-AF-500 w-full text-sm"
                      placeholder="Johndoe@klm.com"
                      required
                      type="email"
                    />
                    <div v-if="emailMeta.validated && !emailMeta.valid">
                      <span class="text-rose-500 text-sm">{{emailErrorMessage}}</span>
                    </div>
                  </div>
                  <div>
                    <div class="flex items-center justify-between">
                      <label class="label font-semibold text-sm" for="email">Password</label>
                      <router-link
                        class="text-sm text-AF-400 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        to="forgot-password">Forgot password?
                      </router-link>
                    </div>
                    <div>
                      <input
                        :class="[passwordMeta.validated && !passwordMeta.valid? 'input input-error input-bordered border-1 border-rose-400': '']"
                        v-model="loginPayload.password"
                        id="password"
                        class="input input-primary input-bordered border-1 border-AF-500 w-full text-sm"
                        required
                        type="password"
                      />
                      <div v-if="passwordMeta.validated && !passwordMeta.valid">
                        <span class="text-rose-500 text-sm">{{passwordErrorMessage}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="w-full">
                    <button class="btn w-full bg-AF-400 hover:bg-AF-700" type="submit">
                      <span class="text-white" v-if="!isLoading">Submit</span>
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
