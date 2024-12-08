<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useContractStore } from '@/stores'
import { showAlert } from '@/alert'
import DialogModal from '@/components/DialogModal.vue'
import { useField } from 'vee-validate'
import { type EmailAddressPayload } from '@/stores'

const contractStore = useContractStore()


const contractEmail = ref<string>('')
const emailAddressesArray = ref<EmailAddressPayload []>([])
const openDialog = ref<boolean>(false)

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

onMounted(() => {
  contractStore.getEmailAddresses()
    .then(response => {
      console.log(response)
      if (response?.data) {
        emailAddressesArray.value = response.data
        console.log(emailAddressesArray.value)
      }
    })
    .catch(error => {
      console.log(error)
      return
    })
})
const selectedEmail = ref<EmailAddressPayload | null>(null)
const editEmail = (emailId: Number) => {
  selectedEmail.value = emailAddressesArray.value.find(email => email.id === emailId) as EmailAddressPayload
  contractEmail.value = selectedEmail.value.email
  openDialog.value = true
}

const emailPayLoad = ref<EmailAddressPayload>({
  email: '',
  id: 0

})

const emailUpdateLoading = ref<boolean>(false)
const updateEmail = () => {
  // console.log('We are editing the emails')
  if (selectedEmail.value?.email === contractEmail.value) {
    showAlert({
      message: 'Email address is the same, no changes made',
      type: 'info'
    })
  } else {
    if (emailMeta.validated && emailMeta.valid) {
      emailPayLoad.value = {
        email: contractEmail.value,
        id: selectedEmail.value?.id as number
      }
      emailUpdateLoading.value = true
      contractStore.editEmail(emailPayLoad.value)
        .then(resp => {
          if (resp.result === 'success') {
            showAlert({
              message: 'Email address updated successfully',
              type: 'success'
            })
            // closeDialog()
            setTimeout(() => {
              emailUpdateLoading.value = false
              closeDialog()
              window.location.reload()
            }, 1000)
          } else {
            showAlert({
              message: 'Unable to update email address, please try again',
              type: 'error'
            })
          }
        })
        .catch(err => {
          console.log(err)
          showAlert({
            message: 'Unable to update email address, please try again',
            type: 'error'
          })
        })
        .finally(() => {
          emailUpdateLoading.value = false
        })
    } else {
      return
    }
  }
}

const deleteEmail = (email: Number) => {
  console.log('Delete email')
}

const closeDialog = () => {
  openDialog.value = false
}
</script>

<template>
  <div class="w-full flex">
    <div v-for="email in emailAddressesArray" :key="email.id">
      <div class="card bg-blue-00 w-80 ms-28 shadow-xl">
        <figure>
          <img
            src="../assets/images/email.jpg"
            class=""
            alt="email" />
        </figure>
        <div class="space-y-4 py-4 px-4">
          <h2 class="pt-4 font-bold">Email address</h2>
          <div class="flex justify-between">
            <span class="text-md">{{ email.email }}</span>
            <div class="flex justify-end ">
              <button class="btn btn-sm btn-ghost" @click.stop="editEmail(email.id)">
                <span class="material-icons-outlined text-AF-500">edit</span>
              </button>
              <button class="btn btn-sm btn-ghost" @click.stop="deleteEmail(email.id)">
                <span class="material-icons-outlined text-rose-500">delete</span>
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
    <Teleport to="body">
      <DialogModal :is-open="openDialog" @close-modal="closeDialog">
        <template #title>
          <div class="flex justify-end ">
            <button class="btn btn-sm btn-ghost btn-circle"
                    @click="closeDialog">
              <span class="material-icons-outlined">close</span>
            </button>
          </div>
        </template>
        <template #body>
          <div class="grid grid-cols-1 gap-3 py-1 px-5">
            <div class="flex flex-col space-y-2">
              <label class="label text-sm font-semibold" for="email"> Email address </label>
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
              >Please edit the email to update the email address.
              </small>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="px-5">
            <button
              @click.stop="updateEmail"
              class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-AF-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              type="button"
              :disabled="emailMeta.validated && !emailMeta.valid"
            >
              <span  v-if="emailUpdateLoading" class="loading loading-spinner loading-sm"></span>
              <span v-else>Update Email</span>
            </button>
          </div>
        </template>
      </DialogModal>
    </Teleport>

  </div>


</template>

<style scoped>

</style>