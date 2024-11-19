<script setup lang="ts">
import TiptapEditor from "~/components/dashboard/TiptapEditor.vue";
import PanelComp from "~/components/dashboard/PanelComp.vue";
import { useDocumentStore } from "~/stores/document";

const documentStore = useDocumentStore();
const { document } = storeToRefs(documentStore);

const removeItem = (name: string, id: number) => {
  document.value[name].splice(id, 1);
}

const addItem = (name: string) => {
  document.value[name].push({});
}
</script>

<template>
  <div>
    <panel-comp title="Personal Information">
      <div class="p-4 border">
        <div class="mb-4 grid grid-cols-2 gap-4">
          <div>
            <input-label for="personal_first_name">First Name</input-label>
            <text-input
                v-model="document.personalInfo.firstName"
                id="personal_first_name"
                type="text"
                placeholder=""
                required
            />
          </div>

          <div>
            <input-label for="personal_last_name">Last Name</input-label>
            <text-input
                v-model="document.personalInfo.lastName"
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
              v-model="document.personalInfo.position"
              id="personal_position"
              type="text"
              placeholder=""
              required
          />
        </div>
        <div class="mb-4">
          <input-label for="personal_email">E-mail</input-label>
          <text-input
              v-model="document.personalInfo.email"
              id="personal_email"
              type="email"
              placeholder=""
              required
          />
        </div>
        <div>
          <input-label for="personal_phone">Phone number</input-label>
          <text-input
              v-model="document.personalInfo.phoneNumber"
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
            v-model="document.summary"
        />
      </div>
    </panel-comp>
    <panel-comp title="Work history">
      <div v-for="(experience, index) in document.experience" :key="index" class="mb-4 p-4 border">
        <div class="mb-4">
          <div class="flex items-center justify-between">
            <input-label :for="`experience_position_${index}`">Position</input-label>
            <button @click="removeItem('experience', index)" class="mb-2 text-red-600">remove</button>
          </div>
          <text-input
              v-model="document.experience[index].position"
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
              v-model="document.experience[index].companyName"
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
              v-model="document.experience[index].city"
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
              v-model="document.experience[index].description"
          />
        </div>
      </div>
      <button @click="addItem('experience')" class="block ml-auto text-blue-600 dark:text-blue-600">+ add item</button>
    </panel-comp>
    <panel-comp title="Skills">
      <div>
        <div v-for="(skill, index) in document.skills" :key="index">
          <div class="mb-4 p-4 border">
            <div class="flex items-center justify-between">
              <input-label :for="`skill_${index}`">Skill</input-label>
              <button @click="removeItem('skills', index)" class="mb-2 text-red-600">remove</button>
            </div>
            <text-input
                v-model="document.skills[index].skill"
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
        <div v-for="(course, index) in document.courses" :key="index">
          <div class="mb-4 p-4 border">
            <div class="mb-4">
              <div class="flex items-center justify-between">
                <input-label :for="`course_name_${index}`">Course name</input-label>
                <button @click="removeItem('courses', index)" class="mb-2 text-red-600">remove</button>
              </div>
              <text-input
                  v-model="document.courses[index].name"
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
                  v-model="document.courses[index].date"
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
        <div v-for="(project, index) in document.projects" :key="index">
          <div class="mb-4 p-4 border">
            <div class="mb-4">
              <div class="flex items-center justify-between">
                <input-label :for="`project_name_${index}`">Project name</input-label>
                <button @click="removeItem('projects', index)" class="mb-2 text-red-600">remove</button>
              </div>
              <text-input
                  v-model="document.projects[index].name"
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
                  v-model="document.projects[index].role"
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
                  v-model="document.projects[index].description"
              />
            </div>
          </div>
        </div>
        <button @click="addItem('projects')" class="block ml-auto text-blue-600 dark:text-blue-600">+ add item</button>
      </div>
    </panel-comp>
    <panel-comp title="Languages">
      <div>
        <div v-for="(language, index) in document.languages" :key="index">
          <div class="mb-4 p-4 border">
            <div class="flex items-center justify-between">
              <input-label :for="`language_${index}`">Language name</input-label>
              <button @click="removeItem('languages', index)" class="mb-2 text-red-600">remove</button>
            </div>
            <text-input
                v-model="document.languages[index].language"
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
        <div v-for="(certificate, index) in document.certificates" :key="index">
          <div class="mb-4 p-4 border">
            <div class="mb-4">
              <div class="flex items-center justify-between">
                <input-label :for="`certificate_name_${index}`">Certificate name</input-label>
                <button @click="removeItem('certificates', index)" class="mb-2 text-red-600">remove</button>
              </div>
              <text-input
                  v-model="document.certificates[index].name"
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
                  v-model="document.certificates[index].date"
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
            v-model="document.interests"
        />
      </div>
    </panel-comp>
  </div>
</template>