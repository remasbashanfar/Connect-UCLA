import NavBar from '../components/navbar.js'
import Card from '../components/card.js'
import PostAPI from '../services/post.js'
import UserAPI from '../services/user.js'
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FilterBar from "../components/searchFilter"
import { AuthContext } from "../context/AuthContext";
import {useContext} from 'react';

// Homepage doubles as the feed.

export default function Home() {
    // Variables + hooks
    const [posts, setPosts] = useState([]);
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    const [rsvpList, setRSVPList] = useState(null);
    const {user} = useContext(AuthContext);


    // Do on render
    useEffect(() => {
        retrievePosts();
        if (user) {
            retrieveRSVPList();
        } else {
            setRSVPList([]);
        }
    }, [tags]);
    
    // Get list of RSVP'ed post for user
    const retrieveRSVPList = () => {
        UserAPI.getUser(user.username).then(response => {
            setRSVPList(response.data.rsvpList)
        })
        .catch(error => console.log(error));
    }

    // Get filtered posts from server
    const retrievePosts = () => {
        if(tags.length === 0)
        {
            if (user) { // Customly sorted posts
                PostAPI.getPersonalized(user._id)
                .then(response =>{
                    setPosts(response.data)
                })
                .catch(error => console.log(error));
            } else { // Default feed if no user logged in 
                PostAPI.getAll()
                .then(response =>{
                    setPosts(response.data)
                })
                .catch(error => console.log(error));
            }
        }
        else{ // If tags are set, return appropriate posts
            PostAPI.getPostByTags(tags)
                .then(response => {
                    setPosts(response.data)
                })
                .catch(error => console.log(error));
        }
    };
    

    const addTags = (event) => {
        if(tag === '')
        {
            return;
        }
        event.preventDefault();
        setTags([...tags, tag])
        setTag('');
    }

    const handleTagChange = (event) =>{
        setTag(event.target.value);
    }

    const removeTag = (removedTag) =>{
        setTags(tags.filter(tag => tag !== removedTag))
    }



    return (
        <div >
            <NavBar></NavBar>
            <h1>Connect UCLA</h1>
            <h2>Welcome home!</h2>
            
            <FilterBar tag = {tag} tags = {tags} handleTagChange={handleTagChange} 
                       addTags = {addTags} removeTag = {removeTag}>
            </FilterBar>

            <Box sx={{ flexGrow: 1 }}>
            <Grid container justifyContent="center">
            <Grid item container spacing={3} xs={8}>
                {posts.map(post => 
                    {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={post._id}>
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
            </Box>

            
        </div>
    )
}

