import React from "react";

const CommentSec = ( props ) => {
  return (
    <>
    {props.comment ? <>
      <div className="d-flex user-comment" key={props.index}>
        <div className="d-flex userProfile">
          <img src={props.comment.userId.photoURL} className="profileIcon" alt="profile pic" />
        </div>
        <div className="comment-text">
          <p className="user">{props.comment.userId.username}</p>
          <p className="cmt-text">{props.comment.cmtText}</p>
        </div>
      </div>
      </>
      : null }
    </>
  );
};

export default CommentSec;
