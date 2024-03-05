import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    getStudents as getStudentsApi,
    addStudent as addStudentApi, Student,
    getCourses as getCoursesApi,
    addCourse as addCourseApi,
    getResults as getResultsApi,
    addResult as addResultApi,
    deleteStudent as deleteStudentApi,
    deleteCourse as deleteCourseApi,
    Course,
    Result, CreatResultInput
} from "@/lib/apis";

export const getStudents = createAsyncThunk(
    'students/getStudents',
    async () => {
      return getStudentsApi();
    }
)

export const addStudent = createAsyncThunk(
    'students/addStudent',
    async (student: Student) => {
      return addStudentApi(student);
    }
)

export const getCourses = createAsyncThunk(
    'courses/getCourses',
    async () => {
      return getCoursesApi();
    }
)

export const addCourse = createAsyncThunk(
    'courses/addCourse',
    async (course: Course) => {
      return addCourseApi(course);
    }
)

export const getResults = createAsyncThunk(
    'results/getResults',
    async () => {
      return getResultsApi();
    }
)

export const addResult = createAsyncThunk(
    'results/addResult',
    async (result: CreatResultInput) => {
      return addResultApi(result);
    }
)

export const deleteStudent = createAsyncThunk(
    'students/deleteStudent',
    async (id: string) => {
      return deleteStudentApi(id);
    }
)

export const deleteCourse = createAsyncThunk(
    'courses/deleteCourse',
    async (id: string) => {
      return deleteCourseApi(id);
    }
)