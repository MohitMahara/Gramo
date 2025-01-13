import { initializeApp } from "firebase/app";
import { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();

// Firebase Initialization

const firebaseConfig = {
  apiKey: "AIzaSyCY9RHLCoIMLshXmvsbs4QkNYG08zlhCTM",
  authDomain: "gramo-2a37a.firebaseapp.com",
  projectId: "gramo-2a37a",
  storageBucket: "gramo-2a37a.appspot.com",
  messagingSenderId: "913691875211",
  appId: "1:913691875211:web:49a409e8a6cf9b1500018e",
  measurementId: "G-ZDTZ9G2CW1",
};


export const firebaseApp = initializeApp(firebaseConfig);

// Firebase context

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {

  const [userInfo, setUserInfo] = useState({
    user: null,
    token: null,
  });

  // Default header for all requests made via axios.

  axios.defaults.headers.common['Authorization'] =  userInfo?.token

  useEffect(() => {
    const data = localStorage.getItem("gramo");

    if (data) {
      const parseData = JSON.parse(data);

      setUserInfo({
        ...userInfo,
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, []);





  return (
    <FirebaseContext.Provider value={{ userInfo, setUserInfo}}>
      {children}
    </FirebaseContext.Provider>
  );
};

// custome hooks

export const UseFirebase = () => useContext(FirebaseContext);
