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
  @apply pl-5;
}
#previewDocument ul li {
  @apply relative;
}
#previewDocument ul li::before {
  @apply absolute -left-5 text-xl leading-5;
  content: "•";
}
</style>