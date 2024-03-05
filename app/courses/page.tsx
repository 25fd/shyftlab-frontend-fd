'use client'
import {selectors as studentSelector} from "@/lib/state/slices/student";

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {getCourses, deleteCourse} from "@/lib/state/tunks";
import {useContext, useEffect} from "react";
import AppAlertContext from "@/app/AppAlertContext";


export default function Courses() {
    const dispatch = useAppDispatch();
    const alert = useContext(AppAlertContext);
    const courses = useAppSelector(studentSelector.getCoursesFromState);
    useEffect(() => {
        dispatch(getCourses());
    }, [dispatch]);
    return (
        <div className="flex flex-1 flex-col items-center">
            <h1 className="font-bold text-xl">Courses</h1>
            <table className="m-4 w-1/2 text-center">
                <thead className="text-center text-xs font-semibold tracking-wide text-gray-500 uppercase  border-2 bg-gray-50">
                <tr>

                    <th className="px-4 py-3 border">Course</th>

                </tr>
                </thead>
                <tbody className="bg-white">
                {courses.map((course) =>
                    <tr  key={course._id}>
                        <td className="px-4 py-3 border">{course.courseName}</td>
                        <td className="px-4 py-3 border">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                                onClick={async () => {
                                    const {error} = await dispatch<any>(deleteCourse(course._id as string));
                                    if (error) {
                                        alert.error(error.message);
                                        return;
                                    }
                                    alert.success('Course deleted successfully');
                                    await dispatch<any>(getCourses());
                                }}>X</button>
                        </td>
                    </tr>

                )}
                </tbody>
            </table>
        </div>
    );
}