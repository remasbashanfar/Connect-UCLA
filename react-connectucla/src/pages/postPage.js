import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import NavBar from '../components/navbar.js'
import PostAPI from '../services/post.js'
import CalendarButton from '../components/googleCalendar.js'
import DeleteButton from '../components/deleteButton.js'
import RsvpButton from '../components/rsvpButton'
import "./addEvent.css";

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
            <div className="createPostPage">
            <div className="cpContainer">
            <h2>Event Name</h2>
            {post.title}
           <h2>Organizer</h2>
           {post.author}
           <h2>When?</h2>
           On {post.date} from {post.startTime} to {post.endTime}
           <h2>Where?</h2>
           {post.location}
           <h2>Details</h2>
           {post.content}
           <h2>Poster Link</h2>
           {post.imgurl}
           <h2>Tags</h2>
           {post.tags}
            </div>


            <CalendarButton 
              summary={post.title}
              description={post.content}
              location={post.location}
              start={post.startTime}
              end={post.endTime}
              ></CalendarButton>

            <DeleteButton id={id}>
            </DeleteButton>

            <RsvpButton id={id}></RsvpButton>
            </div>
            {/* This is the post page ID {post._id} */}
        </div>
    );

}