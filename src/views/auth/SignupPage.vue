<template>
  <div class="h-full w-full ">
    <main class="w-full mx-auto p-6 flex items-center justify-center h-screen">
      <div
        class="w-full md:w-6/12 lg:w-5/12 xl:w-4/12 px-4 md:px-2 lg:px-0 mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-4 sm:p-7">
          <div class="text-center">
            <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">Already have an account</h1>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Login in here
              <router-link
                class="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                :to="`/auth/user-signup`"
              >
                Create account
              </router-link>
            </p>
          </div>

          <div class="mt-5">
            <!-- Form -->
            <form class="my-4">
              <div class="grid gap-y-4">
                <div class="flex flex-col space-y-1">
                  <div class="flex justify-between items-center">
                    <label class="label font-semibold text-sm" for="email">Email address </label>
                    <!--                  <router-link-->
                    <!--                      class="text-sm text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"-->
                    <!--                      to="forgot-password">Forgot password?-->
                    <!--                  </router-link>-->
                  </div>
                  <input
                    id="email"
                    class="input input-primary input-bordered w-full text-sm"
                    placeholder="John Doe"
                    required
                    type="email"
                  />
                </div>
              </div>
            </form>
            <!-- End Form -->
          </div>
        </div>
      </div>
    </main>

  </div>
</template>
<script setup lang="ts">
</script>