import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import NavBar from '../components/navbar.js'
import PostAPI from '../services/post.js'
import UserAPI from '../services/user.js'
import CalendarButton from '../components/googleCalendar.js'
import DeleteButton from '../components/deleteButton.js'
import RsvpButton from '../components/rsvpButton'
import "./addEvent.css";
import { AuthContext } from "../context/AuthContext";
import {useContext} from 'react';


export default function PostPage() {
    // Variables + hooks
    const {user} = useContext(AuthContext)
    const [post, setPost] = useState([]);
    const [rsvpList, setRSVPList] = useState(null);
    let { id } = useParams();

    // Do on render
    useEffect(() => {
        retrievePost();
        if (user) {
            retrieveRSVPList();
        } else {
            setRSVPList([])
        }
    }, []);

    const retrievePost = () => {
        PostAPI.getPostById(id)
        .then(response => {
            setPost(response.data);
        })
        .catch(error => console.log(error));
    };

    const retrieveRSVPList = () => {
        UserAPI.getUser(user.username).then(response => {
            setRSVPList(response.data.rsvpList)
        })
        .catch(error => console.log(error));
    }

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
            
            {user && user._id===post.userId && <DeleteButton id={id}>
            </DeleteButton>}
            {rsvpList!=null ? <RsvpButton id={id} author={post.userId} rsvpList={rsvpList}></RsvpButton> : null}
            </div>
            {/* This is the post page ID {post._id} */}
        </div>
    );

}