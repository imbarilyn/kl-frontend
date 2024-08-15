<template>
  <div class="h-full w-full ">
    <main class="w-full mx-auto flex items-center justify-center h-full">
      <div
        class="w-full md:w-6/12 lg:w-5/12 xl:w-4/12 px-4 md:px-2 lg:px-0 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="sm:p-7">
          <div class="text-center">
            <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">Add Contract</h1>
<!--            <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">-->
<!--              Login in here-->
<!--            </p>-->
          </div>

          <div class="">
            <!-- Form -->
            <form class="my-4">
              <div class="grid gap-y-4">
                <div class="flex flex-col space-y-1">
                  <div class="flex justify-between items-center">
                    <label class="label font-semibold text-sm" for="contractName">Contract name</label>
                  </div>
                  <input
                    id="contractName"
                    class="input input-primary input-bordered w-full text-sm"
                    placeholder="Hill Park Hotel"
                    required
                    type="text"
                  />
                </div>
                <div class="flex flex-col space-y-1">
                  <div class="flex justify-between items-center w-full">
                    <label class="label font-semibold text-sm" for="country">Country</label>
                  </div>
                  <ListBox />
                </div>
                <div class="flex flex-col space-y-1">
                  <div class="flex justify-between items-center">
                    <label class="label font-semibold text-sm" for="expiryDate">Expiry date</label>
                  </div>
                  <input
                    id="expirydate"
                    class="input input-primary input-bordered w-full text-sm"
                    placeholder="Hill Park Hotel"
                    required
                    type="date"
                  />
                </div>
                <div class="flex flex-col space-y-1">
                  <div class="flex justify-between items-center">
                    <label class="label font-semibold text-sm" for="contractName">Upload Contract</label>
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    class="file-input file-input-bordered file-input-info w-full" />
                </div>
                <div class="w-full">
                  <button class="btn btn-sm bg-main-color-light hover:bg-main-color-dark w-full">Submit</button>
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
import ListBox from '@/components/toasts/ListBox.vue'
</script>