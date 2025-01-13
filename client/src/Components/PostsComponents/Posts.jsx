import React, {useState} from "react";
import { CiHeart } from "react-icons/ci";
import { RiChat1Line } from "react-icons/ri";
import { CiLocationArrow1 } from "react-icons/ci";
import { CiSaveUp2 } from "react-icons/ci";
import { RiCollapseDiagonalFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import CommentSec from "./CommentSec";


const Posts = () => {

  const comments = [
    { user: "MOHIT", text: "fantastic" },
    { user: "John", text: "Awesome fantastic this is the thing that i am talking about. This project gonna blow everyone's mind. You know what if i add some more lines in this paragraph then the comment section gonna overfall and this is the best way to test this." },
    { user: "Eren", text: "start the rembeling" },
    { user: "Mikasha", text: "Stop" },
    { user: "MOHIT", text: "fantastic" },
    { user: "John", text: "Awesome" },
    { user: "Eren", text: "start the rembeling" },
    { user: "Mikasha", text: "Stop" },
  ];

  const [showAllComments, setShowAllComments] = useState(false);

  const handleToggleComments = () => {
    setShowAllComments(!showAllComments);
  };

  return (
    <>
      <div className="posts card">

        <div className="d-flex userProfile mt-3">
          <img src="android-chrome-192x192.png" className="profileIcon" alt="profile pic" />
               <p className="profile-name">mohit_mahara171</p>
               <p className="post-date"><sup>.</sup> 6d</p>
        </div>

        <div className="card-body post-image">
          <img src="android-chrome-192x192.png" className="card-img-top" />
          <div className="post-info">
            <div className="post-activity">
              <CiHeart className="postIcon likeIcon" />
              <RiChat1Line className="postIcon commentIcon" onClick={handleToggleComments}/>
              <CiLocationArrow1 className="postIcon shareIcon" />
              <CiSaveUp2 className="ms-auto postIcon saveIcon" />
            </div>
            <div className="post-text">
              <p className="likes">23675 likes</p>
              <p className="caption">
                To standardize the icon's internal stroke (which might look like
                a "border" in some cases).
              </p>
            </div>
          </div>
        </div>

        <div className="comment-section">
        {showAllComments ? (
          <>
            <div className="comments-header d-flex mb-3">
              <h5>Comments</h5>
              <RiCollapseDiagonalFill
                onClick={handleToggleComments}
                className="ms-auto cmtcollapsebtn"
              />
            </div>
          </>
        ) : null}
        <div className="comments">
          {showAllComments ? (
            <>
              {comments.map((comment, index) => {
                return (
                    <CommentSec comment = {comment} index ={index} />
                );
              })}
            </>
          ) : (
            <Link className="all-comments" onClick={handleToggleComments}>View all comments</Link>
          )}
        </div>

        {showAllComments ? (
          <>
            <div className="addComment">
              <input type="text" placeholder="Add a comment..." />
              <p>Add</p>
            </div>
          </>
        ) : null}
      </div>

      </div>
    </>
  );
};

export default Posts;
