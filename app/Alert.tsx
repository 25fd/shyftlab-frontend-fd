'use client'
import AppAlertContext from "@/app/AppAlertContext";
import { useContext } from "react";
export  function Alert() {
    const { alert, alertText, clear } = useContext(AppAlertContext);
    return (
        <div className={`fixed  flex  bottom-0 right-0 p-4 text-white text-center ${alert === 'none' ? 'hidden' : ''} ${alert === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        style={{zIndex: 999999}}>
            {alertText}
            <button className="text-black ml-2 border-gray-500 border-1 rounded" onClick={clear}>X</button>
        </div>
    );
}