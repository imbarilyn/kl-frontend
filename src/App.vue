<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import  { useNotificationsStore} from '@/stores'
import ToastContainer from '@/components/toasts/ToastContainer.vue'
import ToastAlert from '@/components/toasts/ToastAlert.vue'

const notificationsStore = useNotificationsStore()
</script>

<template>
<!--  <p>Hello</p>-->
  <RouterView />

  <teleport to="body">
    <ToastContainer v-if="notificationsStore.hasNotifications">
      <template v-for="notification in notificationsStore.getNotifications" :key="notification.id">
        <ToastAlert
          v-if="notification.id && notification.isShown"
          :id="notification.id"
          :is-shown="notification.isShown"
          :message="notification.message"
          :type="notification.type"
        />
      </template>
    </ToastContainer>
  </teleport>
</template>

