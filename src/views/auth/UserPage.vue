<script setup lang="ts">

</script>

<template>
  <RouterView #default="{Component, route}">
    <Transition mode="out-in" appear name="page">
      <template v-if="Component">
        <component  :is="Component" :key="route.fullPath"/>
      </template>

    </Transition>
  </RouterView>

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