import { useState, useRef } from "react";
import { UseAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { FaYoutube } from "react-icons/fa";
import { IoImageSharp } from "react-icons/io5";

export default function NewPost({ getPosts }) {
  const [media, setMedia] = useState([]);
  const [textContent, setTextContent] = useState("");
  const { userInfo } = UseAuth();
  const [mediaType, setMediaType] = useState(null);
  const userId = userInfo?.user?._id;
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleFilesChange = (e, type) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (media.length === 0) {
      setMediaType(type);
      setMedia(files);
    } else if (mediaType === type) {
      setMedia((prev) => [...prev, ...files]);
    } else {
      toast.error(`Cannot mix ${type}s with ${mediaType}s. Clear files first.`);
      return;
    }

    e.target.value = "";
  };

  const handleRemoveFile = (index) => {
    const newMedia = media.filter((_, i) => i !== index);
    setMedia(newMedia);

    if (newMedia.length === 0) {
      setMediaType(null);
    }
  };

  const handleImageClick = () => {
    if (mediaType === "Video") {
      toast.error("Clear video files first to add images");
      return;
    }
    imageInputRef.current?.click();
  };

  const handleVideoClick = () => {
    if (mediaType === "Image") {
      toast.error("Clear image files first to add video");
      return;
    }
    videoInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!textContent.trim() && media.length === 0) {
        return toast.error("Post cannot be empty");
      }

      const formData = new FormData();
      formData.append("caption", textContent);
      formData.append("userId", userId);

      media.forEach((file) => {
        formData.append("media", file);
      });

      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_API}/api/v1/posts/create-post`,
        formData
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        setTextContent("");
        setMedia([]);
        setMediaType(null);
        getPosts();
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || error.message);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-2 border rounded resize-none text-sm outline-none"
          placeholder="Start a post..."
          rows={3}
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
        />

        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFilesChange(e, "Image")}
        />
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          multiple
          className="hidden"
          onChange={(e) => handleFilesChange(e, "Video")}
        />

        {media.length > 0 && (
          <div className="mt-2 flex gap-2 flex-wrap">
            {media.map((file, idx) => (
              <div
                key={idx}
                className="border rounded px-2 py-1 text-xs flex items-center gap-2"
              >
                <span className="font-medium">{file.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(idx)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between mt-2">
          <div className="flex gap-4">
            <div
              className={`flex gap-2 justify-center items-center ${ mediaType === "Video" ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
              onClick={handleImageClick}
              role="button"
              aria-label="Add images"
            >
              <IoImageSharp size={20} className="text-blue-600" />
              <span className="font-semibold text-gray-700">Image</span>
            </div>

            <div className={`flex gap-2 justify-center items-center ${ mediaType === "Image" ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
              onClick={handleVideoClick}
              role="button"
              aria-label="Add videos"
            >
              <FaYoutube size={20} className="text-green-700" />
              <span className="font-semibold text-gray-700">Video</span>
            </div>
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 cursor-pointer" >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
