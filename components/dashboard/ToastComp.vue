<script setup lang="ts">
import { useToastStore } from '~/stores/toast';

const toastStore = useToastStore();
</script>

<template>
  <div class="fixed bottom-4 right-4">
    <div
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      class="flex items-center w-full max-w-xs mt-2 p-4 text-gray-500 bg-white rounded-lg shadow" role="alert"
    >
      <div :class="[
        'mr-2 w-1 h-6 bg-black rounded',
        toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
      ]"></div>
      <div class="text-sm font-normal">{{ toast.message }}</div>
      <button type="button" class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#toast-success" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
    </div>
  </div>

</template>

<style scoped>

</style>