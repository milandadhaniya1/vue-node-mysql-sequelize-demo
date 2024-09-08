import { defineStore } from 'pinia';
import { ref } from 'vue';
import axiosInstance from '@src/services/axios';

interface Subject {
  id: number,
  name: string
};
interface Subjects {
  data: Subject[]
}

export const useSubjectsStore = defineStore('SubjectsStore', () => {
  const subjects = ref<Subjects>({
    data: []
  });

  const getSubjectsList = async () => {
    const response = await axiosInstance.get('/subjects', {});
    subjects.value = {
      data: response.data as Subject[]
    };
  };

  return {
    subjects,
    getSubjectsList
  };
});
