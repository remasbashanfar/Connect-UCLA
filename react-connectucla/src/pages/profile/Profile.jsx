import * as React from 'react'
import {useEffect, useState } from 'react'
import "./profile.css";
import NavBar from "../../components/navbar";
import { useParams } from "react-router";
import UserAPI from '../../services/user';

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  console.log(username);
  // get user 
  useEffect(() => {
    const retrieveUser = async () => {
        const res = await UserAPI.getUser(username);
        setUser(res.data);
    };
    retrieveUser();
  }, [username]);
  console.log("retrieved user: "+ user);

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
                src={user.coverPicture}
                alt="Cover"
              />
              <img
                className="profileUserImg"
                src={user.profilePicture}
                alt="Icon"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
          </div>
        </div>
      </div>
    </>
  );
}