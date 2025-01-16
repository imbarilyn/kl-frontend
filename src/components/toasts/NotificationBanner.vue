<script setup lang="ts">

import { useAuthStore } from '@/stores/authStore'
import { computed, onMounted } from 'vue'
const authStore = useAuthStore()
const props = defineProps<{
  message: string
  isOpen: boolean
  type: 'info' | 'success' | 'warning' | 'error'| null
}>()

const closeNotificationBanner = () => {
  authStore.closeBanner()
}

const bannerBgColor = computed(()=>{
  if(props.type === 'info'){
    return 'bg-AF-100'
  }else if(props.type === 'success'){
    return 'bg-green-100'
  }else if(props.type === 'warning'){
    return 'bg-yellow-100'
  }else if(props.type === 'error'){
    return 'bg-red-100'
  }else {
    return 'bg-gray-100'
  }
})

const bannerTextColor = computed(()=>{
  if(props.type === 'info'){
    return 'text-AF-500'
  }else if(props.type === 'success'){
    return 'text-green-500'
  }else if(props.type === 'warning'){
    return 'text-yellow-500'
  }else if(props.type === 'error'){
    return 'text-rose-500'
  }else {
    return 'text-gray-500'
  }
})

const bannerDashColor = computed(()=>{
  if(props.type === 'info'){
    return 'bg-AF-500'
  }else if(props.type === 'success'){
    return 'bg-green-500'
  }else if(props.type === 'warning'){
    return 'bg-yellow-500'
  }else if(props.type === 'error'){
    return 'bg-rose-500'
  }else {
    return 'bg-gray-500'
  }
})

</script>


  <template>
    <div
      v-if="props.isOpen"
      class="absolute w-full flex py-2 px-4" :class="bannerBgColor">
      <div :class="bannerDashColor" class="absolute inset-y-0 left-0 w-1"></div>
      <div class="flex gap-4">
        <div class="flex items-center" :class="bannerTextColor">
          <span class="text-sm/6  material-icons-outlined"  >{{props.type}}</span>
        </div>
        <div class="flex items-center">
          <span class="text-sm/6" :class="bannerTextColor">{{props.message}}</span>
        </div>
      </div>
      <div class="flex flex-1 justify-end">
        <button type="button" class="-m-3 p-3 focus-visible:outline-offset-[-4px]" @click="closeNotificationBanner">
          <span class="sr-only">Dismiss</span>
          <span class="material-icons-outlined">close</span>
        </button>
      </div>
    </div>
  </template>

<style scoped></style>