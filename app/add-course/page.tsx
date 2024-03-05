'use client';
import {useDispatch} from "react-redux";
import {useState} from "react";
import {addCourse} from "@/lib/state/tunks"
import AppAlertContext from "@/app/AppAlertContext";
import {useContext} from "react";
import {Course} from "@/lib/apis";

export default function AddCourse() {
    const dispatch = useDispatch();
    const alert = useContext(AppAlertContext);
    const [courseName, setCourseName] = useState('');
    return (
        <div className="flex flex-col flex-1 items-center">
            <h1 className="font-bold text-xl">Add Course</h1>
                <form
                    className="flex flex-col space-y-4 mx-auto mt-4 p-4 border border-gray-200"
                    onSubmit={async (event) => {
                        event.preventDefault();
                        if (!courseName) {
                            alert.error('Please enter a course name');
                            return;
                        }
                        const {error} = await dispatch<any>(addCourse({courseName}))
                        if (error) {
                            alert.error(error.message);
                            return;
                        }
                        alert.success('Course added successfully');
                        setCourseName('');
                    }
                }>
                    <label>
                        Course Name:
                        <input
                            className="border border-gray-300"
                            type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)}/>
                    </label>
                    <button
                        className="bg-emerald-500 text-white px-4 py-2 rounded-md"
                        type="submit">Add</button>
                </form>
            </div>
    );
}