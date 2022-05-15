import NavBar from '../components/navbar.js'
import Card from '../components/card.js'
import PostAPI from '../services/post.js'
import React, { useState, useEffect } from "react";
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

            {
            posts.map(post => {
                return (
                <Card 
                key={post[0]}
                image={post[3]} 
                title={post[1]}
                description={post[2]}
                />
                );
            })
            }
        </div>
    )
}

