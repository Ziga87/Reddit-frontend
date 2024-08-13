import React, { useEffect, useState } from 'react';
import { getPosts } from '../api/callApi';
import Post from '../components/Posts/Post';
import Navbar from '../components/Navbar';

interface PostData {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    upvotes: number;
    comments: number;
}

const Home: React.FC = () => {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getPosts();
                setPosts(data);
                setLoading(false);
            } catch (err) {
                setError('Napaka pri nalaganju objav');
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handlePostDelete = (postId: number) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    };

    const timeAgo = (date: string) => {
        const now = new Date();
        const postDate = new Date(date);
        const diff = Math.floor((now.getTime() - postDate.getTime()) / 1000);
        const intervals: { [key: string]: number } = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1,
        };
        for (const [unit, seconds] of Object.entries(intervals)) {
            const count = Math.floor(diff / seconds);
            if (count >= 1) {
                return `${count} ${unit}${count > 1 ? 's' : ''} ago`;
            }
        }
        return 'just now';
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        id={post.id}
                        author={post.author}
                        timeAgo={timeAgo(post.createdAt)}
                        title={post.title}
                        content={post.content}
                        upvotes={post.upvotes}
                        comments={post.comments}
                        onDelete={handlePostDelete}
                    />
                ))}
            </div>
        </>
    );
};

export default Home;
