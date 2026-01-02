import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserInfoCard({ user, postsCount }) {
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const getFollowersCount = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/api/v1/auth/user/followers-count/${
          user?._id
        }`
      );
      if (res.data.success) {
        setFollowersCount(res.data.count);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getFollowingCount = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_API}/api/v1/auth/user/following-count/${
          user?._id
        }`
      );
      if (res.data.success) {
        setFollowingCount(res.data.count);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user?._id) {
      getFollowersCount();
      getFollowingCount();
    }
  }, [user?._id]);

  return (
    <div className="w-full">
      <div className="flex gap-6 mx-auto w-full max-w-lg my-2 p-6">
        <div className="w-36 h-36 rounded-full bg-purple-500 text-white flex items-center justify-center text-5xl font-semibold mb-3">
          {user.name?.[0]}
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-md text-gray-500">{user.username}</p>
          <div className="mt-2 flex justify-center gap-8">
            <div className="flex gap-2 text-sm">
              <p className="font-semibold text-center">{postsCount}</p>
              <p>Posts</p>
            </div>
            <div className="flex gap-1 text-sm">
              <p className="font-semibold text-center">{followersCount}</p>
              <p>Followers</p>
            </div>
            <div className="flex gap-1 text-sm">
              <p className="font-semibold text-center">{followingCount}</p>
              <p>Following</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
