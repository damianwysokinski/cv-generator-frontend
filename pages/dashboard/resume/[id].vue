<script setup lang="ts">
import CVTemplateOne from '@/components/templates/CVTemplateOne.vue';
import PanelComp from "~/components/dashboard/PanelComp.vue";
import DangerButton from "~/components/DangerButton.vue";
import PrimaryButton from "~/components/PrimaryButton.vue";

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
  <div>
    <div class="min-h-screen grid xl:grid-cols-[minmax(450px,_0.5fr)_1fr] items-start">
      <div class="relative h-full xl:h-screen xl:overflow-y-scroll xl:pt-[57px] bg-white flex flex-col justify-between">
        <div>
          <panel-comp title="Personal Information"></panel-comp>
          <panel-comp title="Summary"></panel-comp>
          <panel-comp title="Work history"></panel-comp>
          <panel-comp title="Languages"></panel-comp>
          <panel-comp title="Skills"></panel-comp>
          <panel-comp title="Courses"></panel-comp>
          <panel-comp title="Projects"></panel-comp>
          <panel-comp title="Languages"></panel-comp>
          <panel-comp title="Certificates"></panel-comp>
          <panel-comp title="Interests"></panel-comp>
        </div>

        <div class="fixed md:sticky right-0 bottom-0 left-0 flex items-center justify-between py-4 px-6 shadow-2xl bg-white">
          <danger-button @click="removeDocument">
            Remove CV
          </danger-button>
          <primary-button @click="updateDocument">
            Save CV
          </primary-button>
        </div>
      </div>

      <div class="-order-1 xl:order-1 pt-20 pb-6 px-6 xl:h-screen">
        <component :is="selectedTemplate.component" />
      </div>
    </div>
  </div>
</template>