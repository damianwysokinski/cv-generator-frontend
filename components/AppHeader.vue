<script setup lang="ts">

</script>

<template>
  <header>
    <nav class="bg-white border-b border-gray-200 px-4 lg:px-6 py-2.5">
      <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <NuxtLink to="/" class="flex items-center">
          <span class="self-center text-xl font-semibold whitespace-nowrap">CV Generator</span>
        </NuxtLink>
        <div class="flex items-center lg:order-2">
          <NuxtLink to="/auth/login" class="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none">Log in</NuxtLink>
          <NuxtLink to="/auth/register" class="text-white bg-zinc-950 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none">Get started</NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>