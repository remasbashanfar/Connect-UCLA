import * as React from 'react'
import {useEffect, useState, useContext} from 'react'
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
import EditProfileButton from "../../components/editProfileButton.js"


export default function Profile() {
  const navigate = useNavigate();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [profileUser, setProfileUser] = useState({});
  const [edit, setEdit] = useState(false);
  const username = useParams().username;
  const {user, dispatch} = useContext(AuthContext)



  const handleEditButton = () => {
    setEdit(edit ? false : true);
  };

  const handleLogout= (e)=>{
    e.preventDefault();
    logoutCall (dispatch);
    localStorage.removeItem("user")
    navigate("/");
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
            {user && edit && <EditProfileButton> </EditProfileButton>}
            {user && <Button className="logoutButton" variant="outlined" startIcon={<LogoutIcon />} onClick={handleLogout}>
              Log Out</Button>}
            </div>
            </div>
          </div>
        </div>
    </>
  );
}