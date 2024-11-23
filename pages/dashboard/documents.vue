<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { useDocumentStore } from "~/stores/document";

import PrimaryButton from "~/components/PrimaryButton.vue";

definePageMeta({
  layout: 'dashboard',
  middleware: ["auth"]
})

const { user } = useAuthStore();
const documentStore = useDocumentStore();

const createDocument = async () => {
  await documentStore.createDocument(user.id);

  await navigateTo(`/resume/${documentStore.document.id}`);
}

const removeDocument = async (id: string) => {
  await documentStore.removeDocument(id);
}

const formatDate = (updatedAt: string) => {
  const timestamp = parseInt(updatedAt, 10);
  const date = new Date(timestamp);

  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

documentStore.getDocuments();
</script>

<template>
  <div class="mx-auto max-w-screen-xl">
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Documents</h1>

      <primary-button @click="createDocument">
        + Create document
      </primary-button>
    </div>

    <div class="p-4 bg-white rounded shadow">
      <div v-if="documentStore.documents.length" class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div
            v-for="({ id, title, updatedAt }, index) in documentStore.documents"
            :key="index"
            class="p-4 border rounded hover:shadow hover:border-slate-950"
        >
          <NuxtLink :to="{ name: 'resume-id', params: { id } }">
            <div class="mb-4 flex items-center justify-between">
              <p class="font-semibold">{{ title }}</p>
              <button @click.prevent="removeDocument(id)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </div>
            <div class="text-right">
              <div class="text-gray-600 text-sm">Edited:</div>
              <div>{{ formatDate(updatedAt) }}</div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <p v-else>No documents found.</p>
    </div>
  </div>
</template>
