import React, { useState, useEffect } from "react";
import Posts from "../../Components/PostsComponents/Posts";
import { UsePosts } from "./PostContext";
import axios from "axios";
import { Modal } from "antd";
import { UseFirebase } from "../../Contexts/firebase";

const AllPosts = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedPost, setSelectedPost] = useState([]);
  const { posts, setPosts } = UsePosts();
  const [caption , setCaption] = useState("");


  const { userInfo } = UseFirebase();

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

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setCaption(post.caption);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedPost([]);
    setCaption("");

  };

  const handleEditCancel = () =>{
    setIsEditModalOpen(false);
    setSelectedPost([]);
    setCaption("");

  }

  const handlePostUpdate = async() =>{
    try {

      const pid = selectedPost?._id;
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/posts/update-post/${pid}`,
        {caption}
      );

      if (res.data.success) {
         getPosts();
         setIsEditModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Modal
        open={isEditModalOpen}
        onCancel={handleEditCancel}
        footer={null}
        closable={false}
      >
        {selectedPost ? (
          <>
             <div className="card">
                <img src={selectedPost.fileURL} className="card-img"/>
                <div className="caption">
                 <input type="text" value={caption} className="form-control" onChange={(e) => setCaption(e.target.value)}></input>
                </div>
                <button className="btn btn-success" onClick={handlePostUpdate}>update</button>
             </div>
          </>
        ) : null}
      </Modal>


      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        closable={false}
      >
        {selectedPost ? (
          <>
            <Posts post={selectedPost} setIsModalOpen={setIsModalOpen} setIsEditModalOpen={setIsEditModalOpen} />
          </>
        ) : null}
      </Modal>


      <div className="posts">
        <p className="text-center">Posts</p>
        <div className="posts-container container-fluid">
          {posts.map((post) => {
            return post.fileURL ? (
              <>
                <div
                  className="post-card card mt-2 ms-2"
                  onClick={() => {
                    handlePostClick(post);
                  }}
                >
                  <img src={post.fileURL} className="img" />
                </div>
              </>
            ) : (
              <>
                <div
                  className="post-card card mt-2 ms-2 bg-dark text-light"
                  onClick={() => {
                    handlePostClick(post);
                  }}
                >
                  <p className="card-body">{post.caption}</p>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
