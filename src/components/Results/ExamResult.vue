<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useResultsStore } from "@store/result/index";

const resultsStore = useResultsStore();
const { resultDetails } = storeToRefs(resultsStore);

const props = defineProps< {
  studentId: number | null,
  examId: number | null,
  studentName: string,
  examTitle: string,
} >();

const selectedStudentId = computed(() => props.studentId);
const selectedExamId = computed(() => props.examId);
const examResultModalRef = ref();
const showModal = async () => {
  examResultModalRef?.value?.show();
  if (selectedStudentId.value && selectedExamId.value) {
    await resultsStore.getResultDetails(selectedStudentId.value, selectedExamId.value);
  }
};
defineExpose({ show: showModal });
</script>
<template>
  <dialog
    ref="examResultModalRef"
    class="modal bg-[#0006]"
  >
    <div class="modal-box">
      <form
        method="dialog"
      >
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h3 class="text-lg font-bold">
        {{ studentName }} - {{ examTitle }}
      </h3>
      <div>
        <div class="overflow-x-auto w-full">
          <table class="table table-zebra w-full mt-4">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Total</th>
                <th>Obtained</th>
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
      </div>
    </div>
  </dialog>
</template>
