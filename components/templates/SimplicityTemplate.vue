<script setup lang="ts">
import { useDocumentStore } from "~/stores/document";

const documentStore = useDocumentStore();
</script>

<template>
  <div class="max-w-[774px] mx-auto h-full">
    <div id="previewDocument" class="bg-white h-[1092px]" style="letter-spacing: 0.01px;">
      <div class="flex grow h-full">
        <div class="p-4 flex-[3_1_0%]">

        </div>
        <div class="p-4 flex-[7_1_0%]">

        </div>
      </div>
    </div>
  </div>
</template>