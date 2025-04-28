import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const savedUser = sessionStorage.getItem("user"); //obtener cliente del sessionStorage
        const token = sessionStorage.getItem("token");
        if (savedUser || token) {
            setUser(JSON.parse(savedUser));
            setToken(JSON.parse(token));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, setToken, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);