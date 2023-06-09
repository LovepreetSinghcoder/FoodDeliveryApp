import React, { useState } from 'react';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [userUID, setUserUID] = useState(null);

    const login = (uid) => {
        setUserUID(uid);
    };

    const logout = () => {
        setUserUID(null);
    };

    const contextValue = {
        userUID,
        login,
        logout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
