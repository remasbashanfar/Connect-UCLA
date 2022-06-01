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
        <div
        >
            <NavBar></NavBar>
            <div className="createPostPage"
            style={{ 
                backgroundImage: `url(${post.imgurl})`,
                height: '100vh',
                backgroundPosition: 'center',
                backgroundRepeat: 'repeat',
                backgroundSize: 'cover'
                }}
            >
            <div className="cpContainer"
            style={{ 
                position: 'absolute',
                width: '500px',
                height: '350px',
                left: '75px'
            }}>
            <h2>Event</h2>
            {post.title}
           <h2>When?</h2>
            From {post.startTime} <br></br>
            To {post.endTime}

            <h2>Where?</h2>
           {post.location}
            </div>
            <div className="cpContainer"
            style={{ 
                position: 'absolute',
                width: '500px',
                height: '350px',
                right: '75px'
            }}>
            <h2>Organizer</h2>
           {post.author}
           <h2>Details</h2>
           {post.content}
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
            {rsvpList!=null && <RsvpButton id={id} author={!user ? "placeholder" : user._id} rsvpList={rsvpList}></RsvpButton>}
            </div>
            {/* This is the post page ID {post._id} */}
        </div>
    );

}