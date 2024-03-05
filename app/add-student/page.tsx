'use client';
import {useDispatch} from "react-redux";
import {useContext, useState} from "react";
import {addStudent} from "@/lib/state/tunks";
import AppAlertContext from "@/app/AppAlertContext";
import { Student } from "@/lib/apis";

export  default function  AddStudent() {
    const alert = useContext(AppAlertContext);
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [formError, setFormError] = useState<Student>({
        firstName: '',
        familyName: '',
        email: '',
        dateOfBirth: ''
    });
    function getDateDiffInYear(date: string) {
        const today = new Date();
        const dob = new Date(date);
        const diff = today.getTime() - dob.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }
    const handleSubmit = async(event: any) => {
        event.preventDefault();
        if(
            !firstName ||
            !familyName ||
            !email ||
            !dateOfBirth ||
            Object.values(formError).some((value) => value !== '')) {
            alert.error('Please fill in the form correctly');
            return;
        }
        const { error } = await dispatch<any>(addStudent({firstName, familyName, email, dateOfBirth}));
        if (error) {
            alert.error(error.message);
            return;
        }
        alert.success('Student added successfully');
        setFirstName('');
        setFamilyName('');
        setEmail('');
        setDateOfBirth('');
    }

    return (
        <div className="flex flex-col flex-1 items-center">
            <h1 className="font-bold text-xl">Add Student</h1>
            <form
                className="flex flex-col space-y-4 mx-auto mt-4 p-4 border border-gray-200"
                onSubmit={handleSubmit}>
                <div className="flex justify-between">
                    <label>
                        First Name:
                    </label>
                    <input
                        className="border border-gray-300"
                        type="text" value={firstName}
                        onChange={(e) => {
                            if(e.target.value.length < 3) {
                                setFormError({
                                    ...formError,
                                    firstName: 'First Name must be at least 3 characters'
                                })
                            }
                            if(formError.firstName && e.target.value.length >= 3) {
                                setFormError({
                                    ...formError,
                                    firstName: ''
                                })
                            }
                            setFirstName(e.target.value)
                        }}/>
                </div>
                {
                    formError.firstName && <p className="text-red-500">{formError.firstName}</p>
                }
                <div className="flex justify-between">
                <label>
                    Family Name:
                </label>
                    <input  className="border border-gray-300" type="text" value={familyName}
                            onChange={(e) => {
                                if(e.target.value.length < 3) {
                                    setFormError({
                                        ...formError,
                                        familyName: 'Family Name must be at least 3 characters'
                                    })
                                }
                                if(formError.familyName && e.target.value.length >= 3) {
                                    setFormError({
                                        ...formError,
                                        familyName: ''
                                    })
                                }
                                setFamilyName(e.target.value)
                            }}/>

                </div>
                {
                    formError.familyName && <p className="text-red-500">{formError.familyName}</p>
                }
                <div className="flex justify-between">
                <label>
                    Email:
                </label>
                    <input  className="border border-gray-300" type="text" value={email}
                            onChange={(e) => {
                                if(!e.target.value) {
                                    setFormError({
                                        ...formError,
                                        email: 'Email is required'
                                    })
                                }
                                const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
                                if(e.target.value && !isEmailValid ) {
                                    setFormError({
                                        ...formError,
                                        email: 'Invalid email'
                                    })
                                }
                                if(formError.email && isEmailValid) {
                                    setFormError({
                                        ...formError,
                                        email: ''
                                    })
                                }
                                setEmail(e.target.value)
                            }}
                    />

                </div>
                {
                    formError.email && <p className="text-red-500">{formError.email}</p>
                }
                <div className="flex justify-between">
                <label>
                    Date of Birth:
                </label>
                    <input  className="border border-gray-300" type="date" value={dateOfBirth}
                            onChange={(e) => {
                                if(!e.target.value) {
                                    setFormError({
                                        ...formError,
                                        dateOfBirth: 'Date of Birth is required'
                                    })

                                }
                                if(e.target.value && getDateDiffInYear(e.target.value) < 10) {
                                    setFormError({
                                        ...formError,
                                        dateOfBirth: 'Student must be at least 10 years old'
                                    })
                                }
                                if(formError.dateOfBirth && getDateDiffInYear(e.target.value) >= 10){
                                    setFormError({
                                        ...formError,
                                        dateOfBirth: ''
                                    })
                                }

                                setDateOfBirth(e.target.value)
                    }}/>

                </div>
                {
                    formError.dateOfBirth && <p className="text-red-500">{formError.dateOfBirth}</p>
                }
                <button
                    className="bg-emerald-500 text-white px-4 py-2 rounded-md" type="submit">Add</button>
            </form>
        </div>
    );
}