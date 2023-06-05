import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

export const LogOut = () => {

    const { setAuth , setCounters } = useAuth();
    const navigate = useNavigate();

    useEffect(() =>{
        // Vaciar localstorage
        localStorage.clear();

        // Setear estados globales a vacio
        setAuth({});
        setCounters({});

        // Navigate (redireccion) al login
        navigate("/login");
    })

  return (
    <h1>Cerrando Sesión ...</h1>
  )
}
