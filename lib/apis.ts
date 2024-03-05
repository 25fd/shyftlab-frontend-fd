import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['x-api-key'] = '5f4d3b3e-3f5d-4e3e-8f3f-3f4e3d2c1b0a';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'x-api-key': '5f4d3b3e-3f5d-4e3e-8f3f-3f4e3d2c1b0a',
    },
    });

export type Student = {
    _id?: string;
    firstName: string;
    familyName: string;
    email: string;
    dateOfBirth: string;
}

export type Course = {
    _id?: string;
    courseName: string;
}

export type CreatResultInput = {
    student: string;
    course: string;
    score: string;
}

export type Result = {
    _id?: string;
    student: Student;
    course: Course;
    score: string;
}

export const getStudents = () => {
  return axiosInstance.get('/students');
};

export const addStudent = (student: Student) => {
    return axiosInstance.post('/students', student);
};

export const getCourses = () => {
  return axiosInstance.get('/courses');
};

export const addCourse = (course: Course) => {
  return axiosInstance.post('/courses', course);
};

export const getResults = () => {
  return axiosInstance.get('/results');
};

export const addResult = (result: CreatResultInput) => {
  return axiosInstance.post('/results', result);
};

export const deleteStudent = (id: string) => {
    return axiosInstance.delete(`/students/${id}`);
}

export  const  deleteCourse = (id: string) => {
    return axiosInstance.delete(`/courses/${id}`);
}

