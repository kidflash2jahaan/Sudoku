import {createContext, useState} from 'react';

export const GlobalStateContext = createContext();

// eslint-disable-next-line react/prop-types
export const GlobalStateProvider = ({children}) => {
    const endpoint = import.meta.env.VITE_ENDPOINT
    const [username, setUsername] = useState("");

    return (<GlobalStateContext.Provider value={{endpoint, username, setUsername}}>
        {children}
    </GlobalStateContext.Provider>);
};
