import * as React from 'react'
import {useEffect, useState, useContext, useRef} from 'react'
import "./profile.css";
import NavBar from "../../components/navbar";
import { useParams } from "react-router";
import UserAPI from '../../services/user';
import ProfileFeed from "../../components/profile-feed/profile-feed.js"
import {AuthContext} from "../../context/AuthContext"
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from 'react-router-dom';
import {logoutCall} from "../../services/loginCall"

export default function Profile() {
  const navigate = useNavigate();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [profileUser, setProfileUser] = useState({});
  const [edit, setEdit] = useState(false);
  const username = useParams().username;
  const {user, dispatch} = useContext(AuthContext)
  const new_username= useRef();
  const new_password= useRef();
  const new_email= useRef();
  const new_password_again= useRef();
  const current_password = useRef();
  const new_profile_picture = useRef();
  const new_cover_picture = useRef();


  const handleEditButton = () => {
    setEdit(edit ? false : true);
  };

  // const handleLogout= async (e)=>{
  //   localStorage.removeItem("user")
  //   navigate("/");
  // }
  const handleLogout= (e)=>{
    e.preventDefault();
    logoutCall (dispatch);
    localStorage.removeItem("user")
    navigate("/");
  };
  const handleEditSubmit= async (e)=>{
    e.preventDefault();
    if(new_password_again.current.value !== new_password.current.value) {
      new_password.current.setCustomValidity("Passwords do not match. Try again.")
    } else if (current_password !== user.password) {
      current_password.current.setCustomValidity("Incorrect Password.")
    } else {
        try {
            const user = {
                username: new_username.current.value,
                password: new_password.current.value,
                email: new_email.current.value ? new_email.current.value : null,
                profilePicture: new_profile_picture,
                coverPicture: new_cover_picture,
            }
            await UserAPI.updateUserById(user._id, user);
        } catch(err){
            console.log(err);
        }
    }
};

  // get user 
  useEffect(() => {
    const retrieveProfileUser = async () => {
        const res = await UserAPI.getUser(username);
        setProfileUser(res.data);
    };
    retrieveProfileUser();
  }, [username, user]);

  // console checks
  console.log("profile user:")
  console.log(profileUser)
  console.log("logged in user:")
  console.log(user)

  // get posts by user 
  return (
    <>
      <NavBar />
      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={profileUser.profilePicture ? profileUser.coverPicture : require('./images/blue.jpeg')}
                alt="Cover"
              />
              <img
                className="profileUserImg"
                src={profileUser.profilePicture ? profileUser.profilePicture : require('./images/bruin-bear.jpeg')}
                alt="Icon"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{profileUser.username}</h4>
              <span className="profileInfoDesc">{profileUser.desc}</span>
            </div>
          </div>
          <div className="profileBottom">
            
          <div className="profileBottomLeft">

          </div>
          <div className="profileBottomMiddle">
            <ProfileFeed userId={profileUser._id}/>
          </div>

          <div className="profileBottomRight">
            {user && (user._id === profileUser._id) && !edit &&
            <Button className="editButton" variant="outlined" startIcon={<EditIcon />} onClick={handleEditButton}>
              Edit Profile</Button>}
            {user && edit &&
            <form className="editBox" onSubmit={handleEditSubmit}>
                <input 
                    className="loginInput" 
                    placeholder="new username" 
                    type="username"
                    minLength="8"
                    ref={new_username}
                />
                <input 
                    className="loginInput" 
                    placeholder="new email" 
                    type="email"
                    minLength="8"
                    ref={new_email}
                />
                <input 
                    className="loginInput" 
                    placeholder="current password" 
                    type="password"
                    minLength="8"
                    ref={current_password}
                />
                <input 
                    className="loginInput" 
                    placeholder="new password" 
                    type="password"
                    minLength="8"
                    ref={new_password}
                />
                <input 
                    className="loginInput" 
                    placeholder="new password again" 
                    type="password"
                    minLength="8"
                    ref={new_password_again}
                />
                <input 
                    className="loginInput" 
                    placeholder="new profile photo URL" 
                    type="url"
                    ref={new_profile_picture}
                />
                <input 
                    className="loginInput" 
                    placeholder="new cover photo URL" 
                    type="url"
                    ref={new_cover_picture}
                />
                <Button type="submit">Submit</Button>
            </form>}
            {user && <Button className="logoutButton" variant="outlined" startIcon={<LogoutIcon />} onClick={handleLogout}>
              Log Out</Button>}
            </div>
            </div>
          </div>
        </div>
    </>
  );
}