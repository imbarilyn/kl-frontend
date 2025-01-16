<script setup lang="ts">

import NotificationBanner from '@/components/toasts/NotificationBanner.vue'
import { useAuthStore } from '@/stores/authStore'
import { onBeforeUnmount } from 'vue'


const authStore = useAuthStore()


</script>

<template>
  <div class="relative">

      <NotificationBanner :message="authStore.isAuthenticationError.message"
                          :is-open=authStore.isAuthenticationError.isError
                          :type="authStore.isAuthenticationError.type" />

    <RouterView #default="{Component, route}">
      <Transition mode="out-in" appear name="page">
        <template v-if="Component">
          <component :is="Component" :key="route.fullPath" />
        </template>
      </Transition>
    </RouterView>
  </div>

</template>

<style scoped>
.page-enter-from {
  opacity: 0;
  transform: translateY(50%);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(50%)
}

.page-enter-active, .page-leave-active {
  transition: all 0.35s ease-out;
}

</style>