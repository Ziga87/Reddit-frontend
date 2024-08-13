import apiClient from "./axios.ts";

interface UpdateVotePayload {
    value: number;
    postId: number;
    userId: string;
    commentId?: number | null;
}

export const updateVote = async (payload: UpdateVotePayload) => {
    try {
        const response = await apiClient.post('/votes', payload);
        return response.data; // Ensure this returns the up-to-date vote count
    } catch (error) {
        console.error('Error updating vote:', error);
        throw error;
    }
};

export const getVotes = async (postId: number) => {
    try {
        const response = await apiClient.get(`/votes/${postId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching votes for post ${postId}:`, error);
        throw error;
    }
};

export const getPosts = async () => {
    try {
        const response = await apiClient.get('/posts');
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const getCommentsByPostId = async (postId: number) => {
    try {
        const response = await apiClient.get(`/comments/post/${postId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching comments for post ${postId}:`, error);
        throw error;
    }
};

export const createPost = async (title: string, content:string, authorId: string) => {
    try {
        const response = await apiClient.post('/posts', {
            title, content, authorId
        })
        return response.data;
    } catch (error) {
        console.error('Error posting a createPost.', error);
        throw error;
    }
}

export const createComment = async (payload: { content: string; postId: number; authorId: string }) => {
    try {
        const response = await apiClient.post('/comments', payload);
        return response.data;
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
};

export const deletePost = async (id: number) => {
    try {
        const response = await apiClient.delete(`/posts/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting post with ID ${id}:`, error);
        throw error;
    }
};
