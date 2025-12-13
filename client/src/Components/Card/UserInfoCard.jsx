import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";


export default function UserInfoCard({ user, postsCount }) {

  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);


  const getFollowersCount = async() => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/user/followers-count/${user?._id}`);
      if(res.data.success){
        setFollowersCount(res.data.count);
      }

    }catch(error){
     toast.error(error.message); 
    }

  }


  const getFollowingCount = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/user/following-count/${user?._id}`);
      if(res.data.success){
        setFollowingCount(res.data.count);
      }
    }catch(error){
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if(user?._id){
    getFollowersCount();
    getFollowingCount();
    }
  }, [user?._id]);

  return (
    <div className="bg-white rounded shadow p-4 text-center">
      <div className="w-24 h-24 mx-auto rounded-full bg-purple-500 text-white flex items-center justify-center text-2xl font-bold mb-3">
        {user.name?.[0]}
      </div>

      <h2 className="text-xl font-semibold">{user.name}</h2>
      <p className="text-sm text-gray-500">{user.username}</p>
      <div className="mt-2 flex justify-center gap-8">
          <div>
            <p>Posts</p>
            <p className="font-semibold text-center">{postsCount}</p>
          </div>
          <div>
            <p>Followers</p>
            <p className="font-semibold text-center">{followersCount}</p>
          </div>
          <div>
            <p>Following</p>
            <p className="font-semibold text-center">{followingCount}</p>
          </div>
      </div>
    </div>
  );
}