import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
    element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div> </div>;
    }

    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
