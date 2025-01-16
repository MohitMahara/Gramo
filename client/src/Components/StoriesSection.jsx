import React, {useRef} from 'react';
import { UseFirebase } from '../Contexts/firebase';

const StoriesSection = () => {

    const scrollContainer = useRef();
    const {userInfo} = UseFirebase();

    const scrollLeft =() =>{
       if(scrollContainer.current){
       scrollContainer.current.scrollBy({
           left: -100, 
           behavior: 'smooth'
       });
   }
    }
   
    const scrollRight = () =>{
      if(scrollContainer.current){ 
       scrollContainer.current.scrollBy({
           left: 100,
           behavior: 'smooth'
       });
   }
   }

  return (<>
        <div className="story-wrapper">
          <button className="scroll-btn left-btn" onClick={scrollLeft}> ← </button>

          <div className="story-container" ref={scrollContainer}>

            {/* logged in user's profile and story */}
            <div className="d-flex userProfile ms-3 story">
              <img
                src={userInfo?.user.photoURL}
                className="profileIcon"
                alt="profile pic"
              />
            </div>

            {/* following's profile and stories */}

            <div className="d-flex userProfile ms-3 story">
              <img
                src="android-chrome-192x192.png"
                className="profileIcon"
                alt="profile pic"
              />
            </div>

            <div className="d-flex userProfile ms-3 story">
              <img
                src="android-chrome-192x192.png"
                className="profileIcon"
                alt="profile pic"
              />
            </div>

            <div className="d-flex userProfile ms-3 story">
              <img
                src="android-chrome-192x192.png"
                className="profileIcon"
                alt="profile pic"
              />
            </div>

            <div className="d-flex userProfile ms-3 story">
              <img
                src="android-chrome-192x192.png"
                className="profileIcon"
                alt="profile pic"
              />
            </div>

            <div className="d-flex userProfile ms-3 story">
              <img
                src="android-chrome-192x192.png"
                className="profileIcon"
                alt="profile pic"
              />
            </div>

            <div className="d-flex userProfile ms-3 story-viewed">
              <img
                src="android-chrome-192x192.png"
                className="profileIcon"
                alt="profile pic"
              />
            </div>

            <div className="d-flex userProfile ms-3">
              <img
                src="android-chrome-192x192.png"
                className="profileIcon"
                alt="profile pic"
              />
            </div>

            <div className="d-flex userProfile ms-3">
              <img
                src="android-chrome-192x192.png"
                className="profileIcon"
                alt="profile pic"
              />
            </div>

            <div className="d-flex userProfile ms-3">
              <img
                src="android-chrome-192x192.png"
                className="profileIcon"
                alt="profile pic"
              />
            </div>

            <div className="d-flex userProfile ms-3">
              <img
                src="android-chrome-192x192.png"
                className="profileIcon"
                alt="profile pic"
              />
            </div>

            <div className="d-flex userProfile ms-3">
              <img
                src="android-chrome-192x192.png"
                className="profileIcon"
                alt="profile pic"
              />
            </div>

            <div className="d-flex userProfile ms-3">
              <img
                src="android-chrome-192x192.png"
                className="profileIcon"
                alt="profile pic"
              />
            </div>

            <div className="d-flex userProfile ms-3">
              <img
                src="android-chrome-192x192.png"
                className="profileIcon"
                alt="profile pic"
              />
            </div>

            <div className="d-flex userProfile ms-3">
              <img
                src="android-chrome-192x192.png"
                className="profileIcon"
                alt="profile pic"
              />
            </div>

            <div className="d-flex userProfile ms-3">
              <img
                src="android-chrome-192x192.png"
                className="profileIcon"
                alt="profile pic"
              />
            </div>

            <div className="d-flex userProfile ms-3">
              <img
                src="android-chrome-192x192.png"
                className="profileIcon"
                alt="profile pic"
              />
            </div>

            <div className="d-flex userProfile ms-3">
              <img
                src="android-chrome-192x192.png"
                className="profileIcon"
                alt="profile pic"
              />
            </div>

            <div className="d-flex userProfile ms-3">
              <img
                src="android-chrome-192x192.png"
                className="profileIcon"
                alt="profile pic"
              />
            </div>

            <div className="d-flex userProfile ms-3">
              <img
                src="android-chrome-192x192.png"
                className="profileIcon"
                alt="profile pic"
              />
            </div>

            <div className="d-flex userProfile ms-3">
              <img
                src="android-chrome-192x192.png"
                className="profileIcon"
                alt="profile pic"
              />
            </div>

            <div className="d-flex userProfile ms-3">
              <img
                src="android-chrome-192x192.png"
                className="profileIcon"
                alt="profile pic"
              />
            </div>

            <div className="d-flex userProfile ms-3">
              <img
                src="android-chrome-192x192.png"
                className="profileIcon"
                alt="profile pic"
              />
            </div>

          </div>
          <button className="scroll-btn right-btn" onClick={scrollRight}> →</button>
        </div>

  </>
  )
}

export default StoriesSection