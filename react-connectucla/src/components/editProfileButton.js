import React from 'react'
import {useRef, useContext} from 'react'
import './editProfileButton.css'
import Button from '@mui/material/Button';
import {AuthContext} from "../context/AuthContext"
import UserAPI from '../services/user';
import PublishIcon from '@mui/icons-material/Publish';
//import bcrypt from 'bcrypt'

export default function EditProfileButton(){
    const new_username= useRef();
    const new_password= useRef();
    const new_email= useRef();
    const new_password_again= useRef();
    const current_password = useRef();
    const new_profile_picture = useRef();
    const new_cover_picture = useRef();
    const {user} = useContext(AuthContext);

    const handleEditSubmit= async (e)=>{
        e.preventDefault();
        console.log(user.password)
        //const validPassword = await bcrypt.compare(current_password.current.value, user.password)            
        if(new_password_again.current.value !== new_password.current.value) {
          new_password.current.setCustomValidity("Passwords do not match. Try again.")
        } else if (new_password_again.current.value) {
          current_password.current.setCustomValidity("Incorrect Password.")
        } else {
            try {
                const update = {
                    username: new_username.current.value ? new_username.current.value : user.username,
                    password: new_password.current.value ? new_password.current.value : user.password,
                    email: new_email.current.value ? new_email.current.value : user.email,
                    profilePicture: new_profile_picture ? new_profile_picture : user.profilePicture,
                    coverPicture: new_cover_picture ? new_cover_picture : user.coverPicture,
                }
                await UserAPI.updateUserById(user._id, update);
            } catch(err){
                console.log(err);
            }
        }
    };

    return (
        <form className="editBox" onSubmit={handleEditSubmit}>
            <input 
                className="editInput" 
                placeholder="new username" 
                type="username"
                minLength="8"
                ref={new_username}
            />
            <input 
                className="editInput" 
                placeholder="new email" 
                type="email"
                minLength="8"
                ref={new_email}
            />
            <input 
                className="editInput" 
                placeholder="current password" 
                type="password"
                minLength="8"
                ref={current_password}
                required
            />
            <input 
                className="editInput" 
                placeholder="new password" 
                type="password"
                minLength="8"
                ref={new_password}
            />
            <input 
                className="editInput" 
                placeholder="new password again" 
                type="password"
                minLength="8"
                ref={new_password_again}
            />
            <input 
                className="editInput" 
                placeholder="new profile photo URL" 
                type="url"
                ref={new_profile_picture}
            />
            <input 
                className="editInput" 
                placeholder="new cover photo URL" 
                type="url"
                ref={new_cover_picture}
            />
            <Button variant="outlined" startIcon={<PublishIcon />} type="submit">Submit</Button>
        </form>
    )
}