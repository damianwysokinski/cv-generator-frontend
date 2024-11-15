<script setup lang="ts">
import SimplicityTemplate from '@/components/templates/SimplicityTemplate.vue';

const templates = [
  { name: 'Simplicity', component: SimplicityTemplate }
];

const selectedTemplate = shallowRef(templates[0]);
</script>

<template>
  <component :is="selectedTemplate.component" />
</template>

<style>
#previewDocument ul {
  @apply list-disc pl-5;
}
</style>