import Card from '../card.js'
import PostAPI from '../../services/post.js'
import React, { useState, useEffect } from "react";

import './profile-feed.css';

// Homepage doubles as the feed.

export default function ProfileFeed({ userId }) {

    // Variables + hooks
    const [posts, setPosts] = useState([]);
   // PostAPI.getPostsByUser(userId)
    useEffect(() => {
        const retrievePosts = async () => {
            const res = await PostAPI.getAll()
            setPosts(
                res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
        };
        retrievePosts();
    }, [userId]);

    return (
        <div className="feed">
            {posts.map((post) => (
                <Card 
                    link={post._id}
                    userId={post.userId}
                    image={post.imgurl} 
                    title={post.title}
                    content={post.content} //add event stuff, event.title? etc
                    startTime={post.startTime}
                    endTime={post.endTime}
                    location={post.location}
                    tags={post.tags}
                    organizer={post.author}
                />
            ))}
        </div>
    )
}

