import toast from "react-hot-toast";
import NewPost from "./NewPost";
import { useState } from "react";
import { useEffect } from "react";
import PostCard from "../Card/PostCard";
import axios from "axios";


export default function Feed() {

  const [posts, setPosts] = useState([]);

  const getPosts = async() => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/v1/posts/getPosts`);
      if (res.data.success) {
        setPosts(res.data.posts);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
     getPosts();
  }, []);



  return (
    <div className="space-y-4">
      <NewPost getPosts={getPosts}/>
      {posts?.map((post) => (
        <PostCard key={post?.id} post={post} />
      ))}
    </div>
  );
}
