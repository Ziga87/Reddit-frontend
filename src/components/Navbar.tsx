import React from 'react';
import { Link } from 'react-router-dom';
import CreateButton from './0buttons/CreateButton';
import LoginButton from './0buttons/LoginButton';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="bg-white shadow-md py-4 px-10">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link to="/">(fejk)Reddit</Link>
                </div>
                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <CreateButton />
                    ):null}
                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-full">
                            Odjavi se
                        </button>
                    ) : (
                        <LoginButton />
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
