<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { useAuthStore } from "~/stores/auth";
import { useDocumentStore } from "~/stores/document";

definePageMeta({
  layout: 'dashboard',
  middleware: ["auth"]
})

const { user } = useAuthStore();
const documentStore = useDocumentStore();

const getDocuments = async () => {
  await documentStore.getDocuments(user.id);
}

const createDocument = async () => {
  await documentStore.createDocument(user.id);

  await navigateTo(`resume/${documentStore.document.id}`);
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

getDocuments();
</script>

<template>
  <div class="mx-auto max-w-screen-xl">
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Documents</h1>
      <button @click="createDocument" type="button" class="py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-zinc-950 rounded">+ Create document</button>
    </div>

    <div class="grid gap-4 lg:grid-cols-2">
      <div class="p-4 bg-white rounded shadow">
        <div v-if="documentStore.documents.length" class="grid gap-4">
          <div
              v-for="({ id, title, updatedAt }, index) in documentStore.documents"
              :key="index"
              class="p-4 border rounded hover:shadow hover:border-slate-950"
          >
            <NuxtLink :to="{ name: 'dashboard-resume-id', params: { id } }">
              <p class="font-semibold">{{ title }}</p>
              <div class="text-right">
                <div class="text-gray-600 text-sm">Edited:</div>
                <div>{{ formatDate(updatedAt) }}</div>
              </div>
            </NuxtLink>
          </div>
        </div>
        <p v-else>No documents found.</p>
      </div>
      <div class="p-4 bg-white rounded shadow"></div>
    </div>
  </div>
</template>
