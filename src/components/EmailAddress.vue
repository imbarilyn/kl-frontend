<script setup lang="ts">
import { onMounted, ref } from 'vue'
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
      if (response.result === 'success') {
        emailAddressesArray.value = { ...response.emails }
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
    <div v-for="email in emailAddressesArray" :key="email">
      <div class="card bg-blue-00 w-80 ms-28 shadow-xl">
        <figure>
          <img
            src="../assets/images/email.jpg"
            class=""
            alt="email" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">Email address</h2>
          <p>{{ email }}</p>
          <div class="card-actions justify-end">
            <span class="material-icons-outlined text-AF-500">edit</span>
            <span class="material-icons-outlined text-rose-500">delete</span>
          </div>
        </div>
      </div>

    </div>

  </div>


</template>

<style scoped>

</style>