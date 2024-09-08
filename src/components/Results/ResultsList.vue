<script setup lang="ts">
import { onMounted, computed, watch, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useStudentsStore } from "@store/student/index";
import { useResultsStore } from "@store/result/index";
import { useRouter, useRoute } from 'vue-router';
import logger from '@utils/logger';
import ExamResult from './ExamResult.vue';

const studentsStore = useStudentsStore();
const resultsStore = useResultsStore();
const { allStudents } = storeToRefs(studentsStore);
const { results } = storeToRefs(resultsStore);
const router = useRouter();
const route = useRoute();
const params = computed(() => route?.query);
const examResultModalRef = ref();
const modalData = ref<{
  studentId: number | null,
  examId: number | null,
  studentName: string,
  examTitle: string
}>({
  studentId: null,
  examId: null,
  studentName: '',
  examTitle: ''
});

const selectedStudentId = computed({
  get() {
    return params.value?.student_id || '';
  },
  set(newValue) {
    selectStudent(Number(newValue));
  }
});

const selectStudent = (id: number) => {
  router.push({
    path: '/results',
    query: {
      student_id: id || ''
    }
  });
};

const openDetailsModal = (result: { student_id: number, exam_id: number, student_name:string, exam_title:string }) => {
  logger.log({ title:'Student Details -> ', msg: {student_id: result.student_id, exam_id: result.exam_id} });
   new Promise((resolve) => {
    modalData.value.studentId = result.student_id;
    modalData.value.examId = result.exam_id;
    modalData.value.studentName = result.student_name;
    modalData.value.examTitle = result.exam_title;
    resolve(true);
  }).then(() => examResultModalRef.value?.show());
};

const redirectToEditResult = (student_id: number, exam_id?: number) => {
  router.push({
    path: '/edit-results',
    query: {
      student_id: student_id,
      exam_id: exam_id || ''
    }
  });
};

onMounted(async () => {
  await studentsStore.fetchStudents();
  await resultsStore.getResultSummary(Number(params.value?.student_id));
});

watch(
  () => selectedStudentId.value,
  (value) => {
    // Fetch results
    resultsStore.getResultSummary(Number(value));
  }
);
</script>
<template>
  <div class="border-base-300 border">
    <a
      href="/students" 
      class="btn btn-outline btn-info m-2 text-2xl"
      title="Back"
    >
      &#128281;
    </a>
    <a
      :href="`/edit-results?student_id=${selectedStudentId}`"
      class="btn btn-outline btn-success text-white m-2 text-2xl"
    >
      &#10133;
    </a>
    <details
      class="collapse bg-base-200 mb-2"
      open
    >
      <summary class="collapse-title text-xl font-medium">
        Filters
      </summary>
      <div class="collapse-content">
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">Select Student</span>
          </div>
          <select
            v-model="selectedStudentId"
            class="select select-bordered"
          >
            <option
              value=""
              :selected="(params?.student_id || '') === ''"
            >All Students</option>  
            <option
              v-for="student in allStudents.data"
              :key="student.enrollment_id"
              :value="student.id"
              :selected="String(student.id) === String(selectedStudentId)"
            >{{ student.first_name }} {{ student.last_name }}</option>  
          </select>
        </label>
      </div>
    </details>
    <div class="border-base-300 flex justify-center border-t px-4 py-4">
      <div class="overflow-x-auto w-full">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>Exam Title</th>
              <th>Student Enrollment Id</th>
              <th>Student Name</th>
              <th>Total Marks</th>
              <th>Score</th>
              <th>Percentage</th>
              <th>Grade</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="(results.data || []).length > 0">
              <tr
                v-for="result in results.data"
                :key="`${result.student_id}-${result.exam_id}`"
              >
                <td>{{ result.exam_title }}</td>
                <td>{{ result.student_enrollment_id }}</td>
                <td>{{ result.student_name }}</td>
                <td>{{ result.total }}</td>
                <td>{{ result.score }}</td>
                <td>{{ result.percentage }}</td>
                <td>{{ result.grade }}</td>
                <td>
                  <span
                    class="cursor-pointer text-2xl"
                    title="View"
                    @click="openDetailsModal(result)"
                  >
                    &#128065;
                  </span>
                  <span
                    class="cursor-pointer text-2xl ml-2"
                    title="Edit"
                    @click="redirectToEditResult(result.student_id, result.exam_id)"
                  >
                    &#9997;
                  </span>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td
                  colspan="8"
                  class="text-center"
                >
                  No Data Available
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <ExamResult
          ref="examResultModalRef"
          :student-id="modalData.studentId"
          :exam-id="modalData.examId"
          :student-name="modalData.studentName"
          :exam-title="modalData.examTitle"
        />
      </div>
    </div>
  </div>
</template>
