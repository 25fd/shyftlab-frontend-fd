import {Course, Student,Result} from "@/lib/apis";
import {createSlice} from "@reduxjs/toolkit";
import {addStudent, getStudents,
addCourse,
addResult,
getCourses,
getResults} from "../tunks";
import {RootState} from "@/lib/store";

interface StudentsState {
    students: Student[];
    courses: Course[];
    results: Result[]
}

const initialState: StudentsState = {
    students: [],
    courses: [],
    results: [],
}

const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStudents.fulfilled, (state, action) => {
            state.students = action.payload.data.result;
        });
        builder.addCase(addStudent.fulfilled, (state, action) => {
            state.students.push(action.payload.data.result);
        });
        builder.addCase(
            addCourse.fulfilled,
            (state, action) => {
                state.courses.push(
                    action.payload.data.result
                )
            }
        )
        builder.addCase(addResult.fulfilled, (state, action) => {
            state.results.push(action.payload.data.result)
        })

        builder.addCase(getCourses.fulfilled, (state, action) => {
            state.courses = action.payload.data.result
        })

        builder.addCase(getResults.fulfilled, (state, action) => {
            state.results = action.payload.data.result
        })

    }
});
export default studentSlice.reducer;

const getState = (state: RootState) => state.students;

const getStudentsFromState = (state: RootState) => getState(state).students;

const getCoursesFromState = (state: RootState) => getState(state).courses;

const getResultFromState = (state: RootState) => getState(state).results

export const selectors = {
    getStudentsFromState,
    getCoursesFromState,
    getResultFromState,
}