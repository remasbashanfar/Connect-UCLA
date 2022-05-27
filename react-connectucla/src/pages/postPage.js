import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import NavBar from '../components/navbar.js'
import PostAPI from '../services/post.js'
import CalendarButton from '../components/googleCalendar.js'
import DeleteButton from '../components/deleteButton.js'

export default function PostPage() {
    // Variables + hooks
    const [post, setPost] = useState([]);
    let { id } = useParams();

    // Do on render
    useEffect(() => {
        retrievePost();
    }, []);

    const retrievePost = () => {
        PostAPI.getPostById(id)
        .then(response => {
            console.log(response.data);
            setPost(response.data);
        })
        .catch(error => console.log(error));
    };

    return (
        <div>
            <NavBar></NavBar>
            This is the post page ID {post._id}
            <div>
            <h2>Event Name</h2>
            {post.title}
           <h2>Organizer</h2>
           <h2>When?</h2>
           <h2>Where?</h2>
           <h2>Details</h2>
           {post.conent}
           <h2>Poster Link</h2>
           {post.imgurl}
            </div>

            <CalendarButton 
              summary="test summary" 
              description="description test"
              location="UCLA"
              start="2022-05-26T13:00:00"
              end="2022-05-26T14:00:00"
              ></CalendarButton>

            <DeleteButton id={id}>
            </DeleteButton>
        </div>
    );

}