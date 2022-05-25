import NavBar from '../components/navbar.js'
import Card from '../components/card.js'
import PostAPI from '../services/post.js'
import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FilterBar from "../components/searchFilter"


// Homepage doubles as the feed.

export default function Home() {
    // Variables + hooks
    const [posts, setPosts] = useState([]);
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);


    // Do on render
    useEffect(() => {
        retrievePosts();
    }, [tags]);
    




    // Get filtered posts from server
    const retrievePosts = () => {
<<<<<<< HEAD
        PostAPI.getAll()
        .then(response => {
            setPosts(response.data);
        })
        .catch(error => console.log(error));
=======
        if(tags.length === 0)
        {
            PostAPI.getAll()
            .then(response =>{
                let Transform = response.data.map(d => [d._id, d.title, d.content, d.imgurl, d.tags, d.location]);
                setPosts(Transform)
            })
            .catch(error => console.log(error));
        }
        else{
            PostAPI.getPostByTags(tags)
                .then(response => {
                    let Transform = response.data.map(d => [d._id, d.title, d.content, d.imgurl, d.tags, d.location]);
                    setPosts(Transform)
                })
                .catch(error => console.log(error));
        }
>>>>>>> 0a3f23e (Removed category from mapping and added location instead)
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
        setTags(tags.filter(tag => tag != removedTag))
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
            <Grid container spacing={3} xs={8}>
                {posts.map(post => 
                    {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={post._id}>
                            <Card 
                            link={post._id}
                            image={post.imgurl} 
                            title={post.title}
                            description={post.content}
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

