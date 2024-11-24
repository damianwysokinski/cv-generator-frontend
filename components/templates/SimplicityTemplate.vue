<script setup lang="ts">

</script>

<template>
  <div class="h-full">
    <div class="py-6 px-8">
      <div>
        <div class="mb-6 flex">
          <div>
            <div class="mb-2 font-bold text-3xl">
              <slot name="fullName"></slot>
            </div>
            <div class="text-xl">
              <slot name="position"></slot>
            </div>
            <div class="mt-6 grid gap-4 grid-cols-2">
              <div>
                <slot name="email"></slot>
              </div>
              <div>
                <slot name="phoneNumber"></slot>
              </div>
            </div>
          </div>
        </div>
        <slot name="summary"></slot>
      </div>
      <div v-if="$slots.experience" class="my-6">
        <div class="mb-2 font-bold text-xl">Experience</div>
        <div>
          <slot name="experience"></slot>
        </div>
      </div>
      <div v-if="$slots.skills" class="my-6">
        <div class="mb-2 font-bold text-xl">Skills</div>
        <div>
          <slot name="skills"></slot>
        </div>
      </div>
      <div v-if="$slots.courses" class="my-6">
        <div class="mb-2 font-bold text-xl">Courses</div>
        <div>
          <slot name="courses"></slot>
        </div>
      </div>
      <div v-if="$slots.projects" class="my-6">
        <div class="mb-2 font-bold text-xl">Projects</div>
        <div>
          <slot name="projects"></slot>
        </div>
      </div>
      <div v-if="$slots.languages" class="my-6">
        <div class="mb-2 font-bold text-xl">Languages</div>
        <div>
          <slot name="languages"></slot>
        </div>
      </div>
      <div v-if="$slots.certificates" class="my-6">
        <div class="mb-2 font-bold text-xl">Certificates</div>
        <div>
          <slot name="certificates"></slot>
        </div>
      </div>
      <div v-if="$slots.interests" class="my-6">
        <div class="mb-2 font-bold text-xl">Interests</div>
        <slot name="interests"></slot>
      </div>
    </div>
  </div>
</template>