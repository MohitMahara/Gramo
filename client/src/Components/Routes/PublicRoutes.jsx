import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { UseFirebase } from "../../Contexts/firebase";

const PublicRoutes = () => {
  const { userInfo } = UseFirebase();

  return userInfo.user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
