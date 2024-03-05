'use client';
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {getResults} from "@/lib/state/tunks";
import {useEffect} from "react";
import {selectors as studentSelector} from "@/lib/state/slices/student";


export default function Courses() {
    const dispatch = useAppDispatch();
    const results = useAppSelector(studentSelector.getResultFromState);
    useEffect(() => {
        dispatch(getResults());
    }, [dispatch]);
    return (
        <div className="flex flex-1 flex-col items-center">
            <h1 className="font-bold text-xl">Results</h1>
            <table className="w-1/2 text-center">
                <thead className="text-center text-xs font-semibold tracking-wide text-gray-500 uppercase  border-2 bg-gray-50">
                <tr>
                    <th className="px-4 py-3 border">Student</th>
                    <th className="px-4 py-3 border">Course</th>
                    <th className="px-4 py-3 border">Score</th>
                </tr>
                </thead>
                <tbody className="bg-white">
                {results.map((result) =>
                    <tr key={result._id}>
                        <td className="px-4 py-3 border">{result.student.firstName}</td>
                        <td className="px-4 py-3 border">{result.course.courseName}</td>
                        <td className="px-4 py-3 border">{result.score}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}