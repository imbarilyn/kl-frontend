<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useField } from 'vee-validate'
import { useNotificationsStore } from '@/stores'
import { useAuthStore } from '@/stores/authStore'
import { showAlert } from '@/alert'
import DialogModal from '@/components/DialogModal.vue'
import { useRouter } from 'vue-router'


const notificationStore = useNotificationsStore()
const router = useRouter()
const authStore = useAuthStore()
const emailAddress = ref('')

const emailValidator = (value: string) => {
  if (!value) {
    return 'Email is required'
  }
  return true
}

const {
  value: email,
  errorMessage: emailErrorMessage,
  meta: emailMeta
} = useField('email', emailValidator)

watch(()=> emailAddress.value, (value) => {
  email.value = value
})

const isLoading = ref(false)
const openModal = ref(false)
const isEverythingOkay = computed(() => emailMeta.validated && emailMeta.valid)
const handleForgotPassword = () => {
  closeModal()
    isLoading.value = true
    authStore.forgotPassword(emailAddress.value)
      .then((response)=>{
        if(response.result === 'success') {
          setTimeout(()=>{
            isLoading.value = false
            showAlert({
              type: 'success',
              message: response.message
            })
          }, 1000)
        } else{
          setTimeout(()=>{
            isLoading.value = false
            showAlert({
              type: 'error',
              message: response.message
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
      })
      // .finally(()=>{
      //   setTimeout(()=>{
      //     isLoading.value = false
      //   }, 1000)
      // })

}
 const confirmForgotPassword = ()=>{
   if(!isEverythingOkay.value) {
     notificationStore.addNotification('email address should be valid', 'error')
   } else {
     openModal.value = true
   }
 }

 const closeModal = ()=>{
    openModal.value = false
 }

const goLogin = ()=>{
  router.push({
    name: 'Login'
  })
}

</script>




<template>
  <div class="h-full w-full grid grid-cols-12 bg-AF-500 md:bg-white">

    <div
      class="bg-AF-500  md:rounded-tr-2xl md:rounded-br-2xl  md:h-screen flex  items-center md:justify-center md:col-span-6 col-span-12">
      <div class="md:block hidden">
        <div class="text-white">
          <p class="!text-5xl font-semibold ">Forgot password?</p>
          <span class="text-lg">Hello there, please add your email address</span>
        </div>
        <div class="lg:w-80 w-72">
          <img src="/images/contract.png" alt="contract-image">
        </div>
      </div>
      <div class="md:hidden flex items-center py-6 justify-start text-white ps-4">
        <div class="flex items-center justify-center btn btn-sm btn-ghost btn-circle" @click="goLogin">
          <span class="material-icons-outlined cursor-pointer">chevron_left</span>
        </div>
        <div>
          <span class="text-sm ps-4">Login</span>
        </div>
      </div>
    </div>
    <div
      class="md:col-span-6 col-span-12 bg-white rounded-tl-2xl rounded-tr-2xl md:h-screen flex justify-center md:items-center ">
      <div
        class="w-10/12 "
      >
        <div class="md:mt-5">
          <!-- Form -->
          <form class="md:my-4" @submit.prevent="confirmForgotPassword">
            <div class="grid md:gap-y-4">
              <div class="flex flex-col md:space-y-1">
                <div class="flex flex-col space-y-5">
                  <div class="flex  flex-col justify-start pt-8 md:hidden">
                    <p class="!text-2xl font-semibold text-AF-500">Forgot your Password?</p>
                    <span class="text-sm pb-2">Enter your email address to proceed</span>
                    <span class="text-sm">Remember your password? <router-link to="/auth" class="text-AF-500">Login</router-link></span>
                  </div>

                  <div class="md:hidden mx-auto block">
                    <div class="lg:w-80 w-72">
                      <img src="/images/contract.png" alt="contract-image">
                    </div>
                  </div>
                  <div class="flex justify-center items-center">
                    <img src="/images/klm-logo.png" alt="klm-logo" class="w-20">
                  </div>
                  <div>
                    <label class="label font-semibold text-sm" for="email">Email address </label>
                    <input
                      v-model="emailAddress"
                      :class="[emailMeta.validated && !emailMeta.valid? 'input input-error input-bordered border-1 border-rose-400': '']"
                      id="email"
                      class="input input-primary input-bordered  border-1 border-AF-500 w-full text-sm"
                      placeholder="John Doe"
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
                        to="/auth">Login?
                      </router-link>
                    </div>
                  </div>
                  <div class="w-full">
                    <button class="btn w-full bg-AF-400 hover:bg-AF-300" type="submit">
                      <span class="text-white">Submit</span>
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
    <Teleport to="body">
      <dialogModal :is-open="openModal" @close-modal="closeModal">
        <template #title>
          <div class="flex justify-center">
            <div class="bg-AF-100 btn-circle flex justify-center items-center">
              <span class="material-icons-outlined text-AF-500 -rotate-45">key</span>
            </div>
          </div>
        </template>
        <template #body>
          <div class="flex justify-center flex-col">
            <p class="text-center pb-2">Please confirm to reset password</p>
            <span class="text-sm">No worries you shall receive an email with instructions</span>
          </div>

        </template>
        <template #footer>
          <div class="flex justify-center">
            <div class="flex gap-5">
              <button class="btn btn-sm bg-AF-400 px-4" @click="handleForgotPassword">
                <span v-if="!isLoading">Ok</span>
                <span v-else class="loading loading-spinner loading-sm text-white"></span>
              </button>
              <button class="btn btn-sm bg-AF-200 px-4" @click="closeModal">Cancel</button>
            </div>
          </div>


        </template>
      </dialogModal>


    </Teleport>


  </div>
</template>
