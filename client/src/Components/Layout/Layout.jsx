import React from "react";
import RightSideBar from "./RightSideBar";
import LeftSideBar from "./LeftSideBar";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


const Layout = ({ children }) => {
  return (
    <>
      <div className="d-flex">
        <LeftSideBar />
        <main style={{ minHeight: "100vh", minWidth: "45vw" }}>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            draggable
            pauseOnHover
            theme="light"/>
          {children}
        </main>
        <RightSideBar />
      </div>
    </>
  );
};

export default Layout;
