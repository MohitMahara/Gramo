import {useState} from "react";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import {Bookmark, Heart, MessageCircle} from "lucide-react";
import toast from "react-hot-toast";
import axios  from "axios";
import { UseAuth } from "../../context/AuthContext";


export default function PostCard({ post }) {
 const {userInfo} = UseAuth();
 const [isLiked, setIsLiked] = useState(false);
 const [isSaved, setIsSaved] = useState(false);
 const [isFollowing, setIsFollowing] = useState(false);
 const uid = userInfo?.user?._id;

 const handleLike = async() => {
   try {
      if (res.data.success) {
        toast.success(res.data.msg);
        setIsLiked(res.data.liked);
      }
   } catch (error) {
     toast.error(error.message);
   }
 }

 const handleComment = async() => {
   try {
    
   } catch (error) {
     toast.error(error.message);
   }
 }


 const handleSave = async() => {
   try {
      if (res.data.success) {
        toast.success(res.data.msg);
        setIsLiked(res.data.liked);
      }
   } catch (error) {
     toast.error(error.message);
   }
 }


 const handleFollow = async() => {
    try {

      const followerId = uid;
      const followingId = post?.userId?._id;

      if(!followerId){
        return toast.error("Please login to follow users");
      }

      if(!followerId){
        return toast.error("Invalid User");
      }

      const res = await axios.post(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/user/follow`, { followerId, followingId });
     
      if (res.data.success) {
        toast.success(res.data.msg);
        setIsFollowing(res.data.following);
      }

    }catch(error){
      toast.error(error.message);
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition-all">
      <div className="flex justify-between items-center mb-3">
      <div className="flex items-start gap-3 mb-2">
        {post?.userId?.photoURL ? (
          <Link to={`/profile/${post?.userId?.username}`}>
            <img src={post?.userId?.photoURL?.url} alt="User Avatar" className="w-10 h-10 rounded-full object-cover"/>
          </Link>
        ) : (
          <Link to={`/profile/${post?.userId?.username}`} className="w-10 h-10 bg-blue-500 rounded-full text-white flex items-center justify-center font-bold text-sm">
            {post?.userId?.name[0]}
          </Link>
         )
        }

        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{post?.userId?.username}</h4>
          <span className="text-xs text-gray-500">
            {moment(post?.createdAt).fromNow()}
          </span>
        </div>
      </div>
        {uid !== post?.userId?._id &&
         <div className="mb-3">
             <button className="text-blue-600 text-md cursor-pointer" onClick={handleFollow}>{isFollowing ? "Following" : "Follow"}</button>
          </div>
        }
      </div>

      {post?.media && post?.media?.length > 0 && (
        <div className="mb-2">
          {post?.media.map((mediaItem, idx) =>
            mediaItem.fileType.startsWith("image") ? (
              <img
                key={idx}
                src={mediaItem.url}
                alt="Post Media"
                className="w-full max-h-96 rounded mb-2"
              />
            ) : mediaItem.fileType.startsWith("video") ? (
              <video
                key={idx}
                src={mediaItem.url}
                controls
                className="w-full max-h-96 rounded mb-2"
              />
            ) : null
          )}
        </div>
      )}

      <p className="text-gray-800 text-sm whitespace-pre-line">
        {post?.caption}
      </p>

      <div className="border-t border-gray-300 my-3"></div>

      <div className="w-full flex justify-between gap-6 mt-4">
        <div className="flex gap-4">
        <div className="flex items-center gap-1 text-gray-600 hover:text-red-500 cursor-pointer" role="button" onClick={handleLike}>
          <Heart size={20} />
          <span className="text-sm">Like</span>
        </div>
        <div className="flex items-center gap-1 text-gray-600 hover:text-blue-500 cursor-pointer" role="button" onClick={handleComment}>
          <MessageCircle size={20} />
          <span className="text-sm">Comment</span>
        </div>
        </div>
        <div className="flex items-center gap-1 text-gray-600 hover:text-green-500 cursor-pointer" role="button" onClick={handleSave}>
          <Bookmark size={20} />
          <span className="text-sm">Save</span>
        </div>
      </div>

    </div>
  );
}