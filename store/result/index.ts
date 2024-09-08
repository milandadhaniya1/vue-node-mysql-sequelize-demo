import { defineStore } from 'pinia';
import { ref } from 'vue';
import axiosInstance from '@src/services/axios';

interface ResultSummary {
  exam_id: number,
  exam_code: string,
  exam_title: string,
  student_id: number,
  student_enrollment_id: number,
  student_name: string,
  total: number,
  score: number,
  percentage: number,
  grade: string
};
interface Result {
  data: ResultSummary[]
}

interface ResultDetail {
  id: number,
  student_id: number,
  exam_id: number,
  subject_id: number,
  subject: {
    name: string
  },
  total: number,
  score: number
};
interface ResultDetails {
  data: ResultDetail[]
}

export const useResultsStore = defineStore('ResultsStore', () => {
  const results = ref<Result>({
    data: []
  });
  const resultDetails = ref<ResultDetails>({
    data: []
  });

  const getResultSummary = async (id?:number) => {
    let params = {};
    if (id) {
      params = {
        student_id: id
      };
    }
    const response = await axiosInstance.get('/result', {
      params: {
        ...params
      }
    });
    results.value = {
      data: response.data as ResultSummary[]
    };
  };

  const getResultDetails = async (student_id: number, exam_id: number) => {
    if (!student_id || !exam_id) { return false; }

    const params = {
      student_id,
      exam_id
    };
    const response = await axiosInstance.get('/result/details', {
      params: {
        ...params
      }
    });
    resultDetails.value = {
      data: response.data as ResultDetail[]
    };
  };

  const updateOrCreateResult = async (formData: {
    subject_id: number;
    total: number;
    obtained: number;
    student_id: number;
    exam_id: number;
  }) => {
    const response = await axiosInstance.post('/result/update', {
      ...formData
    });
    return response;
  };

  const deleteResult = async (formData: {
    subject_id: number;
    student_id: number;
    exam_id: number;
  }) => {
    const response = await axiosInstance.post('/result/delete', {
      ...formData
    });
    return response;
  };

  return {
    results,
    resultDetails,
    getResultSummary,
    getResultDetails,
    updateOrCreateResult,
    deleteResult
  };
});
