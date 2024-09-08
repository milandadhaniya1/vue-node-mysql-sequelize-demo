import { defineStore } from 'pinia';
import { ref } from 'vue';
import axiosInstance from '@src/services/axios';

interface Exam {
  id: number,
  title: string,
  year: number,
  exam_code: string
};
interface Exams {
  data: Exam[]
}

export const useExamsStore = defineStore('ExamsStore', () => {
  const exams = ref<Exams>({
    data: []
  });

  const getExamsList = async () => {
    const response = await axiosInstance.get('/exams', {});
    exams.value = {
      data: response.data as Exam[]
    };
  };

  return {
    exams,
    getExamsList
  };
});
