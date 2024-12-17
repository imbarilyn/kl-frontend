<script setup lang="ts">

</script>

<template>
  <RouterView #default="{Component, route}">
    <Transition mode="out-in" appear name="">
      <template v-if="Component">
        <component  :is="Component" :key="route.fullPath"/>
      </template>

    </Transition>
  </RouterView>

</template>

<style scoped>

</style>