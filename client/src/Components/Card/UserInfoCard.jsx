export default function UserInfoCard({ user }) {
  return (
    <div className="bg-white rounded shadow p-4 text-center">
      <div className="w-24 h-24 mx-auto rounded-full bg-purple-500 text-white flex items-center justify-center text-2xl font-bold mb-3">
        {user.name?.[0]}
      </div>

      <h2 className="text-xl font-semibold">{user.name}</h2>
      <p className="text-sm text-gray-500">{user.headline}</p>
      <p className="mt-2 text-sm text-gray-700">{user.email}</p>
    </div>
  );
}
