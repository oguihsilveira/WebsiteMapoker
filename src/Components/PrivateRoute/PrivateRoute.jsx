import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'; // Importa jwt-decode

const PrivateRoute = ({ element, ...rest }) => {
    const token = localStorage.getItem('token');

    const isAuthenticated = () => {
        if (!token) return false;

        try {
            const decoded = jwt_decode(token); // Decodifica o token
            return decoded && decoded.exp > Date.now() / 1000; // Verifica a expiração
        } catch (error) {
            return false;
        }
    };

    return (
        <Route
            {...rest}
            element={isAuthenticated() ? element : <Navigate to="/" />}
        />
    );
};

export default PrivateRoute;