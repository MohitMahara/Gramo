import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UseFirebase } from "../../Contexts/firebase";

const ProtectedRoutes = () => {
  const { userInfo } = UseFirebase();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setLoading(false);

  }, [userInfo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return userInfo?.token ? <Outlet /> : <Navigate to="/register" />;
};

export default ProtectedRoutes;
