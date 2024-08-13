import React from 'react';

interface CommentItemProps {
    author: string;
    content: string;
    createdAt: string;
}

const CommentItem: React.FC<CommentItemProps> = ({ author, content, createdAt }) => {
    const timeAgo = (date: string) => {
        const now = new Date();
        const commentDate = new Date(date);
        const diff = Math.floor((now.getTime() - commentDate.getTime()) / 1000);

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

    return (
        <div className="bg-gray-700 text-white p-2 rounded-lg shadow-md mb-2">
            <div className="flex items-center mb-1">
                <span className="text-sm text-gray-400">• {author}</span>
                <span className="text-sm text-gray-400 ml-auto">{timeAgo(createdAt)}</span>
            </div>
            <p className="text-gray-300">{content}</p>
        </div>
    );
};

export default CommentItem;
