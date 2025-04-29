import { useState } from "react";
import Data from "../data/Data"
import { useAuth } from "./useAuth"

const useCupon = () => {

    const url = Data + "getCupon"
    const url_delete = Data + "deleteCupon"
    const url_cuponbycode = Data + "getCuponByCode"
    const url_reedem = Data + "canjear"
    const url_add = Data + "addCupon"
    const url_update = Data + "updateCupon"
    const { token } = useAuth();
    const [cupon, setCupon] = useState([]);
    const [cuponCode, setcuponCode] = useState([]);

    const getCupon = async () => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                credentials: "include", // Necesario para cookies (Sanctum)
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error en el servidor");
            }

            const data = await response.json();
            setCupon(data.data);
            return data.data;
        } catch (error) {
            console.log(error);
        }

    }

    const deleteCupon = async (codigo) => {

        const response = await fetch(url_delete, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: "include", // Necesario para cookies (Sanctum)
            body: JSON.stringify({ codigo })
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error en el servidor");
        }

        const data = await response.json();
        return data

    }

    const searchCupon = async (codigo) => {
        const response = await fetch(url_cuponbycode, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: "include", // Necesario para cookies (Sanctum)
            body: JSON.stringify({ codigo })
        })
        if (!response.ok) {
            const errorData = await response.json();
            setcuponCode([]);
            throw new Error(errorData.message || "Error en el servidor");
        }

        const data = await response.json();
        setcuponCode(data.data)
        return data
    }

    const reedemCoupon = async (codigo) => {
        const response = await fetch(url_reedem, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: "include", // Necesario para cookies (Sanctum)
            body: JSON.stringify({ codigo })
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error en el servidor");
        }

        const data = await response.json();
        return data
    }

    const addCupon = async (CuponData) => {
        const requestData = {
            codigo: CuponData.codigo,
            monto: CuponData.monto
        }
        const response = await fetch(url_add, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: "include", // Necesario para cookies (Sanctum)
            body: JSON.stringify(requestData)
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error en el servidor");
        }

        const data = await response.json();
        return data
    }

    const updateCupon = async (CuponData) => {
        const requestData = {
            codigo: CuponData.codigo,
            monto: CuponData.monto
        }
        const response = await fetch(url_update, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            credentials: "include", // Necesario para cookies (Sanctum)
            body: JSON.stringify(requestData)
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error en el servidor");
        }

        const data = await response.json();
        return data
    }

    return { getCupon, cupon, deleteCupon, searchCupon, cuponCode, reedemCoupon, addCupon, updateCupon }
}

export default useCupon