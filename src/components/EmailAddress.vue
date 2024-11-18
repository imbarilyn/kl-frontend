<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useContractStore } from '@/stores'

const contractStore = useContractStore()

const emailAddressesArray = ref<string[]>([])

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