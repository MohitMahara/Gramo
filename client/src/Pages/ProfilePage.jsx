import UserInfoCard from "../components/Card/UserInfoCard";
import PostCard from "../components/Card/PostCard";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Layout } from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const {username} = useParams();
  const [postsData, setPostsData] = useState([]);
  const [user, setUser] = useState({});

  const getPosts = async () => {
    try {
       const res = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/v1/posts/userPosts/${uid}`);
       if (res.data.success) {
            setPostsData(res.data.userPosts);
        }
    } catch (error) {
      toast.error(error.message);
    }
  };


  const getUserInfo = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/getUser/${uid}`);
        if (res.data.success) {
            setUser(res.data.user);
        }
    } catch (error) {
        toast.error(error.message);
    }
  }

  useEffect(() => {
    getPosts();
    getUserInfo();
  }, []);


  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen w-full">
        <div className="p-6 max-w-5xl mx-auto space-y-6">
          <UserInfoCard user={user} />
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Posts</h3>
            {postsData.length > 0 ? (
              postsData.map((post) => <PostCard key={post._id} post={post} />)
            ) : (
              <p className="text-sm text-gray-500">No posts yet.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
