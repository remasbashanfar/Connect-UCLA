import axios from "axios";
import { useState, useEffect} from "react";
import React from "react";
import "./addEvent.css";
import {useNavigate} from 'react-router-dom'
import api from '../api/posts.js'
// import NavBar from '../components/navbar.js'

const AddEvent = () => {
    const [name, setName]=useState('')
    const [organizer, setOrganizer]=useState('')
    const [date, setDate]=useState('')
    const [startTime, setstartTime]=useState('')
    const [endTime, setendTime]=useState('')
    const [details, setDetails]=useState('')
    const [url, setUrl]=useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        //post object
        const event= {name, organizer, date, startTime, endTime, details, url}
        console.log(event)
        //post request code, not working
        fetch('http://localhost:5000',
        {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(event)
        }).then(() =>{
            navigate('/')
        })
    }
    const navigate = useNavigate()

    return (
        <div className="createPostPage">
            <div className="cpContainer">
            <h2>Add New Event Post</h2>
            <form onSubmit={handleSubmit}>
            <div className="inputGp">
            <label>Event Name</label>
                <input type="text"
                value={name}
                onChange={(e)=> setName(e.target.value)}
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
            <label>Poster URL</label>
                <input type="url"
                value={url}
                onChange={(e)=> setUrl(e.target.value)}
                required/>
            </div>
                <button style={{textAlign:'center'}}>Add Event</button>
            </form>
            </div>
        </div>
    );
}
export default AddEvent;