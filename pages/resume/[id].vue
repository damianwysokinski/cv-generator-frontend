<script setup lang="ts">
import PanelComp from "~/components/dashboard/PanelComp.vue";
import PrimaryButton from "~/components/PrimaryButton.vue";
import TiptapEditor from "~/components/dashboard/TiptapEditor.vue";
import ResumePreview from "~/components/dashboard/resume/ResumePreview.vue";

import jsPDF from 'jspdf';

import '~/assets/css/fonts.css';

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

const getDocument = async () => {
  await documentStore.getDocument(documentId);
}

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
  const height = doc.internal.pageSize.getHeight();

  doc.html(cvPreview, {
    callback: function (doc) {
      doc.save(`${documentId}.pdf`);
    },
    x: 0,
    y: 0,
    width: width,
    height: height,
    windowWidth: 774,
  })
};

const updateDocument = async () => {
  await documentStore.updateDocument();
};

const removeItem = (name: string, id: number) => {
  documentStore.document[name].splice(id, 1);
}

const addItem = (name: string) => {
  documentStore.document[name].push({});
}

getDocument();
</script>

<template>
  <div>
    <div class="min-h-screen grid xl:grid-cols-[minmax(450px,_0.5fr)_1fr] items-start">
      <div class="relative h-full xl:h-screen xl:overflow-y-scroll xl:pt-[57px] bg-white flex flex-col justify-between">
        <div>
          <panel-comp title="Personal Information">
            <div class="p-4 border">
              <div class="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <input-label for="personal_first_name">First Name</input-label>
                  <text-input
                      v-model="documentStore.document.personalInfo.firstName"
                      id="personal_first_name"
                      type="text"
                      placeholder=""
                      required
                  />
                </div>

                <div>
                  <input-label for="personal_last_name">Last Name</input-label>
                  <text-input
                      v-model="documentStore.document.personalInfo.lastName"
                      id="personal_last_name"
                      type="text"
                      placeholder=""
                      required
                  />
                </div>
              </div>
              <div class="mb-4">
                <input-label for="personal_position">Position</input-label>
                <text-input
                    v-model="documentStore.document.personalInfo.position"
                    id="personal_position"
                    type="text"
                    placeholder=""
                    required
                />
              </div>
              <div class="mb-4">
                <input-label for="personal_email">E-mail</input-label>
                <text-input
                    v-model="documentStore.document.personalInfo.email"
                    id="personal_email"
                    type="email"
                    placeholder=""
                    required
                />
              </div>
              <div>
                <input-label for="personal_phone">Phone number</input-label>
                <text-input
                    v-model="documentStore.document.personalInfo.phoneNumber"
                    id="personal_phone"
                    type="tel"
                    placeholder=""
                    required
                />
              </div>
            </div>
          </panel-comp>
          <panel-comp title="Summary">
            <div>
              <input-label for="summary"></input-label>
              <tiptap-editor
                  id="summary"
                  v-model="documentStore.document.summary"
              />
            </div>
          </panel-comp>
          <panel-comp title="Work history">
            <div v-for="(experience, index) in documentStore.document.experience" :key="index" class="mb-4 p-4 border">
              <div class="mb-4">
                <div class="flex items-center justify-between">
                  <input-label :for="`experience_position_${index}`">Position</input-label>
                  <button @click="removeItem('experience', index)" class="mb-2 text-red-600">remove</button>
                </div>
                <text-input
                    v-model="documentStore.document.experience[index].position"
                    :id="`experience_position_${index}`"
                    type="text"
                    placeholder=""
                    required
                />
              </div>
              <div class="mb-4">
                <div class="flex items-center justify-between">
                  <input-label :for="`experience_company_${index}`">Company name</input-label>
                </div>
                <text-input
                    v-model="documentStore.document.experience[index].companyName"
                    :id="`experience_company_${index}`"
                    type="text"
                    placeholder=""
                    required
                />
              </div>
              <div class="mb-4">
                <div class="flex items-center justify-between">
                  <input-label :for="`experience_city_${index}`">City</input-label>
                </div>
                <text-input
                    v-model="documentStore.document.experience[index].city"
                    :id="`experience_city_${index}`"
                    type="text"
                    placeholder=""
                    required
                />
              </div>
              <div class="mb-4">
                <div class="flex items-center justify-between">
                  <input-label :for="`experience_description_${index}`">Description</input-label>
                </div>
                <tiptap-editor
                    :id="`experience_description_${index}`"
                    v-model="documentStore.document.experience[index].description"
                />
              </div>
            </div>
            <button @click="addItem('experience')" class="block ml-auto text-blue-600 dark:text-blue-600">+ add item</button>
          </panel-comp>
          <panel-comp title="Skills">
            <div>
              <div v-for="(skill, index) in documentStore.document.skills" :key="index">
                <div class="mb-4 p-4 border">
                  <div class="flex items-center justify-between">
                      <input-label :for="`skill_${index}`">Skill</input-label>
                    <button @click="removeItem('skills', index)" class="mb-2 text-red-600">remove</button>
                  </div>
                  <text-input
                      v-model="documentStore.document.skills[index].skill"
                      :id="`skill_${index}`"
                      type="text"
                      placeholder=""
                      required
                  />
                </div>
              </div>
              <button @click="addItem('skills')" class="block ml-auto text-blue-600 dark:text-blue-600">+ add item</button>
            </div>
          </panel-comp>
          <panel-comp title="Courses">
            <div>
              <div v-for="(course, index) in documentStore.document.courses" :key="index">
                <div class="mb-4 p-4 border">
                  <div class="mb-4">
                    <div class="flex items-center justify-between">
                      <input-label :for="`course_name_${index}`">Course name</input-label>
                      <button @click="removeItem('courses', index)" class="mb-2 text-red-600">remove</button>
                    </div>
                    <text-input
                        v-model="documentStore.document.courses[index].name"
                        :id="`course_name_${index}`"
                        type="text"
                        placeholder=""
                        required
                    />
                  </div>
                  <div>
                    <div class="flex items-center justify-between">
                      <input-label :for="`course_date_${index}`">Course date</input-label>
                    </div>
                    <text-input
                        v-model="documentStore.document.courses[index].date"
                        :id="`course_date_${index}`"
                        type="text"
                        placeholder=""
                        required
                    />
                  </div>
                </div>
              </div>
              <button @click="addItem('courses')" class="block ml-auto text-blue-600 dark:text-blue-600">+ add item</button>
            </div>
          </panel-comp>
          <panel-comp title="Projects">
            <div>
              <div v-for="(project, index) in documentStore.document.projects" :key="index">
                <div class="mb-4 p-4 border">
                  <div class="mb-4">
                    <div class="flex items-center justify-between">
                      <input-label :for="`project_name_${index}`">Project name</input-label>
                      <button @click="removeItem('projects', index)" class="mb-2 text-red-600">remove</button>
                    </div>
                    <text-input
                        v-model="documentStore.document.projects[index].name"
                        :id="`project_name_${index}`"
                        type="text"
                        placeholder=""
                        required
                    />
                  </div>
                  <div class="mb-4">
                    <div class="flex items-center justify-between">
                      <input-label :for="`project_role_${index}`">Role</input-label>
                    </div>
                    <text-input
                        v-model="documentStore.document.projects[index].role"
                        :id="`project_role_${index}`"
                        type="text"
                        placeholder=""
                        required
                    />
                  </div>
                  <div class="mb-4">
                    <div class="flex items-center justify-between">
                      <input-label :for="`project_description_${index}`">Description</input-label>
                    </div>
                    <tiptap-editor
                        :id="`project_description_${index}`"
                        v-model="documentStore.document.projects[index].description"
                    />
                  </div>
                </div>
              </div>
              <button @click="addItem('projects')" class="block ml-auto text-blue-600 dark:text-blue-600">+ add item</button>
            </div>
          </panel-comp>
          <panel-comp title="Languages">
            <div>
              <div v-for="(language, index) in documentStore.document.languages" :key="index">
                <div class="mb-4 p-4 border">
                  <div class="flex items-center justify-between">
                    <input-label :for="`language_${index}`">Language name</input-label>
                    <button @click="removeItem('languages', index)" class="mb-2 text-red-600">remove</button>
                  </div>
                  <text-input
                      v-model="documentStore.document.languages[index].language"
                      :id="`language_${index}`"
                      type="text"
                      placeholder=""
                      required
                  />
                </div>
              </div>
              <button @click="addItem('languages')" class="block ml-auto text-blue-600 dark:text-blue-600">+ add item</button>
            </div>
          </panel-comp>
          <panel-comp title="Certificates">
            <div>
              <div v-for="(certificate, index) in documentStore.document.certificates" :key="index">
                <div class="mb-4 p-4 border">
                  <div class="mb-4">
                    <div class="flex items-center justify-between">
                      <input-label :for="`certificate_name_${index}`">Certificate name</input-label>
                      <button @click="removeItem('certificates', index)" class="mb-2 text-red-600">remove</button>
                    </div>
                    <text-input
                        v-model="documentStore.document.certificates[index].name"
                        :id="`certificate_name_${index}`"
                        type="text"
                        placeholder=""
                        required
                    />
                  </div>
                  <div class="mb-4">
                    <div class="flex items-center justify-between">
                      <input-label :for="`certificate_date_${index}`">Date</input-label>
                    </div>
                    <text-input
                        v-model="documentStore.document.certificates[index].date"
                        :id="`certificate_date_${index}`"
                        type="text"
                        placeholder=""
                        required
                    />
                  </div>
                </div>
              </div>
              <button @click="addItem('certificates')" class="block ml-auto text-blue-600 dark:text-blue-600">+ add item</button>
            </div>
          </panel-comp>
          <panel-comp title="Interests">
            <div>
              <input-label for="interests"></input-label>
              <tiptap-editor
                  id="interests"
                  v-model="documentStore.document.interests"
              />
            </div>
          </panel-comp>
        </div>

        <div class="fixed md:sticky right-0 bottom-0 left-0 flex items-center justify-between py-4 px-6 shadow-2xl bg-white">
          <div></div>
          <primary-button @click="downloadDocument">
            Export (PDF)
          </primary-button>
        </div>
      </div>

      <div class="-order-1 xl:order-1 pt-20 pb-6 px-6 xl:h-screen">
        <resume-preview />
      </div>
    </div>
  </div>
</template>