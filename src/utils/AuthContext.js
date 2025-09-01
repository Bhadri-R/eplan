import React, { createContext, useState, useEffect } from "react";

// Create Context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = sessionStorage.getItem("authUser");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Function to update user data
    const updateUser = (newUserData) => {
        sessionStorage.setItem("authUser", JSON.stringify(newUserData));
        setUser(newUserData);
    };

    useEffect(() => {
        const handleStorageChange = () => {
            const updatedUser = sessionStorage.getItem("authUser");
            setUser(updatedUser ? JSON.parse(updatedUser) : null);
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <AuthContext.Provider value={{ user, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
