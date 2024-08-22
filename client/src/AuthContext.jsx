import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({
    user: null, // Default value for user
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData); // Update user state
    };

    const logout = () => {
        setUser(null); // Clear user state
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
