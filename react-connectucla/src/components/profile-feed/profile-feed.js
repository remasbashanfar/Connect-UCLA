import Card from '../card.js'
import PostAPI from '../../services/post.js'
import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';

import './profile-feed.css';


export default function ProfileFeed(username) {

    // Variables + hooks
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const retrievePosts = async () => {
            const res = await PostAPI.getPostsByUser(username)
            setPosts(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
        };
        retrievePosts();
    }, [username]);
    //container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    return (
        <div className="feed">
            <Grid container spacing ={3}> 
                {posts.map((post) => (
                    <Grid item key={post._id}>
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
                                //rsvpList={}
                            />
                    </Grid>
                ))}
            </Grid>

        </div>
    )
}

