<script setup lang="ts">
import { useDocumentStore } from "~/stores/document";

const documentStore = useDocumentStore();
</script>

<template>
  <div id="preview" class="bg-white rounded">
    <div class="flex grow h-full">
      <div class="p-4 flex-[3_1_0%] border-r">
        <div class="mb-4">
          <div class="font-bold">
            Personal Information
          </div>
          <div v-if="documentStore.document.email">
            <div>E-mail</div>
            <div>{{ documentStore.document.email }}</div>
          </div>
          <div v-if="documentStore.document.phoneNumber">
            <div>Phone number</div>
            <div>{{ documentStore.document.phoneNumber }}</div>
          </div>
        </div>
      </div>
      <div class="p-4 flex-[7_1_0%]">
        <div class="mb-4">
          <div class="font-bold">
            {{ documentStore?.document?.firstName }} {{ documentStore?.document?.lastName }}
          </div>
          <div>
            {{ documentStore?.document?.position }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>