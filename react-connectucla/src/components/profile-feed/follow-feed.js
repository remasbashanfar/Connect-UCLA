import Card from '../card.js'
import PostAPI from '../../services/post.js'
import UserAPI from '../../services/user.js'
import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import './profile-feed.css';


export default function FollowFeed(props) {
    const [rsvpList, setRSVPList] = useState([]);
    const [posts, setPosts] = useState([]);

    // Variables + hooks
    useEffect(() => {
        const retrievePosts = async () => {
            const res = await PostAPI.getPostsByFollowing(props.username)
            setPosts(
                res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
        };
        retrievePosts();
        retrieveRSVPList();
    }, [props.username]);
    
    const retrieveRSVPList = () => {
        UserAPI.getUser(props.username).then(response => {
            setRSVPList(response.data.rsvpList)
        })
        .catch(error => console.log(error));
    }
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
                                RSVP_List={rsvpList}
                            />
                    </Grid>
                ))}
            </Grid>

        </div>
    )
}

