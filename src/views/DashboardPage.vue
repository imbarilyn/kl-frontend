<script lang="ts" setup>
import { useContractStore, useNotificationsStore } from '@/stores'
import DialogModal from '@/components/DialogModal.vue'
import { useField } from 'vee-validate'
import { ref, watch } from 'vue'
import { useRouter} from 'vue-router'

import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const contractStore = useContractStore()
const router = useRouter()
const addContractEmail = () => {
  contractStore.openAddEmailDialog()
}

const contractEmail = ref('')

const emailValidator = (value: string) => {
  if (!value) {
    return 'Email is required'
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@klm\.com$/

  if (!emailRegex.test(value)) {
    return 'Email must be valid ending with @klm.com'
  }

  if (value.length > 50) {
    return 'Email must be less than 50 characters'
  }
  return true
}

const {
  value: email,
  errorMessage: emailErrorMessage,
  meta: emailMeta
} = useField('contractEmail', emailValidator)


watch(() => contractEmail.value, (value) => {
  email.value = value
})

const postEmail = () => {
  if (emailMeta.valid && emailMeta.validated) {
    console.log('email', contractEmail.value)
    contractStore.addEmail(contractEmail.value)
      .then((resp) => {
        if (resp.result === 'success') {
          showAlert({ message: 'Email added successfully', type: 'success' })
        } else {
          showAlert({ message: 'Email not added', type: 'error' })
        }
      })
      .catch((error) => {
        showAlert({ message: 'Email not added', type: 'error' })
      })
      .finally(() => {
        contractEmail.value = ''
        contractStore.closeEmailDialog()
      })
  } else {
    showAlert({ message: 'Enter valid email', type: 'error' })
  }
}

const logout = () => {
  contractStore.openLogoutDialog()
}

const addContract = ()=>{
  router.push(
    {
      name: 'addContract'
    }
  )

}

</script>


<template>
  <div class="min-h-screen flex flex-row">
<!--    right side-->
    <div class="relative h-screen w-64 ">
      <div class= 'fixed px-4 py-4 w-64 bg-main-color bottom-0 top-0 inset-y-0 h-screen'>
<!--        klm logo-->
        <div class="">
          <p class="text-white">Welcome Linah</p>
        </div>
<!--        contracts per country  section-->
        <div class="pt-4 flex flex-col">
          <div class="pb-4">
            <p class="text-white font-semibold">Contracts</p>
          </div>
          <div class="overflow-y-auto">
            <div class="pb-4">
              <button class="btn btn-sm w-full justify-start">
                <span class="material-icons-outlined">summarize</span>
                <span>Kenya</span>
              </button>
            </div>

          </div>



          <div class="">
            <!--          Available email address-->
            <div class="pb-4">
              <button class="btn btn-sm w-full justify-start">
                <span class="material-icons-outlined">email</span>
                <span>Email addresses</span>
              </button>
            </div>
            <!--          expired contracts-->
            <div class="relative">
              <button class="btn btn-sm w-full justify-start">
                <span class="material-icons-outlined">running_with_errors</span>
                <span>Expired Contracts</span>
              </button>
              <div class="absolute -top-2 -right-2 bg-rose-400 rounded-full flex justify-center items-centers px-2 py-1">
                <p class="text-xs text-white">2</p>
              </div>
            </div>

          </div>

        </div>

<!--        bottom section-->
        <div class="absolute space-y-2 bottom-0 pb-4 flex flex-col w-full">

          <div class="me-8">
            <button class="btn btn-sm w-full justify-start">
              <span class="material-icons-outlined">settings</span>
              <span>Settings</span>
            </button>
          </div>

          <!--          logout button-->
          <div class="me-8">
            <button class=" btn btn-sm w-full justify-start"
            @click="logout">
              <span class="material-icons-outlined">logout</span>
              <span>Log out</span>
            </button>
          </div>

        </div>
      </div>
    </div>
<!--    right side-->
    <div class="flex flex-col w-full relative">
      <div class="flex justify-end w-full sticky top-0 px-4 py-3">
        <div class="">
          <button
            @click="addContractEmail"
            class=" btn btn-sm w-full btn-ghost justify-start">
            <span class="material-icons text-main-color">email</span>
            <span> New email</span>
          </button>
        </div>
        <div>
          <button
            @click="addContract"
            class=" btn btn-sm btn-ghost w-full justify-start">
            <span class="material-icons text-main-color">assignment_add</span>
            <span> New contract</span>
          </button>
        </div>
      </div>
        <RouterView #default="{Component, route}">
          <transition name="fade-away" mode="in-out">
            <component :is="Component" :key="route.fullPath" />
          </transition>

        </RouterView>
    </div>

  </div>
  <DialogModal :is-open="contractStore.isEmailDialogOpen.isOpen" @close-modal="contractStore.closeEmailDialog">
    <template #title>
      <div class="flex justify-end ">
        <button class="btn btn-sm btn-ghost btn-circle"
        @click="contractStore.closeEmailDialog()">
          <span class="material-icons-outlined">close</span>
        </button>
      </div>
    </template>
    <template #body>
      <div class="grid grid-cols-1 gap-3 py-1 px-5">
        <div class="flex flex-col space-y-2">
          <label class="label text-xs font-semibold" for="email"> Email address </label>
          <input
            id="page-name"
            v-model="contractEmail"
            :class="{
            'input-error': emailMeta.validated && !emailMeta.valid,
            'input-primary': emailMeta.validated && emailMeta.valid
          }"
            class="input input-primary input-bordered w-full text-sm"
            placeholder="Contract Email"
            type="text"
          />
          <small v-if="emailMeta.validated && !emailMeta.valid" class="text-xs text-rose-500">
            {{ emailErrorMessage }}
          </small>
          <small class="text-xs text-gray-500"
          >This will be used as email address for contract expiry notification and it shall be sent 3 months prior to the expiry date
          </small>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="px-5">
        <button
          @click= "postEmail"
          class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          type="button"
        >
<!--          <span class="loading loading-spinner loading-sm"></span>-->
          <span>Add Email</span>
        </button>
      </div>
    </template>
  </DialogModal>
  <DialogModal
    :is-open="contractStore.isLogoutDialogOpen.isOpen"
    @closeModal="contractStore.closeLogoutDialog"
  >
    <template #title>
      <div class="flex justify-center">
        <span class="material-icons-outlined !text-6xl"> logout </span>
      </div>
    </template>
    <template #body>
      <div class="flex justify-center">
        <h1 class="text-xl font-bold">Oh no! You're leaving...</h1>
      </div>
      <div class="flex justify-center">
        <p class="text-lg font-semibold">Are you sure?</p>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-center w-full flex-row">
        <button class="btn bg-sky-200 me-5">Sign Out</button>
        <button class="btn bg-main-color " @click="contractStore.closeLogoutDialog()">
          Cancel
        </button>
      </div>
    </template>
  </DialogModal>
</template>

<style scoped>
.fade-away-enter-from{
  opacity: 0
}
.fade-away-enter-to{
  opacity: 1;
}
.fade-away-enter-active{
  transition: opacity 0.3s ease-in-out;
}
.fade-away-leave-active{
  transition: opacity 0.3s ease-in-out;
}
.fade-away-leave-from{
  opacity: 1;
}
.fade-away-leave-to{
  opacity: 0;
}
</style>
