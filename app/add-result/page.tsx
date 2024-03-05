'use client';
import {useDispatch} from "react-redux";
import {useContext, useEffect, useState} from "react";
import {addResult} from "@/lib/state/tunks"
import {selectors as studentSelector} from "@/lib/state/slices/student";
import {useAppSelector} from "@/lib/hooks";
import {getCourses, getStudents} from "@/lib/state/tunks";
import AppAlertContext from "@/app/AppAlertContext";

export default function AddResult() {
    const dispatch = useDispatch();
    const alert = useContext(AppAlertContext);
    const courses =  useAppSelector(studentSelector.getCoursesFromState);
    const students = useAppSelector(studentSelector.getStudentsFromState);
    const [student, setStudent] = useState('');
    const [course, setCourse] = useState('');
    const [score, setScore] = useState('');
    useEffect(() => {
        async function fetchData() {
            await dispatch<any>(getStudents());
            await dispatch<any>(getCourses());
        }
        fetchData();
    }, [dispatch]);

    return (
        <div
            className="flex flex-col flex-1 items-center">
            <h1 className="font-bold text-xl">Add Result</h1>
            <form
                className="flex flex-col space-y-4 mx-auto mt-4 p-4 border border-gray-200 w-1/4"
                onSubmit={async (e) => {
                    e.preventDefault();
                    const {error} = await dispatch<any>(addResult({student, course, score}))
                    if (error) {
                        alert.error(error.message);
                        return;
                    }
                    alert.success('Result added successfully');
                }}>
                <div className="flex justify-around">
                <label>
                    Student:
                </label>
                    <select name="student" value={student} onChange={(e) => {
                        e.preventDefault()
                        setStudent(e.target.value)
                    }}
                    >
                        <option
                            value=""
                            disabled
                            hidden
                        > -- </option>
                        {students.map((student) => (
                            <option className="p-2" key={student._id} value={student._id}>
                                {student.firstName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-around">
                <label>
                    Course:
                </label>
                    <select  name="course" value={course} onChange={(e) => {
                        e.preventDefault()
                        setCourse(e.target.value)
                    }}>
                        <option
                            value=""
                            disabled
                            hidden
                        > -- </option>
                        {courses.map((course) => <option className="p-2" key={course._id} value={course._id}>{course.courseName}</option>)}
                    </select>
                </div>
                <div className="flex justify-around">
                <label>
                    Result:
                </label>
                    <select name="score" value={score} onChange={(e) => {
                        e.preventDefault()
                        setScore(e.target.value)
                    }}>
                        <option
                            value=""
                            disabled
                            hidden
                        > -- </option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                    </select>
                </div>
                <button
                    className="bg-emerald-500 text-white px-4 py-2 rounded-md"
                    type="submit">Add</button>
            </form>
        </div>
    );
}