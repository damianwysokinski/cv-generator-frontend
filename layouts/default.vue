<script setup lang="ts">
import BannerSection from "~/components/BannerSection.vue";
</script>

<template>
  <div>
    <app-header />
    <div>
      <slot />
    </div>
    <banner-section />
    <app-footer />
  </div>
</template>
