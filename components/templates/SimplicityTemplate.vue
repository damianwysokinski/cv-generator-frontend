<script setup lang="ts">
import { useDocumentStore } from "~/stores/document";

const documentStore = useDocumentStore();
const { document } = storeToRefs(documentStore);
</script>

<template>
  <div class="max-w-[774px] mx-auto h-full" ref="test">
    <div id="previewDocument">
      <div v-if="document" class="bg-white h-[1092px]" style="font-family: Poppins, sans-serif; letter-spacing: 0.01px;">
        <div class="h-full">
          <div class="py-6 px-8">
            <div>
              <div class="mb-2 font-bold text-3xl">{{ document.personalInfo.firstName }} {{ document.personalInfo.lastName }}</div>
              <div class="text-xl">{{ document.personalInfo.position }}</div>
              <div class="my-6 grid grid-cols-2">
                <div v-if="document.personalInfo.email">
                  <span class="font-bold">Email</span> {{ document.personalInfo.email }}
                </div>
                <div v-if="document.personalInfo.phoneNumber">
                  <span class="font-bold">Phone number</span> {{ document.personalInfo.phoneNumber }}
                </div>
              </div>
              <div v-html="document.summary"></div>
            </div>
            <div v-if="document.experience?.length" class="my-6">
              <div class="mb-2 font-bold text-xl">Experience</div>
              <div>
                <div v-for="({ position, companyName, city, description }, index) in document.experience" :key="index" class="mb-4">
                  <div class="mb-2 font-bold">{{ position }}</div>
                  <div class="mb-2">{{ companyName }}{{ city && `, ${city}` }}</div>
                  <div v-html="description"></div>
                </div>
              </div>
            </div>
            <div v-if="document.skills?.length" class="my-6">
              <div class="mb-2 font-bold text-xl">Skills</div>
              <div>
                <div v-for="({ skill }, index) in document.skills" :key="index">
                  <div>{{ skill }}</div>
                </div>
              </div>
            </div>
            <div v-if="document.courses?.length" class="my-6">
              <div class="mb-2 font-bold text-xl">Courses</div>
              <div>
                <div v-for="({ name }, index) in document.courses" :key="index" class="mb-4">
                  <div class="mb-2 font-bold">{{ name }}</div>
                </div>
              </div>
            </div>
            <div v-if="document.projects?.length" class="my-6">
              <div class="mb-2 font-bold text-xl">Projects</div>
              <div>
                <div v-for="({ name, role, description }, index) in document.projects" :key="index" class="mb-4">
                  <div class="mb-2 font-bold">{{ name }}</div>
                  <div class="mb-2">{{ role }}</div>
                  <div v-html="description"></div>
                </div>
              </div>
            </div>
            <div v-if="document.languages?.length" class="my-6">
              <div class="mb-2 font-bold text-xl">Languages</div>
              <div>
                <div v-for="({ language }, index) in document.languages" :key="index">
                  <div>{{ language }}</div>
                </div>
              </div>
            </div>
            <div v-if="document.certificates?.length" class="my-6">
              <div class="mb-2 font-bold text-xl">Certificates</div>
              <div>
                <div v-for="({ name }, index) in document.certificates" :key="index">
                  <div class="font-bold">{{ name }}</div>
                </div>
              </div>
            </div>
            <div v-if="document.interests" class="my-6">
              <div class="mb-2 font-bold text-xl">Interests</div>
              <div v-html="document.interests"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>