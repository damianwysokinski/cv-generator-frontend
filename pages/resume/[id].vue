<script setup lang="ts">
import PrimaryButton from "~/components/PrimaryButton.vue";
import ResumeEditor from "~/components/dashboard/resume/ResumeEditor.vue";
import ResumePreview from "~/components/dashboard/resume/ResumePreview.vue";

import jsPDF from 'jspdf';

import poppinsRegular from '@/assets/fonts/poppins/Poppins-Regular-normal.js';
import poppinsBold from '@/assets/fonts/poppins/Poppins-Bold-normal.js';

import { useAuthStore } from "~/stores/auth";
import { useDocumentStore } from "~/stores/document";

definePageMeta({
  layout: 'document',
  middleware: ["auth"]
})

const route = useRoute();
const documentId = route.params.id;

const authStore = useAuthStore();
const documentStore = useDocumentStore();

const isAuthPopupOpen = ref(false);

const handleAuthPopupVisibility = () => {
  isAuthPopupOpen.value = !isAuthPopupOpen.value;
};

const downloadDocument = async () => {
  if (!authStore.isLoggedIn) {
    return handleAuthPopupVisibility();
  }

  await updateDocument();

  const cvPreview = document.getElementById("previewDocument");

  if (!cvPreview) return;

  const doc = new jsPDF({
    orientation: "p",
    unit: "px",
    format: "a4",
    putOnlyUsedFonts: true,
  })

  doc.addFileToVFS("Poppins-Regular.ttf", poppinsRegular);
  doc.addFileToVFS("Poppins-Bold.ttf", poppinsBold);

  doc.addFont("Poppins-Regular.ttf", "Poppins", "normal");
  doc.addFont("Poppins-Bold.ttf", "Poppins", "bold");

  doc.setFont("Poppins", "normal")

  const width = doc.internal.pageSize.getWidth();

  doc.html(cvPreview, {
    callback: function (doc) {
      doc.save(`${documentId}.pdf`);
    },
    x: 0,
    y: 0,
    width: width,
    windowWidth: 774,
  })
};

const updateDocument = async () => {
  await documentStore.updateDocument();
};

documentStore.getDocument(documentId);
</script>

<template>
  <div>
    <div class="min-h-screen grid xl:grid-cols-[minmax(0,_450px)_1fr] items-start">
      <div class="relative h-full xl:h-screen xl:overflow-y-scroll xl:pt-[57px] bg-white flex flex-col justify-between">
        <resume-editor />

        <div class="fixed md:sticky right-0 bottom-0 left-0 flex items-center justify-between py-4 px-6 border-t bg-white">
          <div></div>
          <primary-button @click="downloadDocument">
            Export (PDF)
          </primary-button>
        </div>
      </div>

      <div class="-order-1 xl:order-1 pt-20 pb-6 px-6 xl:h-screen overflow-y-scroll">
        <resume-preview />
      </div>
    </div>
  </div>
</template>