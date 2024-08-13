<script lang="ts" setup>
const onSubmit = () => {
  console.log('submitting form')
}

</script>


<template>
  <main class="w-full  mx-auto p-6 flex items-center justify-center">
    <div
      class="w-full md:w-6/12 lg:w-5/12 xl:w-4/12 px-4 md:px-2 lg:px-0 mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-4 sm:p-7">
        <div class="text-center">
          <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">Sign up</h1>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?
            <router-link
              class="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              to="/auth/user-login"
            >
              Login here
            </router-link>
          </p>
        </div>

        <div class="mt-5">
          <form @submit.prevent="onSubmit">
            <div class="grid gap-y-4">

              <!-- Email -->
              <div class="flex flex-col space-y-1">
                <div class="flex flex-col space-y-1">
                  <label class="label font-semibold text-sm" for="username">Country Name</label>
                  <input
                    id="username"
                    class="input input-primary input-bordered text-sm w-full"
                    placeholder="full names"
                    type="text"
                  />
                </div>

              <!-- Confirm Password -->

              <button
                class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                type="submit"
              >
<!--                              <span-->
<!--                                v-if="isLoadingResource"-->
<!--                                class="loading loading-md loading-spinner text-neutral-400"-->
<!--                              ></span>-->
<!--                <span v-else>Sign up</span>-->

              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>

</template>