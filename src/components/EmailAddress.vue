<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useContractStore } from '@/stores'

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


})

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