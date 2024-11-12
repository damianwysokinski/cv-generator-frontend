<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})

import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');

const register = async () => {
  try {
    await authStore.register({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    });
    navigateTo('/auth/login');
  } catch (error) {
    console.error('Registration error', error);
  }
};
</script>

<template>
  <section class="bg-gray-50">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Create an account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="register">
            <div>
              <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900">First name</label>
              <input v-model="firstName" type="text" name="firstName" id="firstName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="" required="">
            </div>
            <div>
              <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900">Last name</label>
              <input v-model="lastName" type="text" name="lastName" id="lastName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="" required="">
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Your email</label>
              <input v-model="email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="name@company.com" required="">
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" required="">
            </div>
            <button type="submit" class="w-full text-white bg-zinc-950 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
            <p class="text-sm font-light text-gray-500">
              Already have an account? <NuxtLink to="/auth/login" class="font-medium text-zinc-950 hover:underline">Login here</NuxtLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>