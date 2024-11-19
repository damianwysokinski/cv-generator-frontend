<script setup lang="ts">
import SimplicityTemplate from '@/components/templates/SimplicityTemplate.vue';
import { useDocumentStore } from "~/stores/document";
import '~/assets/css/fonts.css';

const templates = [
  { name: 'Simplicity', component: SimplicityTemplate }
];

const selectedTemplate = shallowRef(templates[0]);

const documentStore = useDocumentStore();
const { document } = storeToRefs(documentStore);
</script>

<template>
  <div class="max-w-[774px] mx-auto h-full">
    <div v-if="document" id="previewDocument">
      <div class="bg-white h-[1092px]" style="font-family: Poppins, sans-serif; letter-spacing: 0.01px;">
        <component :is="selectedTemplate.component">
          <template #fullName>
            {{ document.personalInfo.firstName }} {{ document.personalInfo.lastName }}
          </template>
          <template #position>
            {{ document.personalInfo.position }}
          </template>
          <template v-if="document.personalInfo.email" #email>
            <span class="font-bold">Email</span> {{ document.personalInfo.email }}
          </template>
          <template v-if="document.personalInfo.phoneNumber" #phoneNumber>
            <span class="font-bold">Phone number</span> {{ document.personalInfo.phoneNumber }}
          </template>
          <template #summary>
            <div v-html="document.summary"></div>
          </template>
          <template v-if="document.experience?.length" #experience>
            <div v-for="({ position, companyName, city, description }, index) in document.experience" :key="index" class="mb-4">
              <div class="mb-2 font-bold">{{ position }}</div>
              <div class="mb-2">{{ companyName }}{{ city && `, ${city}` }}</div>
              <div v-html="description"></div>
            </div>
          </template>
          <template v-if="document.skills?.length" #skills>
            <div v-for="({ skill }, index) in document.skills" :key="index">
              <div>{{ skill }}</div>
            </div>
          </template>
          <template v-if="document.courses?.length" #courses>
            <div v-for="({ name }, index) in document.courses" :key="index" class="mb-4">
              <div class="mb-2 font-bold">{{ name }}</div>
            </div>
          </template>
          <template v-if="document.projects?.length" #projects>
            <div v-for="({ name, role, description }, index) in document.projects" :key="index" class="mb-4">
              <div class="mb-2 font-bold">{{ name }}</div>
              <div class="mb-2">{{ role }}</div>
              <div v-html="description"></div>
            </div>
          </template>
          <template v-if="document.languages?.length" #languages>
            <div v-for="({ language }, index) in document.languages" :key="index">
              <div>{{ language }}</div>
            </div>
          </template>
          <template v-if="document.certificates?.length" #certificates>
            <div v-for="({ name }, index) in document.certificates" :key="index">
              <div class="font-bold">{{ name }}</div>
            </div>
          </template>
          <template v-if="document.interests" #interests>
            <div v-html="document.interests"></div>
          </template>
        </component>
      </div>
    </div>
  </div>
</template>

<style>
#previewDocument ul {
  @apply pl-5;
}
#previewDocument ul li {
  @apply relative;
}
#previewDocument ul li::before {
  @apply absolute -left-5 text-xl leading-5;
  content: "•";
}
</style>