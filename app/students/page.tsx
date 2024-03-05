'use client'
import {selectors as studentSelector} from "@/lib/state/slices/student";

import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {Student} from "@/lib/apis";
import {getStudents, deleteStudent} from "@/lib/state/tunks";
import { useContext, useEffect} from "react";
import AppAlertContext from "@/app/AppAlertContext";


export default function Students() {

    const alert = useContext(AppAlertContext);
    const students = useAppSelector(studentSelector.getStudentsFromState)
    const dispatch =  useAppDispatch()
    useEffect(() =>  {
        dispatch<any>(getStudents())
    },[dispatch])
    return (
        <div className="flex flex-1 flex-col items-center">
            <h1 className="font-bold text-xl">Students</h1>
            <table className="w-full m-4 text-center">
                <thead>
                <tr className="text-center text-xs font-semibold tracking-wide text-gray-500 uppercase  border-2 bg-gray-50">
                    <th className="px-4 py-3 border">First Name</th>
                    <th className="px-4 py-3 border">Family Name</th>
                    <th className="px-4 py-3 border">Email</th>
                    <th className="px-4 py-3 border">Date of Birth</th>
                </tr>
                </thead>
                <tbody className="bg-white">

                {
                    students.map((s: Student) => (
                        <tr className="text-gray-700" key={s.firstName}>
                            <td className="px-4 py-3 border">{s.firstName}</td>
                            <td className="px-4 py-3 border">
                                {s.familyName}
                            </td>
                            <td className="px-4 py-3 border">{
                                s.email
                            }</td>
                            <td className="px-4 py-3 border">{
                                s.dateOfBirth
                            }</td>
                            <td className="px-4 py-3 border">
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                                    onClick={async () => {
                                    const {error} = await dispatch<any>(deleteStudent(s._id as string));
                                    if (error) {
                                        alert.error(error.message);
                                        return;
                                    }
                                    alert.success('Student deleted successfully');
                                    await dispatch<any>(getStudents());
                                }}>X</button>
                            </td>
                        </tr>
                    ))
                }

                </tbody>
            </table>
        </div>
    )
}