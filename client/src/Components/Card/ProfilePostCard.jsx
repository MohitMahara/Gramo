import { Link } from "react-router-dom";

export default function ProfilePostCard({ post }) {
  return (
    <>
      {post?.media && post?.media?.length > 0 && (
        <Link to={`/p/${post?._id}`} className="rounded shadow hover:shadow-md transition-all mb-1">
              <img
                src={post.media[0].url}
                alt="Post Media"
                className="w-full max-h-96 rounded mb-2"
              />
              <p className="p-2 text-gray-800 text-sm whitespace-pre-line">
                {post?.caption.slice(0, 100)}{post?.caption.length > 100 ? "..." : ""}
              </p>
        </Link>
      )}
      {!post?.media || post?.media?.length === 0 && (
        <Link to={`/p/${post?._id}`}  className=" border border-gray-300 rounded shadow hover:shadow-md transition-all mb-1 p-4">
              <p className="text-gray-800 text-md whitespace-pre-line">{post?.caption}</p>
        </Link>
      )}
    </>
  );
}