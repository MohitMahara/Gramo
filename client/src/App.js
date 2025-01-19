import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/auth/LoginPage";
import RegisterPage from "./Pages/auth/RegisterPage";
import ProfilePage from "./Pages/auth/ProfilePage";
import ProtectedRoutes from "./Components/Routes/ProtectedRoutes";
import PublicRoutes from "./Components/Routes/PublicRoutes";
import CreatePost from "./Pages/posts/createPost";

function App() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create-post" element={<CreatePost/>} />
      </Route>
    </Routes>
  );
}

export default App;
