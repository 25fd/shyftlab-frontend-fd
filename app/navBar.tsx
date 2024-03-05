'use client';
import React from "react";
import Link from "next/link";

const nav = [
    {
        name: "Home",
        link: "/"
    },
    {
        name: "Add Student",
        link: "/add-student"
    },
    {
        name: "Student List",
        link: "/students"
    },
    {
        name: "Add courses",
        link: "/add-course"
    },
    {
        name: "Course List",
        link: "/courses"
    },
    {
        name: "Add Results",
        link: "/add-result"
    },
    {
        name: "Result List",
        link: "/results"
    }

]
const Navbar = () => {
    return (
        <>
            <div className="w-[150px] h-screen bg-emerald-800 sticky  py-2">
                    <div className="flex flex-col justify-between items-center h-full gap-3">
                        <ul className="gap-x-6 text-white">
                            {
                                nav.map((n, i) => (
                                    <li key={i}
                                        className="border-2 rounded p-1 my-2 w-full"
                                    >
                                        <Link href={n.link}>

                                                {n.name}

                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
            </div>
        </>
    );
};

export default Navbar;