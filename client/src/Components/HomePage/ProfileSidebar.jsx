import { Link } from "react-router-dom";
import { UseAuth } from "../../context/AuthContext";

export default function ProfileSidebar() {
  const { userInfo } = UseAuth();
  const user = userInfo.user || {};

  return (
    <div className="bg-white shadow p-4 rounded">
      <Link to={`/profile/${user?.username}`} className="text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-purple-500 flex items-center justify-center mb-3">
          {user?.photoURL ? (
              <img
                src={user?.photoURL?.url}
                alt={`${user?.name} profile`}
                className="h-full w-full rounded-full"
              />
          ) : (
              <p className="text-white text-2xl font-semibold">
                {user.name?.[0]}
              </p>
          )}
        </div>
        
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <p className="text-sm text-gray-500">{user?.headline}</p>
      </Link>
    </div>
  );
}
