import React from 'react'
import { NavLink } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


function AuthHeader() {
  return (
      <>
        <NavLink className="navbar-brand d-flex" href="/">
          <h3>Gramo</h3>
        </NavLink>

        <ToastContainer
          position="top-center"
          autoClose={2000}
          draggable
          pauseOnHover
          theme="light"
        />

      </>
  )
}

export default AuthHeader;