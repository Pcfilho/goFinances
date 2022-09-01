import React, { createContext, ReactNode, useContext } from 'react';


interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext([]);

function AuthProvider({ children } : AuthProviderProps) {
    return (
        <AuthContext.Provider value={['Pc']}>
            { children }
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthContext, useAuth, AuthProvider }