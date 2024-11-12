<script setup lang="ts">
import AppSidebar from "~/components/dashboard/AppSidebar.vue";
import CVTemplateOne from '@/components/templates/CVTemplateOne.vue';
import InputLabel from "~/components/InputLabel.vue";
import TextInput from "~/components/TextInput.vue";

import { useDocumentStore } from "~/stores/document";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: 'document',
  middleware: ["auth"]
})

const route = useRoute();
const documentId = route.params.id;

const { user } = useAuthStore();
const documentStore = useDocumentStore();

const templates = [
  { name: 'Template One', component: CVTemplateOne }
];

const selectedTemplate = shallowRef(templates[0]);

const getDocument = async () => {
  await documentStore.getDocument(documentId);
}

const downloadDocument = async () => {

};

const updateDocument = async () => {
  await documentStore.updateDocument(
      documentStore.document.id,
      user.id,
      documentStore.document
  );
};

const removeDocument = async () => {
  await documentStore.removeDocument(documentStore.document.id);
  await navigateTo("/dashboard/documents");
};

getDocument();
</script>

<template>
  <div v-if="documentStore.document">
    <app-sidebar>
      <div>
        <div class="mb-5 font-medium text-gray-900">Personal Information</div>
        <div>
          <div class="mb-4">
            <input-label for="first_name">First Name</input-label>
            <text-input
                v-model="documentStore.document.firstName"
                id="first_name"
                type="text"
                placeholder="First Name"
                required
            />
          </div>
          <div class="mb-4">
            <input-label for="last_name">Last Name</input-label>
            <text-input
                v-model="documentStore.document.lastName"
                id="last_name"
                type="text"
                placeholder="Last Name"
                required
            />
          </div>
          <div class="mb-4">
            <input-label for="position">Position</input-label>
            <text-input
                v-model="documentStore.document.position"
                id="position"
                type="text"
                placeholder="Position"
                required
            />
          </div>
          <div class="mb-4">
            <input-label for="email">Email</input-label>
            <text-input
                v-model="documentStore.document.email"
                id="email"
                type="email"
                placeholder="Email"
                required
            />
          </div>
          <div class="mb-4">
            <input-label for="phone_number">Phone number</input-label>
            <text-input
                v-model="documentStore.document.phoneNumber"
                id="phone_number"
                type="tel"
                placeholder="Phone number"
                required
            />
          </div>
        </div>
      </div>

      <div class="mt-2 flex items-center justify-between">
        <button @click="removeDocument" class="text-red-600 bg-red-50 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded text-sm px-5 py-2.5 text-center">Remove CV</button>
        <button @click="updateDocument" class="text-white bg-zinc-950 focus:outline-none font-medium rounded text-sm px-5 py-2.5 text-center">Save CV</button>
      </div>
    </app-sidebar>
    <div class="mx-auto max-w-4xl shadow">
      <component :is="selectedTemplate.component" />
    </div>
  </div>
</template>

<style scoped>

</style>