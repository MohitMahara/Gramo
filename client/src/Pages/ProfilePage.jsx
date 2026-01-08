import UserInfoCard from "../components/Card/UserInfoCard";
import PostCard from "../components/Card/PostCard";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Layout } from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProfilePostCard from "../components/Card/ProfilePostCard";
import { UseAuth } from "../context/AuthContext";
import Btn from "../components/Btn/Btn";

export default function ProfilePage() {
  const {username} = useParams();
  const [postsData, setPostsData] = useState([]);
  const {userInfo} = UseAuth();
  const [user, setUser] = useState({});

  const getPosts = async () => {
    try {
       const res = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/v1/posts/get-posts/${username}`);
       if (res.data.success) {
            setPostsData(res.data.posts);
        }
    } catch (error) {
      toast.error(error.message);
    }
  };


  const getUserInfo = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/user/${username}`);
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
      <div className="bg-white min-h-screen w-full">
        <div className="p-6 max-w-5xl mx-auto space-y-6">
          <UserInfoCard user={user} postsCount={postsData.length} />

           {user?._id === userInfo?.user?._id && (
              <div className="flex gap-3 w-full max-w-lg mx-auto justify-center mb-6">
                 <Btn className={"w-[50%]"} variant="secondary">Edit Profile</Btn>
                 <Btn className={"w-[50%]"} variant="secondary">Settings</Btn>
               </div>
           )}

          <div className="border-t border-gray-400" />
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Posts</h3>
            {postsData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              { postsData.map((post) => <ProfilePostCard key={post._id} post={post} />)}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No posts yet.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}