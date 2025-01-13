import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import AuthHeader from "./authHeader";


const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isTaken, setIsTaken] = useState(false);
  const navigate = useNavigate();

  function generateUsername(Name) {
    const uniqueId = uuidv4().slice(0, 8);
    return `${Name}_${uniqueId}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password.length < 6) {
        toast.error("Password must contain atleast 6 characters");
        return;
      }

      if (password !== conPassword) {
        toast.error( "Password and confirm password does not matched")
        return;
      }

      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/register`,
        {
          name,
          email,
          username,
          password,
        }
      );

      if (res.data.success) {
        toast("Registered Successfully");
        navigate("/login");
      }
    } catch (error) {
      const { msg } = error.response.data;
      toast.error(msg);
    }
  };

  const isUsernameExists = async () => {
    try {
      if (username === "") return false;
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/auth/username-exists`,
        { username }
      );
      return res.data.success;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkUsername = async () => {
      const exists = await isUsernameExists();
      setIsTaken(exists);
    };

    checkUsername();
  }, [username]);

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
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required
              />
              {isTaken ? (
                <>
                  <small className="text-primary">
                    This Username is already taken.
                  </small>
                </>
              ) : null}
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
                required
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
                required
              />
              <small className="text-primary">
                The password should contain atleast 6 characters
              </small>
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm Password"
                value={conPassword}
                onChange={(e) => {
                  setConPassword(e.target.value);
                }}
                required
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

            <div className="form-group signUpCheck">
              <p>
                Have an account ?{" "}
                <NavLink className="link" to={"/login"}>
                  Login
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
