import React from 'react';
import AddPost from '../components/Posts/AddPost';
import { useParams } from 'react-router-dom';

const AddPostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const isEditing = !!id;

    return <AddPost isEditing={isEditing} />;
};

export default AddPostPage;
