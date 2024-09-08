<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useStudentsStore } from "@store/student/index";
import { onMounted } from 'vue';
const studentsStore = useStudentsStore();
const { allStudents } = storeToRefs(studentsStore);

onMounted(async () => {
  await studentsStore.fetchStudents();
});
</script>

<template>
  <div class="border-base-300 border">
    <a
      href="/" 
      class="btn btn-outline btn-info m-2 text-2xl"
      title="Back"
    >
      &#128281;
    </a>
    <div class="border-base-300 flex justify-center border-t px-4 py-4">
      <div class="overflow-x-auto w-full">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Enrollment No.</th>
              <th>Name</th>
              <th>Phone No.</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="student in allStudents.data"
              :key="student.enrollment_id"
            >
              <th>{{ student.enrollment_id }}</th>
              <td>{{ student.first_name }} {{ student.last_name }}</td>
              <td>{{ student.phone_no || '-' }}</td>
              <td>
                <router-link
                  :to="`/results?student_id=${student.id}`"
                  class="text-2xl"
                  title="View"
                >
                  &#128065;
                </router-link>
                <router-link
                  :to="`/edit-results?student_id=${student.id}`"
                  class="text-2xl ml-2"
                  title="Edit"
                >
                  &#9997;
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
