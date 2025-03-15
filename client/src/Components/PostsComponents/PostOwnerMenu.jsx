import React from "react";
import { Dropdown, Menu, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import { UsePosts } from "./PostContext";
import { UseFirebase } from "../../Contexts/firebase";
import axios from "axios";

const PostOwnerMenu = ({post, setIsModalOpen, setIsEditModalOpen}) => {
  
  const { posts, setPosts } = UsePosts();
  const {userInfo} = UseFirebase();
  
  const items = [
     {key : 1, label : "Edit"},
     {key : 2, label : "Delete"},
  ]

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


  const handleMenuBtn  = ({key}) =>{

      if (key == 1) {
        handleEdit();
      } else if (key == 2) {
        handleDelete();

      } 
  }
  
  const handleEdit = () =>{
   try {
    setTimeout(() =>{
      setIsModalOpen(false);
      setIsEditModalOpen(true);
    }, 100)
      
   } catch (error) {
     console.log(error);
   }

  }

  const handleDelete = async() =>{
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API}/api/posts/delete-post/${post?._id}`);
      if(res.data.success){
        getPosts();
        setIsModalOpen(false);
      }
      else{
        console.log("Post not found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dropdown menu={{items, onClick : handleMenuBtn}} trigger={["click"]} placement="bottomRight">
      <button className="more-btn">
        <MoreOutlined style={{ fontSize: "20px" }} />
      </button>
    </Dropdown>
  );
};

export default PostOwnerMenu;
