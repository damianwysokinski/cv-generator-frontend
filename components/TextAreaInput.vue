<script setup lang="ts">
const model = defineModel();
</script>

<template>
  <textarea v-model="model" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-5000"></textarea>
</template>