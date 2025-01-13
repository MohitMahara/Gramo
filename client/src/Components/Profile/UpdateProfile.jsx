import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import { UseFirebase } from "../../Contexts/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { firebaseApp } from "../../Contexts/firebase";

const UpdateProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name , setName] = useState("");
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const { userInfo, setUserInfo } = UseFirebase();

  const setInitialValues = async() =>{
    try {
       const res = await axios.get(`${process.env.REACT_APP_API}/api/auth/get-user/${userInfo?.user?.uid}`);
       if(res.data.success){
        setName(res.data.user.name);
        setUsername(res.data.user.username);
        if(res.data.user.profilePic){
           setProfilePic(res.data.user.profilePic);
        }
       }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() =>{
     setInitialValues();
  }, [])

  const showModal = () => {
    setIsModalOpen(true);
  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async() =>{
     try {

     const storage = getStorage(firebaseApp);
     const uniqueFileName = `${Date.now()}_${profilePic.name}`;
     const storageRef = ref(storage, `Files/Images/${uniqueFileName}`);

     await uploadBytes(storageRef, profilePic).then((snapshot) =>{
         console.log("Uploaded a file");
     })

      const imgPath = await getDownloadURL(storageRef);

      const res = await axios.put(`${process.env.REACT_APP_API}/api/auth/update-profile/${userInfo?.user?.uid}`, 
        {name, username, imgPath}
      );

      if(res.data.success){
        setIsModalOpen(false);
      }
        
     } catch (error) {
        console.log(error);
     }
  }

  return (
    <>
      <Button type="primary" onClick={showModal} className="ms-auto btn editIcon">
        Edit Profile
      </Button>
      <Modal
        title="Edit Profile"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        >
     <div className='updateProfile formContainer'>
        <form className='loginForm'>

        <div className="form-group">
            <input
              type="file"
              className="form-control"
              id="profilePic"
              placeholder='Upload a picture'
              onChange={(e) =>{
                setProfilePic(e.target.files[0])
              }}
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder='Name'
              value={name}
              onChange={(e) =>{
                setName(e.target.value)
              }}
            />
          </div>

          
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder='Username'
              value={username}
              onChange={(e) =>{
                setUsername(e.target.value)
              }}
            />
          </div>

        </form>
        </div>

      </Modal>
    </>
  );
};

export default UpdateProfile;
