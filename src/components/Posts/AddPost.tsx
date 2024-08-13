import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import apiClient from '../../api/axios';
import { useParams, useNavigate } from 'react-router-dom';

interface AddPostProps {
    isEditing?: boolean;
}

const AddPost: React.FC<AddPostProps> = ({ isEditing = false }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { userId } = useAuth();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditing && id) {
            const fetchPost = async () => {
                try {
                    const response = await apiClient.get(`/posts/${id}`);
                    setTitle(response.data.title);
                    setContent(response.data.content);
                } catch (err) {
                    console.error('Error fetching post:', err);
                    setError('Failed to fetch post');
                }
            };
            fetchPost();
        }
    }, [isEditing, id]);

    const handleSubmit = async () => {
        if (!title || !content) {
            setError('Title and content are required');
            return;
        }

        try {
            if (isEditing && id) {
                const payload = { title, content, authorId: userId! };
                await apiClient.patch(`/posts/${id}`, payload);
                console.log('Post updated');
            } else {
                const payload = { title, content, authorId: userId! };
                await apiClient.post('/posts', payload);
                console.log('Post added');
            }
            navigate('/');
        } catch (err) {
            console.error('Error submitting post:', err);
            setError('Failed to submit post');
        }
    };

    return (
        <div className="modal bg-white shadow-md rounded p-4 mt-4">
            <div className="header mb-4">{isEditing ? 'Edit Post' : 'Add Post'}</div>
            <div className="content">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
            </div>
            <div className="actions">
                <button
                    className="bg-primary hover:bg-acceptgreen text-white py-2 px-4 rounded-full mr-2"
                    onClick={handleSubmit}
                >
                    {isEditing ? 'Update Post' : 'Submit'}
                </button>
                <button
                    className="bg-red-500 text-white py-2 px-4 rounded-full"
                    onClick={() => navigate('/')}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default AddPost;
