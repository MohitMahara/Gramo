import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import axios from "axios";
import { UseFirebase } from "../../Contexts/firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {toast} from "react-toastify";
import { firebaseApp } from "../../Contexts/firebase";

const UpdateProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userInfo, setUserInfo } = UseFirebase();

  const [name , setName] = useState("");
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState("");

  const setInitialValues = () =>{
        setName(userInfo?.user.name);
        setUsername(userInfo?.user.username);
        setPhoto(userInfo?.user.photo);
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
     const uniqueFileName = `${Date.now()}_${photo.name}`;
     const storageRef = ref(storage, `Files/ProfilePicture/${uniqueFileName}`);

     await uploadBytes(storageRef, photo).then((snapshot) =>{
         console.log("Uploaded a file");
     })

     const imgPath = await getDownloadURL(storageRef);

     const uid = userInfo?.user?._id ;

     const res = await axios.put(`${process.env.REACT_APP_API}/api/auth/update-profile/${uid}`, 
        {name, username, imgPath}
      );

      if(res.data.success){

        const updatedUserInfo = {
          ...userInfo,
          user: res.data.user,
          token: userInfo.token,
        };

        setUserInfo(updatedUserInfo);
      
        localStorage.setItem('Gramo', JSON.stringify(updatedUserInfo));

        setIsModalOpen(false);
      }
      else{
        toast(res.data.msg);
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
                setPhoto(e.target.files[0])
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
