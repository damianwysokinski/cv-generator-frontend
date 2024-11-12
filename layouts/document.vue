<script setup lang="ts">
import AppNavigation from "~/components/dashboard/AppNavigation.vue";
import ToastComp from "~/components/dashboard/ToastComp.vue";
</script>

<template>
  <div>
    <div class="antialiased min-h-screen">
      <app-navigation />
      <main class="p-4 md:ml-64 min-h-screen pt-20">
        <slot />
      </main>
      <toast-comp />
    </div>

    <div
      class="absolute -z-10 inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
    ></div>
  </div>
</template>