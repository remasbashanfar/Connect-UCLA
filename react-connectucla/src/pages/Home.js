import NavBar from '../components/navbar.js'
import Card from '../components/card.js'
import PostAPI from '../services/post.js'
import React, { useState, useEffect } from "react";
import { makeStyles } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// Homepage doubles as the feed.

export default function Home() {
    // Variables + hooks
    const [posts, setPosts] = useState([]);

    // Do on render
    useEffect(() => {
        retrievePosts();
    }, []);
    
    // Get all posts from server
    const retrievePosts = () => {
        PostAPI.getAll()
        .then(response => {
            // Transform Json since Json not allowed
            const Transform = response.data.map(d => [d._id, d.title, d.content, d.imgurl, d.category]);
            setPosts(Transform);
        })
        .catch(error => console.log(error));
    };
    
    return (
        <div >
            <NavBar></NavBar>
            <h1>Connect UCLA</h1>
            <h2>Welcome home!</h2>
            
            <Box sx={{ flexGrow: 1 }}>
            <Grid container justifyContent="center">
            <Grid container spacing={3} xs={8}>
                {posts.map(post => 
                    {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={post[0]}>
                            <Card 
                            image={post[3]} 
                            title={post[1]}
                            description={post[2]}
                            />
                        </Grid>
                        )
                    })
                }
            </Grid>
            </Grid>
            </Box>

            
        </div>
    )
}

