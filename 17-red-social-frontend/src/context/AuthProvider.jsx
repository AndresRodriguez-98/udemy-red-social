// un provider te permite compartir una informacion que tiene un componente con el resto de componentes.

import React, { useState, useEffect, createContext } from "react";
import { Global } from "../helpers/Global";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState();
    const [counters, setCounters] = useState();
    const [loading, setLoading] = useState(true);

    const authUser = async () => {
        // Sacar datos del usuario del local storage
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        // Comprobar si tengo el token y el user
        if (!token || !user) {
            setLoading(false);
            return false;
        }

        // Transformar los datos a un objeto de JS
        const userObj = JSON.parse(user);
        const userId = userObj.id;

        // Peticion ajax al backend que compruebe el token y que me devuelva todos los datos del usuario
        const request = await fetch(Global.url + "user/profile/" + userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });

        const data = await request.json();

        // Peticion para los contadores

        const requestCounters = await fetch(Global.url + "user/counters/" + userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        });

        const dataCounters = await requestCounters.json();

        // Setear el estado de auth
        setAuth(data.user);
        setCounters(dataCounters);
        setLoading(false);
    };

    useEffect(() => {
        authUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                counters,
                setCounters,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
