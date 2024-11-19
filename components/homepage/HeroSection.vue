<script setup lang="ts">

</script>

<template>
  <section class="px-4 lg:px-6 border-b relative">
    <div class="w-full mx-auto max-w-screen-xl py-8 lg:py-24 grid gap-8 lg:gap-12 lg:grid-cols-2 items-center text-center lg:text-left">
      <div>
        <h1 class="mb-4 text-3xl font-bold leading-none text-gray-900 md:text-5xl">Craft Your Professional CV in Minutes</h1>
        <p class="mb-8 text-md md:text-xl font-normal">
          Choose from elegant templates, personalize your details, and generate a standout CV effortlessly.
        </p>
        <NuxtLink to="/auth/register" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-zinc-950">
          Create your CV
        </NuxtLink>
      </div>
      <div></div>
    </div>

    <div
        class="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px] -z-10"
    ></div>
  </section>
</template>