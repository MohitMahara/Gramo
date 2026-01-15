import React from "react";
import "./styles/App.css";
import { Routes, Route, Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { HomePage } from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import ContactUsPage from "./pages/ContactUsPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProtectedRoute from "./components/Routes/ProtectedRoutes";

function App() {
  return <>
  <Toaster position="top-center" /> 
  <Routes>
    <Route path="/" element={<ProtectedRoute><HomePage/></ProtectedRoute>} />
    <Route path="/profile/:usr" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>} />
    <Route path="/messages" element={<ProtectedRoute><ChatPage/></ProtectedRoute>} />
    <Route path="/contactUs" element={<ProtectedRoute><ContactUsPage/></ProtectedRoute>} />
    <Route path="/login" element={<LoginPage/>} />
    <Route path="/register" element={<RegisterPage/>} />

  </Routes>
  </>;
}

export default App;
