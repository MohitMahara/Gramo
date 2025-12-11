import moment from "moment/moment";
import { Link } from "react-router-dom";


export default function PostCard({ post }) {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-md transition-all">
      <div className="flex items-start gap-3 mb-2">
        <Link to={`/profile/${post.userId}`} className="w-10 h-10 bg-blue-500 rounded-full text-white flex items-center justify-center font-bold text-sm">
          {post.Author?.[0]}
        </Link>

        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{post.Author}</h4>
          <span className="text-xs text-gray-500">{moment(post.createdAt).fromNow()}</span>
        </div>
      </div>

      <p className="text-gray-800 text-sm whitespace-pre-line">
        {post.content}
      </p>
    </div>
  );
}
