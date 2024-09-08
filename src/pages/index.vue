<script setup lang="ts">
import { onMounted } from "vue";
import HomePageList from "@/src/components/Home/HomePageList.vue";
import { useStudentsStore } from "@store/student/index";
const studentsStore = useStudentsStore();

onMounted(async () => {
  await studentsStore.fetchStudents();
});
</script>

<template>
  <HomePageList />
</template>
