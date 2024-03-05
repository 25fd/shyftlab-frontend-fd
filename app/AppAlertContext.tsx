'use client';
import { useState, createContext, ReactNode } from 'react';

enum AlertStatus {
    None = 'none',
    Success = 'success',
    Error = 'error',

}

type AppAlertContextType = {
    alert: AlertStatus;
    alertText: string;
    success: (text: string) => void;
    error: (text: string) => void;
    clear: () => void;
};

export  const AppAlertContext = createContext<AppAlertContextType>({
    alert: AlertStatus.None,
    alertText: '',
    success: () => {},
    error: () => {},
    clear: () => {},

} );

export const AppAlertProvider = ({ children }: { children: ReactNode }) => {
    const [alert, setAlert] = useState(AlertStatus.None);
    const [alertText, setAlertText] = useState('');

    return (
        <AppAlertContext.Provider
            value={{
                alert: alert,
                alertText: alertText,
                success: (text: string, ) => {
                    setAlertText(text);
                    setAlert(AlertStatus.Success);
                    setTimeout(() => {
                        setAlert(AlertStatus.None);
                    },  2000)

                },
                error: (text: string) => {
                    setAlertText(text);
                    setAlert(AlertStatus.Error);
                    setTimeout(() => {
                        setAlert(AlertStatus.None);
                    }, 2000)
                },
                clear: () => (setAlert(AlertStatus.None)),
            }}
        >
            {children}
        </AppAlertContext.Provider>
    );
};


export default AppAlertContext;