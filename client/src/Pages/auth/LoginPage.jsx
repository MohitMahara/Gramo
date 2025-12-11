import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthHeader } from './AuthHeader';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UseAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {userInfo, setUserInfo} = UseAuth();


  const handleSubmit = async(e) => {
    e.preventDefault();
    try{

      if (!email || !password) {
        toast.error('Please fill in all fields');
        return;
       }

       const res = await axios.post(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/login`, {email, password});
       
       if(res.data.success){
        toast.success(res.data.msg);
        setUserInfo({
          ...userInfo,
          user: res.data.user,
          token: res.data.token
        });
        localStorage.setItem("gramo-auth", JSON.stringify(res.data));
        navigate("/");
       }

    }catch(error){
        toast.error(error.message);
    }
  };

  return (
    <>
    <AuthHeader/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />
          </div>

          <div className="">
            <Link to="/register" className="text-sm text-blue-600 hover:underline">Don't have an account? Register</Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Login
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
