import React  from "react";
import LeftSideBar from "../../Components/Layout/LeftSideBar";
import { UseFirebase } from "../../Contexts/firebase";
import UpdateProfile from "../../Components/Profile/UpdateProfile";
import AllPosts from "../../Components/PostsComponents/AllPosts";

const ProfilePage = () => {
 
  const { userInfo } = UseFirebase();

  return (
    <>
      <div className="d-flex" style={{ height: "100vh" }}>
        <LeftSideBar />
        <div className="profilePageContainer container-fluid">
          <div className="profile-card">
            <div className="infoContainer d-flex">
              <img
                src={userInfo?.user.photoURL}
                alt="Profile Picture"
                className="profileIcon"
              />
              <div className="user-info">
                <div className="d-flex">
                  <p className="username">{userInfo?.user.username}</p>
                  <UpdateProfile />
                </div>

                <div className="d-flex">
                  <p>0 posts</p>
                  <p>0 following</p>
                  <p>0 followers</p>
                </div>
                <p>{userInfo?.user.name}</p>
              </div>
            </div>
            <hr className="mt-3" />
             <AllPosts/>
          </div>
        </div>
      </div>
    </>
  );
}


export default ProfilePage;
