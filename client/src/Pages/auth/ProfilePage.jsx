import React, { useEffect, useState } from "react";
import LeftSideBar from "../../Components/Layout/LeftSideBar";
import { UseFirebase } from "../../Contexts/firebase";
import UpdateProfile from "../../Components/Profile/UpdateProfile";
import axios from "axios";
import { Modal } from "antd";
import Posts from "../../Components/PostsComponents/Posts";

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const { userInfo } = UseFirebase();
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const username = userInfo?.user.username;
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/posts/get-posts/${username}`
      );

      if (res.data.success) {
        setPosts(res.data.posts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);



  const handlePostClick = (post) =>{
    setSelectedPost(post);
    setIsModalOpen(true);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

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

            <Modal
               open={isModalOpen}
               onCancel={handleCancel}
               footer={null}
            >

            {selectedPost ? <>

             <Posts/>
            </> : null}


            </Modal>
            <div className="posts">
              <p className="text-center">Posts</p>
              <div className="posts-container container-fluid">
                {posts.map((post) => {
                  return post.fileURL ? (
                    <>
                        <div className="post-card card mt-2 ms-2" onClick={() => {handlePostClick(post)} } >
                          <img src={post.fileURL} className="img" />
                        </div>
                    </>
                  ) : (
                    <>
                         <div className="post-card card mt-2 ms-2 bg-dark text-light" onClick={() => {handlePostClick(post)}}>
                          <p className="card-body">{post.caption}</p>
                        </div>
                      
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
