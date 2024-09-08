import { defineStore } from 'pinia';
import { ref } from 'vue';
import axiosInstance from '@src/services/axios';

interface Student {
  id: number;
  first_name: string;
  last_name?: string;
  phone_no: string;
  enrollment_id: number;
};
interface AllStudents {
  data: Student[];
  total: number;
};

export const useStudentsStore = defineStore('StudentsStore', () => {
  const allStudents = ref<AllStudents>({
    data: [],
    total: 0
  });

  const fetchStudents = async () => {
    const response = await axiosInstance.get<Student[]>('/students');
    allStudents.value = {
      data: response.data,
      total: (response.data || []).length
    };
  };

  return {
    allStudents,
    fetchStudents
  };
});
