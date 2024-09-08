<script setup>
import { storeToRefs } from 'pinia';
import { useStudentsStore } from "@store/student/index";
const studentsStore = useStudentsStore();
const { allStudents } = storeToRefs(studentsStore);
</script>

<template>
  <div class="flex flex-col items-center gap-6 xl:flex-row justify-center mx-auto my-auto min-h-[100vh]">
    <div class="card bg-base-200 w-80">
      <div class="card-body">
        <div class="font-title font-bold mx-auto text-3xl">
          Students
        </div>
        <div class="stats shadow">
          <div class="stat">
            <div class="stat-title mx-auto">
              Total Students
            </div>
            <div class="stat-value mx-auto">
              {{ allStudents.total }}
            </div>
          </div>
        </div>
        <a
          href="/students" 
          class="btn btn-neutral mt-1"
        >
          View Students
        </a>
      </div>
    </div>
  </div>
</template>
