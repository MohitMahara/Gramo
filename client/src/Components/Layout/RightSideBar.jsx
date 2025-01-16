import React from "react";
import { Link } from "react-router-dom";
import { UseFirebase } from "../../Contexts/firebase";


const RightSideBar = () => {
  const {userInfo} = UseFirebase();

  return (
    <div className="rightContainer">

      <div className="d-flex userProfile">
        <div className="d-flex">
          <img src={userInfo?.user.photo} className="profileIcon" alt="profile pic" />
           <div>
                 <p className="username">{userInfo?.user.username}</p>
                 <p className="name">{userInfo?.user.name}</p>
           </div>
     
        </div>
        <Link className="follow-btn">switch</Link>
      </div>

      <p className="mt-3">Recommendation For you</p>

      <div className="recomContainer mt-3">

      <div className="d-flex userProfile mt-3">
        <div className="d-flex">
          <img src="android-chrome-192x192.png" className="profileIcon" alt="profile pic" />
          <p>mohit_mahara171</p>
        </div>
        <Link className="follow-btn">follow</Link>
      </div>

      <div className="d-flex userProfile mt-3">
        <div className="d-flex">
          <img src="android-chrome-192x192.png" className="profileIcon" alt="profile pic" />
          <p>mohit_mahara171</p>
        </div>
        <Link className="follow-btn">follow</Link>
      </div>

      <div className="d-flex userProfile mt-3">
        <div className="d-flex">
          <img src="android-chrome-192x192.png" className="profileIcon" alt="profile pic" />
          <p>mohit_mahara171</p>
        </div>
        <Link className="follow-btn">follow</Link>
      </div>

      <div className="d-flex userProfile mt-3">
        <div className="d-flex">
          <img src="android-chrome-192x192.png" className="profileIcon" alt="profile pic" />
          <p>mohit_mahara171</p>
        </div>
        <Link className="follow-btn">follow</Link>
      </div>
      </div>
    </div>
  );
};

export default RightSideBar;
