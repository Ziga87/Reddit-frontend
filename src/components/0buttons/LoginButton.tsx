import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLogin } from 'react-icons/ai';

const LoginButton: React.FC = () => {
    return (
        <Link to="/login" className="flex items-center px-4 py-2 text-white bg-primary rounded-full hover:bg-acceptgreen">
            <AiOutlineLogin className="w-5 h-5 mr-2" />
            Prijava
        </Link>
    );
};

export default LoginButton;
