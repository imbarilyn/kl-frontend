<script setup lang="ts">
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
          <form class="md:my-4">
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
                    <img src="/images/klm-logo.png" alt="klm-logo" class="w-20">
                  </div>
                  <div>
                    <label class="label font-semibold text-sm" for="email">Email address </label>
                    <input
                      id="email"
                      class="input input-primary input-bordered  border-1 border-AF-500 w-full text-sm"
                      placeholder="John Doe"
                      required
                      type="email"
                    />
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
                        id="email"
                        class="input input-primary input-bordered border-1 border-AF-500  w-full text-sm"
                        placeholder="John Doe"
                        required
                        type="password"
                      />
                    </div>
                  </div>
                  <div class="w-full">
                    <button class="btn w-full bg-AF-400 hover:bg-AF-700">
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


  </div>
</template>
