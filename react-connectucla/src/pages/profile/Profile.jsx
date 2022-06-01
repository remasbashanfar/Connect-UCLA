import * as React from 'react'

// Context API 
import {useEffect, useState, useContext} from 'react'
import {AuthContext} from "../../context/AuthContext"
import "./profile.css";
import NavBar from "../../components/navbar";
import { useParams, useNavigate } from "react-router-dom";
import UserAPI from '../../services/user';
import ProfileFeed from "../../components/profile-feed/profile-feed.js"
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import {logoutCall} from "../../services/loginCall"
import EditProfileButton from "../../components/editProfileButton.js"
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import Badge from '@mui/material/Badge';
import FeedbackIcon from '@mui/icons-material/Feedback';
import IconButton from '@mui/material/IconButton';
import {Link} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { lightBlue } from '@mui/material/colors';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Box from '@mui/material/Box';

export default function Profile() {
  const Navigate = useNavigate();
  const [profileUser, setProfileUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState();
  const [isFollowing, setIsFollowing] = useState();
  const [isRequested, setIsRequested] = useState();
  const username = useParams().username;
  const {user, dispatch} = useContext(AuthContext);
  //const [isOwnProfile] = useState(user.following.includes(profileUser.username));  
  console.log("user:")
  console.log(user)
  console.log("profileUser:")
  console.log(profileUser)
  // follow requests interface 

  // get profile data interface 
  useEffect(() => {
    const retrieveProfileUser = async () => {
        const res = await UserAPI.getUser(username);
        setProfileUser(res.data);
        setIsFollowing(user.following.includes(res.data.username));
        setIsRequested(res.data.followRequests.includes(user.username));
        setIsOwnProfile(user === res.data)
    };
    retrieveProfileUser();
  }, [username, user]);

  // follow user interface
  const handleFollow = async () => {
    try {
      if (user.following.includes(profileUser.username)) {
        await UserAPI.unfollowUser(user, profileUser)
        dispatch({ type: "UNFOLLOW", payload: profileUser.username });
      } else if (user.followRequests.includes(profileUser.username)) {
        await UserAPI.unfollowUser(user, profileUser)
      } else {
        // followUser function checks if profile is private 
        await UserAPI.followUser(user, profileUser)
        if (user.isPrivate){
          //setIsRequested(true)
        } else {
          dispatch({ type: "FOLLOW", payload: profileUser.username });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAcceptFollow = async (username) =>{
    try {
      await UserAPI.acceptFollowRequest(user, username)
      dispatch({type: "ACCEPT_FOLLOW", payload: profileUser.username});
    } catch (err) {
      console.log(err);
    }
  }
  // update profile interface 
  const handleEditButton = async () => {
    setEdit(edit ? false : true);
  };

  // logout user interface
  const handleLogout= (e)=>{
    e.preventDefault();
    logoutCall(dispatch);
    Navigate("/");
  };
  //follow  / unfollow / request button render control
  function FollowButton() {
    if (isOwnProfile) {
      if (isFollowing) {
        return (
          <Button
            variant="outlined" 
            startIcon={<GroupRemoveIcon />} 
            onClick={handleFollow}>
            Unfollow
          </Button>
        )
      } else if (isRequested) {
        return (
        <Button
          variant="outlined" 
          startIcon={<MoreHorizIcon />} 
          onClick={handleFollow}>
          Requested
        </Button>  
        )
      } else {
        return (
        <Button
          variant="outlined" 
          startIcon={<GroupAddIcon />} 
          onClick={handleFollow}>
          Follow
        </Button>  
        )
      }
    } else {
      return (
      <Button 
        variant="outlined" 
        startIcon={<EditIcon />} 
        onClick={handleEditButton}>
        Edit Profile
      </Button>
      )
    }
  }

  function checkFollowRequests(requests) {
    return (
      <AvatarGroup total={user.followRequests.length}>
      {user.followRequests.map((request) => (
          <Link to={`/profile/${request}`}>
            <Avatar sx={{ bgcolor: lightBlue[400] }}>{request.charAt(0)}</Avatar>
          </Link> 
        ))
      }
    </AvatarGroup>
    )
  }

  function FollowRequests() {
    if (isOwnProfile && user.followRequests.length >= 0) {
      return (
        <IconButton onClick={checkFollowRequests(user.followRequests)}> 
          <Badge badgeContent={user.followRequests.length} color="primary">
            <FeedbackIcon color="action" />
          </Badge>
        </IconButton>
      )
    }
  }


  return (
    <div>
      <NavBar />
        <div className="profile">

            <div className="profileTop">
     

            <div className="profileCover">

                <img
                  className="profileCoverImg"
                  src={profileUser.profilePicture ? profileUser.coverPicture : require('./images/blue.jpeg')}
                  alt="Cover"
                />
                <img
                  className="profileUserImg"
                  src={profileUser.profilePicture ? profileUser.profilePicture : require('./images/default-bruin.webp')}
                  alt="Icon"
                />
                <Box classname="profileInfoBox"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', md: 'flex-start' },
                    m: 3,
                    minWidth: { md: 350 },
                  }}
                  >
                  <Box component="span" sx={{ fontSize: 40, mt: 1 }}>
                    {profileUser.username}
                  </Box>
                  <Box component="span" sx={{ fontSize: 24 }}>
                    {profileUser.description}
                  </Box>
                  <FollowButton />
                  <FollowRequests/>
                  {!isOwnProfile && user.followRequests.includes(profileUser.username) &&
                  <Button onClick={handleAcceptFollow}>
                    <PersonAddOutlinedIcon>
                    </PersonAddOutlinedIcon>Accept Follow Request
                  </Button>
                  }   
                  </Box>
              
              
              </div>
            </div>
            
            
            <div className="profileBottom">
              <div className="profileBottomLeft">

              </div>
              <div className="profileBottomMiddle">
                <ProfileFeed username="ParkJimin"/>
              </div>


              <div className="profileBottomRight">
                {/* {user && (user._id === profileUser._id) && !edit &&
                <Button className="profileButton" variant="outlined" startIcon={<EditIcon />} onClick={handleEditButton}>
                  Edit Profile</Button>} */}
                {user && edit && <EditProfileButton> </EditProfileButton>}
                {/* {user && <Button className="profileButton" variant="outlined" startIcon={<LogoutIcon />} onClick={handleLogout}>
                  Log Out</Button>} */}
                {/* {(user.username !== profileUser.username) && 
                <Button className="profileButton" variant="outlined" 
                startIcon={user.following.includes(profileUser.username) ? <GroupRemoveIcon/> : <GroupAddIcon/>} 
                onClick={handleFollow}> */}
              </div>
          </div>
        </div>
      </div>
    );
  }
