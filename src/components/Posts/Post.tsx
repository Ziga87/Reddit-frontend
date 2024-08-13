import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import { getCommentsByPostId, getVotes, updateVote, deletePost, createComment } from '../../api/callApi';
import { useNavigate } from 'react-router-dom';
import CommentItem from '../Comments/Comment';

interface PostProps {
    id: number;
    author: string;
    timeAgo: string;
    title: string;
    content: string;
    upvotes: number;
    comments: number;
    onDelete: (id: number) => void;
}

const Post: React.FC<PostProps> = ({ id, author, timeAgo, title, content, upvotes, comments, onDelete }) => {
    const { isAuthenticated, userId } = useAuth();
    const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);
    const [error, setError] = useState<string | null>(null);
    const [postComments, setPostComments] = useState<any[]>([]);
    const [commentsVisible, setCommentsVisible] = useState(false);
    const [newComment, setNewComment] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                const data = await getVotes(id);
                setCurrentUpvotes(data.upvotes || 0); // Default to 0 if no votes data
            } catch (err) {
                console.error('Failed to fetch votes:', err);
                setCurrentUpvotes(0); // Default to 0 if there's an error
            }
        };

        fetchVotes();
    }, [id]);

    const handleVote = async (voteType: 'upvote' | 'downvote') => {
        if (!isAuthenticated) {
            setError('You need to be logged in to vote');
            return;
        }

        try {
            const value = voteType === 'upvote' ? 1 : -1;

            if (!userId) {
                setError('User ID not found');
                return;
            }

            const payload = {
                value,
                postId: id,
                userId,
                commentId: null, // Assuming we're only dealing with posts here
            };

            const data = await updateVote(payload);
            setCurrentUpvotes(data.upvotes);
            setError(null);
        } catch (err) {
            console.error(`Failed to ${voteType}:`, err);
            setError(`Failed to ${voteType}`);
        }
    };

    const handleDelete = async () => {
        try {
            await deletePost(id);
            onDelete(id);
        } catch (err) {
            console.error('Failed to delete post:', err);
            setError('Failed to delete post');
        }
    };

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) {
            setError('Comment cannot be empty');
            return;
        }

        try {
            await createComment({
                content: newComment,
                postId: id,
                authorId: userId!,
            });
            setNewComment('');
            toggleComments(); // Refresh comments after adding a new one
        } catch (err) {
            console.error('Failed to post comment:', err);
            setError('Failed to post comment');
        }
    };

    const toggleComments = async () => {
        if (!commentsVisible) {
            try {
                const data = await getCommentsByPostId(id);
                setPostComments(data);
            } catch (err) {
                console.error('Failed to fetch comments:', err);
            }
        }
        setCommentsVisible(!commentsVisible);
    };

    return (
        <div className="bg-graydark text-white p-4 rounded-lg shadow-md mb-4">
            <div className="flex items-center mb-2">
                <span className="text-sm text-gray-400">• {author}</span>
                <span className="text-sm text-gray-400 ml-auto">{timeAgo}</span>
                {isAuthenticated && (
                    <>
                        <button
                            onClick={() => navigate(`/edit-post/${id}`)}
                            className="ml-4 bg-primary hover:bg-acceptgreen text-white py-2 px-4 rounded-2xl"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="ml-4 bg-red-500 text-white py-2 px-4 rounded-2xl"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-300 mb-4">{content}</p>
            <div className="flex items-center">
                <button onClick={() => handleVote('upvote')} className="flex items-center mr-4">
                    <BiSolidLike className="w-5 h-5 text-gray-400 hover:text-blue-500" />
                    <span className="ml-1">{currentUpvotes}</span>
                </button>
                <button onClick={() => handleVote('downvote')} className="flex items-center">
                    <BiSolidDislike className="w-5 h-5 text-gray-400 hover:text-blue-500" />
                </button>
                <span onClick={toggleComments} className="ml-4 cursor-pointer">{comments} comments</span>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {commentsVisible && (
                <div className="mt-4">
                    {isAuthenticated && (
                        <div className="mb-4">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                className="w-full p-2 rounded bg-gray-800 text-white"
                            />
                            <button
                                onClick={handleCommentSubmit}
                                className="bg-primary hover:bg-acceptgreen text-white py-2 px-4 rounded-2xl mt-2"
                            >
                                Post Comment
                            </button>
                        </div>
                    )}
                    {postComments.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            author={comment.author}
                            content={comment.content}
                            createdAt={comment.createdAt}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Post;
