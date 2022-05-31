import Card from '../card.js'
import PostAPI from '../../services/post.js'
import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import { AuthContext } from "../../context/AuthContext";
import {useContext} from 'react';
import UserAPI from '../../services/user.js'

import './profile-feed.css';

// Homepage doubles as the feed.

export default function ProfileFeed({ userId }) {

    // Variables + hooks
    const [posts, setPosts] = useState([]);
    const [rsvpList, setRSVPList] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const retrievePosts = async () => {
            const res = await PostAPI.getPostsByUser(userId)
            setPosts(
                res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
        };
        retrievePosts();
        retrieveRSVPList();
    }, [userId]);
            //container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    
    const retrieveRSVPList = () => {
        UserAPI.getUser(user.username).then(response => {
            setRSVPList(response.data.rsvpList)
        })
        .catch(error => console.log(error));
    }

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
                                RSVP_List={rsvpList}
                            />
                    </Grid>
                ))}
            </Grid>

        </div>
    )
}

