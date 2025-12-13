import { Link } from "react-router-dom";
import { UseAuth } from "../../context/AuthContext";

export default function ProfileSidebar() {
  const { userInfo } = UseAuth();
  const user = userInfo.user || {};

  return (
    <div className="bg-white shadow p-4 rounded">
      <Link to={`/profile/${user?.username}`} className="text-center">
        <div className="w-20 h-20 mx-auto bg-purple-500 rounded-full flex items-center justify-center text-white mb-4">
          <p className="text-2xl">{user?.name?.charAt(0)}</p>
        </div>
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <p className="text-sm text-gray-500">{user?.headline}</p>
      </Link>
    </div>
  );
}
