import React from "react";

const CommentSec = ( props ) => {
  return (
    <>
    {props.comment ? <>
      <div className="d-flex user-comment" key={props.index}>
        <div className="d-flex userProfile">
          <img src="android-chrome-192x192.png" className="profileIcon" alt="profile pic" />
        </div>
        <div className="comment-text">
          <p className="user">{props.comment.user}</p>
          <p className="cmt-text">{props.comment.text}</p>
        </div>
      </div>
      </>
      : null }
    </>
  );
};

export default CommentSec;
