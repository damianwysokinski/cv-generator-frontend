<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: 'dashboard',
  middleware: ["auth"]
})

const { user } = useAuthStore();
</script>

<template>
  <div class="mx-auto max-w-screen-xl">
    <h1 class="mb-4 text-2xl font-semibold">
      Hello, {{ user?.firstName }}!
    </h1>
  </div>
</template>
