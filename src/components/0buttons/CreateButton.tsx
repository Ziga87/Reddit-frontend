import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const CreateButton: React.FC = () => {
    const navigate = useNavigate();

    const btnKlik = () => {
        navigate('/create-post');
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={btnKlik}
                className="flex items-center px-4 py-2 text-white bg-primary rounded-full hover:bg-acceptgreen"
            >
                <AiOutlinePlus className="w-5 h-5 mr-2 font-bold" />
                Objavi
            </button>
        </div>
    );
};

export default CreateButton;
