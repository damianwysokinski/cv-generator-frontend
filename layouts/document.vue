<script setup lang="ts">
import AppNavigation from "~/components/dashboard/AppNavigation.vue";
import ToastComp from "~/components/dashboard/ToastComp.vue";
import AppSidebar from "~/components/dashboard/AppSidebar.vue";
</script>

<template>
  <div>
    <div class="antialiased bg-gray-50 min-h-screen">
      <app-navigation />
      <app-sidebar />

      <main class="md:ml-64 min-h-screen">
        <slot />
      </main>
      
      <toast-comp />
    </div>
  </div>
</template>