import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PublicRouteProps {
    element: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div> </div>;
    }

    return !isAuthenticated ? element : <Navigate to="/" />;
};

export default PublicRoute;
