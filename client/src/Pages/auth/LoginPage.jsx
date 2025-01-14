import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { UseFirebase } from "../../Contexts/firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast} from "react-toastify";
import AuthHeader from "./authHeader";

const LoginPage = () => {
  const { userInfo, setUserInfo, signInGoogle} = UseFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/login`, {
          email, password
      });


      if(res.data.success){
        toast.success("Login Successfully");
     
        setUserInfo({
          ...userInfo,
          user: res.data.user,
          token: res.data.token,
        });

        localStorage.setItem("gramo", JSON.stringify(res.data));

        navigate("/");
      }

    } catch (error) {
      const {msg} = error.response.data;
      toast.error(msg);
    }
  };

  function generateUsername(Name) {
    const uniqueId = uuidv4().slice(0, 8);
    return `${Name}_${uniqueId}`;
  }


  const loginwithGoogle = async (e) => {
    e.preventDefault();
    try {
      const snapshot = await signInGoogle();
      const name = snapshot?.user.displayName;
      const uid = snapshot?.user.uid;
      const email = snapshot?.user.email;
      const idtoken = snapshot?._tokenResponse.idToken;
      const username = generateUsername(name);

      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/register`,
        {
          name,
          email,
          username,
          uid,
        }
      );

      let data;
      const getUser = await axios.get(
        `${process.env.REACT_APP_API}/api/auth/get-user/${uid}`
      );

      if (getUser.data.success) {
        data = {
          user: getUser.data.user,
          token: idtoken,
        };

        setUserInfo({
          ...userInfo,
          user: data.user,
          token: data.token,
        });
  
        localStorage.setItem("gramo", JSON.stringify(data));
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-fluid login-container">
        <AuthHeader/>
        <div className="formContainer">
          <form className="loginForm">
            <div className="login-header">
              <h1>Hi there !</h1>
              <p>Welcome to gramo.</p>
            </div>

            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn submitbtn"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>

            <p>OR</p>

            <div className="form-group">
              <button
                type="submit"
                className="btn submitbtn googlebtn"
                onClick={loginwithGoogle}
              >
                <FaGoogle className="me-2" />
                Log in with Google
              </button>
            </div>

            <div className="form-group signUpCheck">
              <p>
                Don't have an account ?{" "}
                <NavLink className="link" to={"/register"}>
                  SignUp
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
