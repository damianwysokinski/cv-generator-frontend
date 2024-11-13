<script setup lang="ts">
defineProps({
  title: String
})

const isPanelOpen = ref(false);
</script>

<template>
  <div class="py-4 px-6 border-b select-none">
    <div @click="isPanelOpen = !isPanelOpen" class="font-medium text-gray-900 cursor-pointer flex items-center justify-between">
      <div>{{ title }}</div>
      <div v-if="isPanelOpen">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
        </svg>
      </div>
      <div v-else>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>
    </div>
    <div v-if="isPanelOpen" class="mt-4">
      <slot />
    </div>
  </div>
</template>
