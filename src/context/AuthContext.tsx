import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import apiClient from '../api/axios'; // Adjust the path as needed

interface AuthContextType {
    isAuthenticated: boolean;
    userId: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (email: string, username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const    AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const storedUserId = localStorage.getItem('userId');
        if (token && storedUserId) {
            setIsAuthenticated(true);
            setUserId(storedUserId);
        }
        setLoading(false); // Set loading to false after checking the local storage
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await apiClient.post('/auth/login', { email, password });
            if (response.data.accessToken && response.data.userId) {
                localStorage.setItem('authToken', response.data.accessToken);
                localStorage.setItem('userId', response.data.userId);
                setIsAuthenticated(true);
                setUserId(response.data.userId);
            }
        } catch (error) {
            console.error('Error during login', error);
            throw new Error('Failed to login');
        }
    };

    const register = async (email: string, username: string, password: string) => {
        try {
            const response = await apiClient.post('/auth/register', { email, username, password });
            if (response.data.accessToken && response.data.userId) {
                localStorage.setItem('authToken', response.data.accessToken);
                localStorage.setItem('userId', response.data.userId);
                setIsAuthenticated(true);
                setUserId(response.data.userId);
            }
        } catch (error) {
            console.error('Error during register', error);
            throw new Error('Failed to register');
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        setIsAuthenticated(false);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userId, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
