import * as React from 'react'

// Context API 
import {useEffect, useState, useContext} from 'react'
import {AuthContext} from "../../context/AuthContext"
import "./profile.css";
import FormControlLabel from '@mui/material/FormControlLabel';
import NavBar from "../../components/navbar";
import { useParams, useNavigate } from "react-router-dom";
import UserAPI from '../../services/user';
import ProfileFeed from "../../components/profile-feed/profile-feed.js"
import RSVPFeed from "../../components/profile-feed/rsvp-feed.js"
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
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
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import Typography from '@mui/material/Typography';

export default function Profile() {
  const Navigate = useNavigate();
  const [profileUser, setProfileUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState();
  const [isFollowing, setIsFollowing] = useState();
  const [isRequested, setIsRequested] = useState();
  const [isOrganization, setIsOrganization] = useState();
  const [swapFeed, setSwapFeed] = useState(false);
  const [displayRequests, setDisplayRequests] = useState(false);
  const username = useParams(false).username;
  const {user, dispatch} = useContext(AuthContext);
  
  // BUTTON TOGGLES
    const handleSwap = () => {
      setSwapFeed(swapFeed ? false : true);
    };
    const handleRequests = () => {
      setDisplayRequests(displayRequests ? false : true);
    };
    const handleEditButton = () => {
      setEdit(edit ? false : true);
      setEdit(!edit);
    };
  // get profile data interface 
  useEffect(() => {
    const retrieveProfileUser = async () => {
        const res = await UserAPI.getUser(username);
        setProfileUser(res.data);
        setIsFollowing(user.following.includes(res.data.username));
        setIsRequested(res.data.followRequests.includes(user.username));
        setIsOwnProfile(user.username === res.data.username)
        setIsOrganization(user.isOrganization)
    };
    retrieveProfileUser();
  }, [username, user, swapFeed]);

  // accept or deny follow request
  // const handleFollowRequest = async (bool) => {
  //   // accepted
  //   try {
  //     await UserAPI.acceptFollow(user.username, profileUser.username, bool)
  //     dispatch({ type: "FOLLOW", payload: profileUser.username });
  //   } catch (err) {
  //     console.log(err)
  //   }   
  // }
  const handleFollow = async (props) => {
    const isrequested = props.requested;
    const isfollowing = props.following;
    try {
      if (isfollowing) {
        await UserAPI.unfollowUser(user, profileUser)
        dispatch({ type: "UNFOLLOW", payload: profileUser.username });
      } else if (isrequested) {
        await UserAPI.unfollowUser(user, profileUser)
        setIsRequested(false)
      } else {
        // followUser function checks if profile is private 
        await UserAPI.followUser(user, profileUser)
        if (profileUser.isPrivate){
          setIsRequested(true)
        } else {
          dispatch({ type: "FOLLOW", payload: profileUser.username });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  //follow  / unfollow / request button render control
  function FollowButton(props) {
    const isownprofile = props.ownprofile;
    const isrequested = props.requested;
    const isfollowing = props.following;
    if (!isownprofile) {
      if (isfollowing) {
        return (
          <Button
            variant="contained" 
            startIcon={<GroupRemoveIcon />} 
            onClick={() => handleFollow(props)}>
            Unfollow
          </Button>
        )
      } else if (isrequested) {
        return (
        <Button
          variant="outlined" 
          startIcon={<MoreHorizIcon />} 
          onClick={() => handleFollow(props)}>
          Requested
        </Button>  
        )
      } else {
        return (
        <Button
          variant="outlined" 
          startIcon={<GroupAddIcon />} 
          onClick={() => handleFollow(props)}>
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
  // toggle on and off the follow requests 
  function FollowRequests() {
    if (isOwnProfile && user.followRequests.length > 0) {
      return (
        <IconButton onClick={handleRequests}> 
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
                  src={profileUser.coverPicture  ? profileUser.coverPicture : require('./images/clouds-default.jpeg')}
                  alt="Cover"
                />
                <img
                  className="profileUserImg"
                  src={profileUser.profilePicture ? profileUser.profilePicture : require('./images/default-bruin.webp')}
                  alt="Icon"
                />
              </div>
            </div>
            <Box classname="profileInfoBox"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    m: 0,
                    minWidth: { md: 300 },
                    maxHeight: '200px',
                    borderBottom: 2, 
                    borderColor: 'gold',
                  }}
                  >
                  <Box component="span" sx={{ fontSize: 40, mt: 1, display:'flex', flexDirection:'row'}}>
                    {profileUser.username}
                    {/* {isOrganization &&
                       <Avatar alt="Verified Club" src={require('./images/verified-crest.png')}/> }
                    {isOrganization &&
                       <Typography size='small' color='inherit'>club</Typography>} 
                      */}
                    </Box>
                  <Box component="span" sx={{ fontSize: 24 }}>
                    {profileUser.description}
                  </Box>
                  <Box sx={{display:'flex', flexDirection:'row', alignItems:"" }}>
                  <FollowButton following={isFollowing} requested={isRequested} ownprofile={isOwnProfile}/>
                  {isOrganization &&
                       <Avatar alt="Verified Club" src={require('./images/verified.png')}/> }
                    {isOrganization &&
                       <Typography size='small' color='#064270'>club</Typography>}
                  <FollowRequests/>
                  {isOwnProfile && displayRequests && 
                    <AvatarGroup total={user.followRequests.length}>
                      {user.followRequests.map((request) => (
                          <Link to={`/profile/${request}`}>
                            <Avatar sx={{ bgcolor: '#064270' }}>{request.charAt(0)}</Avatar>
                          </Link> 
                        ))
                      }
                    </AvatarGroup>
                  }
                  </Box>
                   {/* {user.followRequests.includes(username) &&
                  <Button 
                    onClick={() => handleFollowRequest(user.username, profileUser.username, accept)}>
                    <PersonAddOutlinedIcon/>
                    Accept Follow Request
                  </Button>
                  }
                 */}
              {!swapFeed && <Button onClick={handleSwap}>See RSVPs</Button>}
              {swapFeed && <Button onClick={handleSwap}>Return to Posts</Button>}   
            </Box>

            <div className="profileBottom">
                {user && edit && <EditProfileButton> </EditProfileButton>}
                {swapFeed ? <RSVPFeed username={username}/> : <ProfileFeed username={username}/>}
          </div>
        </div>
      </div>
    );
  }
