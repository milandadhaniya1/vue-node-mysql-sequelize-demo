<script setup lang="ts">
import { onMounted, computed, watch, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useStudentsStore } from "@store/student/index";
import { useExamsStore } from "@store/exam/index";
import { useSubjectsStore } from "@store/subject/index";
import { useResultsStore } from "@store/result/index";
import { useRouter, useRoute } from 'vue-router';

const studentsStore = useStudentsStore();
const examsStore = useExamsStore();
const subjectsStore = useSubjectsStore();
const resultsStore = useResultsStore();
const { allStudents } = storeToRefs(studentsStore);
const { exams } = storeToRefs(examsStore);
const { subjects } = storeToRefs(subjectsStore);
const { resultDetails } = storeToRefs(resultsStore);
const router = useRouter();
const route = useRoute();
const params = computed(() => route?.query);

const selectedStudentId = computed({
  get() {
    return params.value?.student_id || '';
  },
  set(newValue) {
    newValue && selectExam(Number(newValue), Number(selectedExamId.value));
  }
});

const selectedExamId = computed({
  get() {
    return params.value?.exam_id || '';
  },
  set(newValue) {
    newValue && selectExam(Number(selectedStudentId.value), Number(newValue));
  }
});

const selectExam = (student_id: number, exam_id: number) => {
  router.push({
    path: '/edit-results',
    query: {
      ...route.query,
      student_id: student_id || '',
      exam_id: exam_id || ''
    }
  });
};

const fetchResultDetails = async (studentId: number, examId: number) => {
  if (studentId && examId) {
    await resultsStore.getResultDetails(studentId, examId);
  }
};

const formData = ref({
  subject_id: 0,
  total: 0,
  obtained: 0
});

const resetForm = () => {
  formData.value.subject_id = 0;
  formData.value.total = 0;
  formData.value.obtained = 0;
};

const isSaveButtonEnabled = computed(() => formData.value.subject_id && formData.value.total && formData.value.obtained);

const saveResult = async () => {
  await resultsStore.updateOrCreateResult({
    student_id: Number(selectedStudentId.value),
    exam_id: Number(selectedExamId.value),
    ...formData.value
  });
  resetForm();
  await fetchResultDetails(Number(selectedStudentId.value), Number(selectedExamId.value));
};

const editResult = (result: { subject_id: number; total: number; obtained: number; }) => {
  formData.value.subject_id = result.subject_id;
  formData.value.total = result.total;
  formData.value.obtained = result.obtained;
};

const deleteResult = async (subject_id: number) => {
  await resultsStore.deleteResult({
    student_id: Number(selectedStudentId.value),
    exam_id: Number(selectedExamId.value),
    subject_id: Number(subject_id)
  });
  await fetchResultDetails(Number(selectedStudentId.value), Number(selectedExamId.value));
};

onMounted(async () => {
  await studentsStore.fetchStudents();
  await examsStore.getExamsList();
  await fetchResultDetails(Number(selectedStudentId.value), Number(selectedExamId.value));
  await subjectsStore.getSubjectsList();
});

watch(
  () => [selectedStudentId.value, selectedExamId.value],
  async ([newStudentId, newExamId]) => {
    // Fetch results
    if (newStudentId && newExamId) {
      await fetchResultDetails(Number(newStudentId), Number(newExamId));
    }
    // Reset form
    resetForm();
  }
);
</script>
<template>
  <div class="border-base-300 border">
    <a
      href="/results" 
      class="btn btn-outline btn-info m-2 text-2xl"
      title="Back"
    >
      &#128281;
    </a>
    <details
      class="collapse bg-base-200 mb-2"
      open
    >
      <summary class="collapse-title text-xl font-medium">
        Filters
      </summary>
      <div class="collapse-content">
        <div class="grid grid-cols-2 md:grid-cols-4">
          <label class="form-control max-w-xs">
            <div class="label">
              <span class="label-text">Select Student</span>
            </div>
            <select
              v-model="selectedStudentId"
              class="select select-bordered"
            >
              <option
                v-for="student in allStudents.data"
                :key="student.enrollment_id"
                :value="student.id"
                :selected="String(student.id) === String(selectedStudentId)"
              >{{ student.first_name }} {{ student.last_name }}</option>  
            </select>
          </label>
          <label class="form-control max-w-xs ml-2">
            <div class="label">
              <span class="label-text">Select Exam</span>
            </div>
            <select
              v-model="selectedExamId"
              class="select select-bordered"
            >
              <option
                v-for="exam in exams.data"
                :key="exam.exam_code"
                :value="exam.id"
                :selected="String(exam.id) === String(selectedExamId)"
              >{{ exam.title }}</option>  
            </select>
          </label>
        </div>
      </div>
    </details>
    <div class="border-base-300 border-t px-4 py-4 w-full">
      <div
        v-if="selectedStudentId && selectedExamId"
        class="overflow-x-auto grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div class="w-full">
          <table class="table table-zebra w-full border rounded">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Total</th>
                <th>Obtained</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="(resultDetails.data || []).length > 0">
                <tr
                  v-for="result in resultDetails.data"
                  :key="`${result.student_id}-${result.exam_id}`"
                >
                  <td>{{ result.subject?.name }}</td>
                  <td>{{ result.total }}</td>
                  <td>{{ result.score }}</td>
                  <td>
                    <span
                      class="text-blue-600 cursor-pointer text-2xl"
                      title="Edit"
                      @click="editResult({
                        subject_id: result.subject_id,
                        total: result.total,
                        obtained: result.score
                      })"
                    >
                      &#9997;
                    </span>
                    <span
                      class="ml-2 text-red-600 cursor-pointer text-2xl"
                      title="Delete"
                      @click="deleteResult(result.subject_id)"
                    >
                      &#9940;
                    </span>
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td
                    colspan="3"
                    class="text-center"
                  >
                    No Data Available
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div class="w-full">
          <div class="space-y-12">
            <div class="border p-4">
              <h2 class="font-bold text-gray-900 border-b pb-2">
                Add Result
              </h2>
              
              <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-2">
                <div class="col-span-full">
                  <label class="form-control ml-2">
                    <div class="label">
                      <span class="label-text">Select Subject</span>
                    </div>
                    <select
                      v-model="formData.subject_id"
                      class="select select-bordered"
                    >
                      <option
                        v-for="subject in subjects.data"
                        :key="subject.name"
                        :value="subject.id"
                      >{{ subject.name }}</option>  
                    </select>
                  </label>
                </div>
                <div class="col-span-full">
                  <label class="form-control ml-2">
                    <div class="label">
                      <span class="label-text">Total</span>
                    </div>
                    <input
                      v-model="formData.total"
                      type="number"
                      class="input input-bordered w-full"
                    >
                  </label>
                </div>
                <div class="col-span-full">
                  <label class="form-control ml-2">
                    <div class="label">
                      <span class="label-text">Obtained</span>
                    </div>
                    <input
                      v-model="formData.obtained"
                      type="number"
                      class="input input-bordered w-full"
                    >
                  </label>
                </div>
                <div class="col-span-full mt-6 flex gap-2 w-full pl-2">
                  <button
                    class="btn btn-neutral"
                    @click="resetForm"
                  >
                    Cancel
                  </button>
                  <button
                    class="btn btn-success text-white"
                    :disabled="!isSaveButtonEnabled"
                    @click="saveResult"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <span class="text-red-600">Please select Student and Exam to continue..</span>
      </div>
    </div>
  </div>
</template>
