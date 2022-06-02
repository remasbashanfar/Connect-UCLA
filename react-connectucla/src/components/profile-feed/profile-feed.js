import Card from '../card.js'
import PostAPI from '../../services/post.js'
import UserAPI from '../../services/user.js'
import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import './profile-feed.css';


export default function ProfileFeed(props) {
    const [rsvpList, setRSVPList] = useState([]);

    // Variables + hooks
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const retrievePosts = async () => {
            const res = await PostAPI.getPostsByUser(props.username)
            console.log("res.data")
            console.log(res.data)
            setPosts(
                res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
        };
        console.log("profile-feed posts:" )
        console.log(posts)
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
           <Box sx={{ flexGrow: 1 }}>
            <div className="feed">
            <Grid container justifyContent="center">
            <Grid item container md={6} spacing={3}>
                {posts.map(post => 
                    {
                    return (
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
                        )
                    })
                }
            </Grid>
            </Grid>
            </div>
            </Box>
    )
}

