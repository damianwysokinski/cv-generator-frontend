<script setup lang="ts">
import { useDocumentStore } from "~/stores/document";

const documentStore = useDocumentStore();
</script>

<template>
  <div id="preview" class="max-w-2xl mx-auto h-full max-h-[800px] bg-white rounded">
    <div class="flex grow h-full">
      <div class="p-4 flex-[3_1_0%] border-r">

      </div>
      <div class="p-4 flex-[7_1_0%]">

      </div>
    </div>
  </div>
</template>