import React,{createContext,useState} from 'react';

export const ThemeContext = createContext();

export const Themeprovider =({children})=>{
    const [darkMode,setDarkMode] = useState(false);
    
    const toggle=()=>{
        setDarkMode(!darkMode);
    }

    return (
        <ThemeContext.Provider value={{darkMode,toggle}}>
            {children}
        </ThemeContext.Provider>
    )
}