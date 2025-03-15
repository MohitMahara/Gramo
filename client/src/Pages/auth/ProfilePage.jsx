import React, { useEffect, useState }  from "react";
import LeftSideBar from "../../Components/Layout/LeftSideBar";
import UpdateProfile from "../../Components/Profile/UpdateProfile";
import AllPosts from "../../Components/PostsComponents/AllPosts";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const {username} = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const getUser = async() =>{
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/auth/get-user/${username}`);

      if(res.data.success){
       setUser(res.data.user);
      }
      else{
        alert("user not found");
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() =>{
    getUser();
  }, [username])

  return (
    <>
      <div className="d-flex" style={{ height: "100vh" }}>
        <LeftSideBar />
        <div className="profilePageContainer container-fluid">
          <div className="profile-card">
            <div className="infoContainer d-flex">
              <img
                src={user?.photoURL}
                alt="Profile Picture"
                className="profileIcon"
              />
              <div className="user-info">
                <div className="d-flex">
                  <p className="username">{user?.username}</p>
                  <UpdateProfile />
                </div>

                <div className="d-flex">
                  <p>0 posts</p>
                  <p>0 following</p>
                  <p>0 followers</p>
                </div>
                <p>{user?.name}</p>
              </div>
            </div>
            <hr className="mt-3" />
             <AllPosts user={user}/>
          </div>
        </div>
      </div>
    </>
  );
}


export default ProfilePage;
