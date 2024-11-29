import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children, role }) => {
    const { user } = useAuth();

    if (!user || user !== role) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
