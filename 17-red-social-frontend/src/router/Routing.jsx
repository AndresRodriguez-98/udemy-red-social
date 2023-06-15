import React from "react";
import { Routes, Route, BrowserRouter, Navigate, Link } from "react-router-dom";
import { PublicLayout } from "../components/layout/public/PublicLayout";
import { Login } from "../components/users/Login";
import { Register } from "../components/users/Register";
import { PrivateLayout } from "../components/layout/private/PrivateLayout";
import { Feed } from "../components/publications/Feed";
import { AuthProvider } from "../context/AuthProvider";
import { LogOut } from "../components/users/LogOut";
import { People } from "../components/users/People";
import { Config } from "../components/users/Config";
import { Following } from "../components/follows/Following";
import { Followers } from "../components/follows/Followers";
import { Profile } from "../components/users/Profile";


export const Routing = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Rutas publicas */}
                    <Route path="/" element={<PublicLayout />}>
                        <Route index element={<Login />} />
                        <Route path="login" element={<Login />} />
                        <Route path="registro" element={<Register />} />
                    </Route>

                    {/* Rutas privadas */}
                    <Route path="/social" element={<PrivateLayout />}>
                        <Route index element={<Feed />} />
                        <Route path="feed" element={<Feed />} />
                        <Route path="logout" element={<LogOut />} />
                        <Route path="people" element={<People />} />
                        <Route path="ajustes" element={<Config tituloSubmit="Actulizar" />} />
                        <Route path="siguiendo/:userId" element={<Following />} />
                        <Route path="seguidores/:userId" element={<Followers />} />
                        <Route path="perfil/:userId" element={<Profile />} />
                    </Route>

                    <Route
                        path="*"
                        element={
                            <>
                                <p>
                                    <h1>Error 404</h1>
                                    <Link to="/">Volver al inicio</Link>
                                </p>
                            </>
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};
