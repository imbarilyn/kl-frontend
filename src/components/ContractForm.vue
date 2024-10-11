<script setup lang="ts">
import ListBox from '@/components/ListBox.vue'
import ComboBox from '@/components/ComboBox.vue'
import { useField } from 'vee-validate'
import { reactive, ref, watch } from 'vue'
import moment from 'moment'
import { useContractStore } from '@/stores'

const countries = [
  { name: 'Kenya' },
  { name: 'Uganda' },
  { name: 'Tanzania' },
  { name: 'Rwanda' },
  { name: 'Djibouti' },
  { name: 'South Africa' },
  { name: 'Nigeria' },
  { name: 'Ghana' },
  { name: 'Angola' }
]

const companies = [
  { name: 'KLM' },
  { name: 'Air France' }
]

const categories = [
  { id: 1, name: 'Stationery' },
  { id: 2, name: 'Office Cleaning' },
  { id: 3, name: 'Staff Miscellaneous' },
  { id: 4, name: 'Office Rent' },
  { id: 5, name: 'Repair and Maintenance' },
  { id: 6, name: 'Expatriate allowance' }
]

const contractData = reactive({
  contractName: '',
  vendorName: '',
  country: '',
  company: '',
  category: '',
  startDate: '',
  expiryDate: '',
})
const contractStore = useContractStore()
// validator function
const nameValidator =(value: string) =>{
  const nameRegExp = /^[a-zA-Z0-9\s]+$/
  if(!value){
    return 'Name is required'
  }
  if(value.replace(/\s/g, '').length> 20){
    return 'Name must be less than 20 characters'
  }
  if(value.replace(/\s/g, '').length< 3){
    return 'Name must be more than 3 characters'
  }
  if(!nameRegExp.test(value)){
    return 'Name must be alphanumeric'
  }
  return true
}

// validation for contractName
const {
  value: contractName,
  errorMessage: contractNameErrorMessage,
  meta: contractNameMeta
} = useField('contractName', nameValidator)


watch(()=>contractData.contractName, (value)=>{
  contractName.value = value
})


// validation for vendorName
const {
  value: vendorName,
  errorMessage: vendorNameErrorMessage,
  meta: vendorNameMeta
} = useField('vendorName', nameValidator)

watch(()=>contractData.vendorName, (value)=>{
  vendorName.value = value
})

const now = moment().format('YYYY-MM-DD')

const startDateValidator = (value: string) => {
    if (!value) {
    return 'Start date is required'
  }
  if(moment(value).isAfter(now)){
    console.log('start date is before today')
    return 'Start date should not be before today'
  }
  return true
}
  const {
    value: startDate,
    errorMessage: startDateErrorMessage,
    meta: startDateMeta
  } = useField('startDate', startDateValidator)

  watch(()=>contractData.startDate, (value)=>{
    startDate.value = value
  })

const expiryDateValidator = (value: string) => {
  if (!value) {
    return 'Expiry date is required'
  }
  if(moment(value).isBefore(now)){
    return 'Expiry date should not be before today'
  }
  return true
}

const {
  value: expiryDate,
  errorMessage: expiryDateErrorMessage,
  meta: expiryDateMeta
} = useField('expiryDate',expiryDateValidator)

watch(()=>contractData.expiryDate, (value)=>{
  expiryDate.value = value
})





const fileUpload = ref()
const fileUploadError = ref('')
const fileAdd = (e: Event) =>{
  const target = e.target as HTMLInputElement
  const file = target.files as FileList
  const maxSize = 1024 * 1024 * 3
  if(file.length > 0 && file[0].size <= maxSize){
    fileUpload.value = file
    console.log(fileUpload.value[0])
    return true
  }
  else{
    fileUploadError.value = 'File size should not exceed 3MB'
    return false
  }
}

const everyThingIsValid = () => {
  return contractNameMeta.validated && contractNameMeta.valid && vendorNameMeta.validated  && vendorNameMeta.valid && startDateMeta.validated   && startDateMeta.valid &&  expiryDateMeta.validated  && expiryDateMeta.valid  && fileUpload;
}

const handleCountry = (value: string) =>{
  contractData.country = value
}

const handleCompany = (value: string) =>{
  contractData.company = value
}

const handleCategory = (value: string)=>{
  contractData.category = value
}

// We can now upload our contracts hooray!
const addContract = () => {
  const formData = new FormData()
  console.log(typeof (fileUpload.value))

  // All good we can now persist the server
  if(everyThingIsValid()){
    formData.append('contract_name', contractData.contractName)
    formData.append('vendor_name', contractData.vendorName)
    formData.append('country', contractData.country)
    formData.append('company_name', contractData.company)
    formData.append('category', contractData.category)
    formData.append('start_date', contractData.startDate)
    formData.append('end_date', contractData.expiryDate)
    formData.append('file', fileUpload.value[0])
    formData.append('status', 'active')
    console.log('Contract added successfully')
    contractStore.addContract(formData)
      .then((resp)=>{
        console.log(resp)
      })

  }
  else{
    console.log('Contract not added')
  }
}


</script>

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
            <form class="my-4" @submit.prevent="addContract">
              <div class="grid gap-y-4">
                <div class="grid grid-cols-2 gap-2">
                  <div class="flex flex-col space-y-1">
                    <div class="flex justify-between items-center">
                      <label class="label font-semibold text-sm text-white" for="contractName">Contract Name</label>
                    </div>
                    <input
                      v-model="contractData.contractName"
                      id="contractName"
                      class="input input-primary input-bordered w-full text-sm"
                      placeholder="Hill Park Hotel"
                      required
                      type="text"
                      :class="{
                        'input-error': contractNameMeta.validated && !contractNameMeta.valid,
                        'input-primary': contractNameMeta.validated && contractNameMeta.valid
                        }"
                    />
                    <div v-if="contractNameMeta.validated && !contractNameMeta.valid">
                      <span class="text-rose-500 text-sm" >{{contractNameErrorMessage}}</span>
                    </div>
                  </div>
                  <div class="flex flex-col space-y-1">
                    <div class="flex justify-between items-center">
                      <label class="label font-semibold text-sm text-white" for="contractName">Vendor Name</label>
                    </div>
                    <input
                      v-model="contractData.vendorName"
                      id="vendorName"
                      class="input input-primary input-bordered w-full text-sm"
                      placeholder="Hill Park Hotel"
                      required
                      type="text"
                      :class="{
                        'input-error': vendorNameMeta.validated && !vendorNameMeta.valid,
                        'input-primary': vendorNameMeta.validated && vendorNameMeta.valid
                        }"
                    />
                    <div v-if="vendorNameMeta.validated && !vendorNameMeta.valid">
                      <span class="text-rose-500 text-sm">{{vendorNameErrorMessage}}</span>
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-2 z-40 gap-2">
                  <div class="flex flex-col">
                    <div class="flex justify-between items-center w-full">
                      <label class="label font-semibold text-sm text-white" for="country">Country</label>
                    </div>
                    <ListBox :list-props="countries" @list-choice="handleCountry"/>
                  </div>
                  <div>
                    <div class="flex justify-between items-center w-full">
                      <label class="label font-semibold text-sm text-white" for="country">Company</label>
                    </div>
                    <ListBox :list-props="companies" @list-choice="handleCompany" />
                  </div>
                </div>
                <div>
                  <div class="flex justify-between items-center w-full">
                    <label class="label font-semibold text-sm text-white" for="country">Category</label>
                  </div>
                  <ComboBox :combo-props="categories"  @combo-choice="handleCategory"/>
                </div>

                <div class="grid grid-cols-2 gap-2">
                  <div class="flex flex-col space-y-1">
                    <div class="flex justify-between items-center">
                      <label class="label font-semibold text-sm text-white" for="expiryDate">Start date</label>
                    </div>
                    <input
                      v-model="contractData.startDate"
                      id="startdate"
                      class="input input-primary input-bordered w-full text-sm"
                      required
                      type="date"
                      :class="{
                        'input-error': startDateMeta.validated && !startDateMeta.valid,
                       'input-primary': startDateMeta.validated && startDateMeta.valid
                      }"
                    />
                    <div>
                      <span class="text-rose-500 text-sm">{{startDateErrorMessage}}</span>
                    </div>
                  </div>
                  <div class="flex flex-col space-y-1">
                    <div class="flex justify-between items-center">
                      <label class="label font-semibold text-sm text-white" for="expiryDate">Expiry date</label>
                    </div>
                    <input
                      v-model="contractData.expiryDate"
                      id="expirydate"
                      class="input input-primary input-bordered w-full text-sm"
                      required
                      type="date"
                      :class="{
                        'input-error': expiryDateMeta.validated && !expiryDateMeta.valid,
                        'input-primary': expiryDateMeta.validated && expiryDateMeta.valid
                        }"
                    />
                    <div>
                      <span class="text-rose-500 text-sm">{{expiryDateErrorMessage}}</span>
                    </div>
                  </div>

                </div>

                <div class="flex flex-col space-y-1">
                  <div class="flex justify-between items-center">
                    <label class="label font-semibold text-sm text-white" for="contractName">Upload Contract</label>
                  </div>
                  <input
                    @change="fileAdd"
                    type="file"
                    accept=".pdf"
                    class="file-input file-input-bordered file-input-info w-full" />
                  <div v-if='fileUploadError.length > 0'>
                    <span class="text-rose-500 test-sm">{{fileUploadError}}</span>
                  </div>
                </div>
                <div class="w-full">
                  <button type="submit" class="btn btn-sm  bg-main-color-light hover:bg-main-color-dark w-full">Submit
                  </button>
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
