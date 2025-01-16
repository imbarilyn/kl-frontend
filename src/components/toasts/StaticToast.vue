<script setup lang="ts">

const props = defineProps<{
  message: string
  show: boolean
}>()
const emits = defineEmits<{
  (event: 'closeStaticToast'): void
}>()

const closeStaticToast = () => {
  emits('closeStaticToast')
}
</script>

<template>
  <div class="toast toast-end" v-if="props.show">
    <div class="alert alert-info">
      <span>{{props.message}}</span>
      <span class="material-icons-outlined btn btn-sm btn-ghost pt-1" @click="closeStaticToast">close</span>
    </div>
  </div>
</template>

<style scoped>


</style>