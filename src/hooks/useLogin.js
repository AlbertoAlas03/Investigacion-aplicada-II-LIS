import Data from '../data/Data';
import { useAuth } from './useAuth';

const useLogin = () => {

    const url = Data + "login";
    const url_logout = Data + "logout"
    const { setUser, setToken, token } = useAuth();

    const login = async (userData) => {

        const requestData = {
            email: userData.email,
            password: userData.password
        }

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include", // Necesario para cookies (Sanctum)
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error en el servidor");
        }

        const data = await response.json();

        sessionStorage.setItem("user", JSON.stringify(data.usuario)); // Guarda el usuario en sessionStorage
        sessionStorage.setItem("token", JSON.stringify(data.token_access));
        setUser(data.usuario);
        setToken(data.token_access);
        return data; // Retorna la respuesta completa para manejarla en el componente
    }

    const logout = async () => {
        try {
            const response = await fetch(url_logout, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                credentials: "include" // Necesario para cookies (Sanctum)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error en el servidor");
            }

            const data = await response.json();

            sessionStorage.removeItem("user");
            sessionStorage.removeItem("token");
            setUser(null);
            setToken(null);

            return data;
        } catch (error) {
            console.log("error al cerrar sesion: ", error.message);
        }

    }

    return { login, logout }
}

export default useLogin