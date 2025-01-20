<script setup lang="ts">
import AppNavigation from "~/components/dashboard/AppNavigation.vue";
import AppSidebar from "~/components/dashboard/AppSidebar.vue";
import ToastComp from "~/components/dashboard/ToastComp.vue";
</script>

<template>
  <div>
    <div class="antialiased bg-gray-50 min-h-screen">
      <app-navigation />
      <app-sidebar />

      <main class="p-4 md:ml-72 min-h-screen pt-20">
        <slot />
      </main>

      <toast-comp />
    </div>
  </div>
</template>