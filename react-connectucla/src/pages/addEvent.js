import { useState } from "react";
import React from "react";
import "./addEvent.css";
import PostAPI from '../services/post.js'
import {useNavigate} from 'react-router-dom'
// import NavBar from '../components/navbar.js'
import TagsInput from './inputTags.js';

const AddEvent = () => {
    const navigate = useNavigate()
    const [title, setTitle]=useState('')
    const [organizer, setOrganizer]=useState('')
    const [date, setDate]=useState('')
    const [startTime, setstartTime]=useState('')
    const [endTime, setendTime]=useState('')
    const [details, setDetails]=useState('')
    const [url, setUrl]=useState('')
    const [location, setLocation]=useState('')
    const [tags, setTags] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault()
        //post object MUST CORRESPOND TO POST SCHEMA and be json object
        const event= {
            title: title, 
            author: organizer, 
            date:date, 
            location:location,
            startTime:startTime, 
            endTime:endTime, 
            content:details, 
            imgurl:url,
            tags: tags
        }
        
        //post request code, not working
        PostAPI.createPost(event)
        .then(response => {console.log(response.data) 
            navigate('/')})
        .catch(error => console.log(error));
    }

    const selectedTags = tags => {
		console.log(tags);
	};

    return (
        <div className="createPostPage">
            <div className="cpContainer">
            <h2>Add New Event Post</h2>
            <form onSubmit={handleSubmit}>
            <div className="inputGp">
            <label>Event Name</label>
                <input type="text"
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                required/>
            </div>
            <div className="inputGp">
            <label>Organizer</label>
                <input type="text"
                value={organizer}
                onChange={(e)=> setOrganizer(e.target.value)}
                required/>
            </div>
            <div className="inputGp">
            <label>Date</label>
                <input type="date"
                value={date}
                onChange={(e)=> setDate(e.target.value)}
                required/>
            </div>
            <div className="inputGp">
            <label>Start Time</label>
                <input type="time"
                value={startTime}
                onChange={(e)=> setstartTime(e.target.value)}
                required/>
            </div>
            <div className="inputGp">
            <label>End Time</label>
                <input type="time"
                value={endTime}
                onChange={(e)=> setendTime(e.target.value)}
                required/>
            </div>
            <div className="inputGp">
            <label>Details</label>
                <textarea
                value={details}
                onChange={(e)=> setDetails(e.target.value)}
                required>
                </textarea>
            </div>
            <div className="inputGp">
            <label>Location</label>
                <textarea
                value={location}
                onChange={(e)=> setLocation(e.target.value)}
                required>
                </textarea>
            </div>
            <div className="inputGp">
            <label>Poster URL</label>
                <input type="url"
                value={url}
                onChange={(e)=> setUrl(e.target.value)}
                required/>
            </div>            
            <div className="inputGp">
            <label>Add Tags</label>
                <TagsInput selectedTags={selectedTags} tags={[]}
                />
            </div>
            <button>Add Event</button>
            </form>
            </div>
        </div>
    );
}
export default AddEvent;