<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import InputLabel from "~/components/InputLabel.vue";
import DangerButton from "~/components/DangerButton.vue";
import PrimaryButton from "~/components/PrimaryButton.vue";

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

      <div class="mb-4 p-6 bg-white rounded shadow">
        <div class="mb-6 pb-6 border-b">
          <div class="mb-6 space-y-2">
            <h2 class="text-lg font-semibold">Personal information</h2>

            <p class="text-sm text-gray-600">
              Update your account's profile information and email address.
            </p>
          </div>

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
          <div class="mb-6 space-y-2">
            <h2 class="text-lg font-semibold">Password</h2>

            <p class="text-sm text-gray-600">
              Ensure your account is using a long, random password to stay secure.
            </p>
          </div>

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

        <div class="flex items-center justify-end">
          <primary-button @click="updateProfile">
            Save changes
          </primary-button>
        </div>
      </div>

      <div class="p-6 bg-white rounded shadow">
        <div class="mb-6 pb-6 border-b">
          <div class="mb-6 space-y-2">
            <h2 class="text-lg font-semibold">Delete account</h2>

            <p class="text-sm text-gray-600">
              Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
            </p>
          </div>
        </div>

        <div class="flex items-center justify-end">
          <danger-button @click="deleteAccount">
            Delete account
          </danger-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>