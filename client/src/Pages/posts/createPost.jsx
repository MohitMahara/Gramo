import React, { useState } from "react";
import LeftSideBar from "../../Components/Layout/LeftSideBar.jsx";
import { UseFirebase } from "../../Contexts/firebase.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { firebaseApp } from "../../Contexts/firebase";

const CreatePost = () => {
  const { userInfo } = UseFirebase();
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {

      let filePath;

      if(file instanceof File){
      const storage = getStorage(firebaseApp);
      const uniqueFileName = `${Date.now()}_${file.name}`;
      const storageRef = ref(storage, `Files/Posts/${uniqueFileName}`);

      await uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Uploaded a file");
      });

      filePath = await getDownloadURL(storageRef);
    }

      const username = userInfo?.user?.username;

      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/posts/create-post/${username}`,
        {
          filePath,
          caption,
        }
      );

      if (res.data.success) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="d-flex">
        <LeftSideBar />

        <div className="createPost container">
          <h2 className="pt-3">Create new Post</h2>

          <div className="posts card">
            <div className="d-flex userProfile mt-3">
              <img
                src={userInfo?.user?.photoURL}
                className="profileIcon"
                alt="profile pic"
              />
              <p className="profile-name">mohit_mahara171</p>
            </div>

            <div className="card-body post-image">
              <div className="post-file">
                <input
                  type="file"
                  className="form-control"
                  placeholder="Upload file"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
              </div>

              <div className="post-text">
                <p className="caption">
                  <input
                    type="text"
                    name="caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                  />
                </p>
              </div>
            </div>
          </div>

          <input
            type="submit"
            className="btn submitBtn"
            value="post"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default CreatePost;
