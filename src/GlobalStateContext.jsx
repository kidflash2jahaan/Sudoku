import {createContext, useEffect, useState} from 'react';

export const GlobalStateContext = createContext();

// eslint-disable-next-line react/prop-types
export const GlobalStateProvider = ({children}) => {
    const endpoint = "https://healthy-glider-liberal.ngrok-free.app/sudoku"
    const [username, setUsername] = useState("");

    useEffect(() => {
        const originalFetch = window.fetch;
        
        window.fetch = async (url, options = {}) => {
            const headers = {
                "ngrok-skip-browser-warning": "true",
                ...options.headers,
            };
            
            return originalFetch(url, {
                ...options,
                headers,
            });
        };
        
        return () => {
            window.fetch = originalFetch;
        };
    }, []);
    
    return (<GlobalStateContext.Provider value={{endpoint, username, setUsername}}>
            {children}
        </GlobalStateContext.Provider>);
};
