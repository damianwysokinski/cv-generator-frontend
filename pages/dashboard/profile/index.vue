<script setup lang="ts">
import {useAuthStore} from "~/stores/auth";
import InputLabel from "~/components/InputLabel.vue";

definePageMeta({
  layout: 'dashboard',
  middleware: ["auth"]
})

const authStore = useAuthStore();

const updateProfile = async () => {
  await authStore.updateUser(
      authStore.user.id,
      authStore.user
  );
};

const deleteAccount = async () => {
  await authStore.removeUser(authStore.user.id);
  await navigateTo("/auth/login");
}
</script>

<template>
  <div>
    <div v-if="authStore.user" class="mx-auto max-w-screen-xl">
      <h1 class="mb-4 text-2xl font-semibold">Settings</h1>

      <div class="p-4 bg-white rounded shadow">
        <div class="mb-6 pb-6 border-b">
          <h2 class="mb-4 text-lg font-semibold">Personal information</h2>

          <div class="grid xl:grid-cols-2 gap-8">
            <div>
              <input-label for="first_name">First Name</input-label>
              <text-input
                  v-model="authStore.user.firstName"
                  id="first_name"
                  type="text"
                  placeholder=""
                  required
              />
            </div>
            <div>
              <input-label for="last_name">Last Name</input-label>
              <text-input
                  v-model="authStore.user.lastName"
                  id="last_name"
                  type="text"
                  placeholder=""
                  required
              />
            </div>
            <div>
              <input-label for="email">Email address</input-label>
              <text-input
                  v-model="authStore.user.email"
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                  disabled
              />
            </div>
          </div>
        </div>

        <div class="mb-6 pb-6 border-b">
          <h2 class="mb-4 text-lg font-semibold">Password</h2>

          <div class="grid xl:grid-cols-2 gap-8">
            <div>
              <input-label for="current_password">Current password</input-label>
              <text-input
                  id="current_password"
                  type="password"
                  placeholder=""
                  required
              />
            </div>
            <div>
              <input-label for="new_password">New password</input-label>
              <text-input
                  id="new_password"
                  type="password"
                  placeholder=""
                  required
              />
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <button @click="deleteAccount" type="button" class="py-2.5 px-5 text-sm font-medium text-red-600 focus:outline-none bg-red-50 rounded">Delete account</button>
          <button @click="updateProfile" type="button" class="py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-zinc-950 rounded">Save changes</button>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<style scoped>

</style>