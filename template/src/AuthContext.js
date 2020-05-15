import React from 'react';
import {createContext, useState} from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [isLoading, setLoading] = useState(true);
    return <AuthContext.Provider value={{isLoading, setLoading}}>
           {children}
           </AuthContext.Provider>;
}

export default AuthContext;