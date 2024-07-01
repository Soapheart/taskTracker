import React, {createContext, useEffect, useState} from 'react';

export const ThemeContext = createContext();


export const ThemeProvider = ({pmInstance, children}) => {

    const data = pmInstance.getData();
    const [theme, setTheme] = useState(data.appTheme);

    useEffect(()=>{
        document.querySelector('.app').dataset.theme = theme;
        pmInstance.changeTheme(theme);
    },[theme])
    return (
        <ThemeContext.Provider value={[theme, setTheme]}>
            {children}
        </ThemeContext.Provider>
    )
}
