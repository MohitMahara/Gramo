import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { RiChat1Line } from "react-icons/ri";
import { CiLocationArrow1 } from "react-icons/ci";
import { CiSaveUp2 } from "react-icons/ci";
import { RiCollapseDiagonalFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import CommentSec from "./CommentSec";
import PostOwnerMenu from "./PostOwnerMenu";
import PostViewerMenu from "./PostViewerMenu";
import moment from "moment";
import axios from "axios";
import { UseFirebase } from "../../Contexts/firebase";
import CmtOwnerMenu from "./CmtOwnerMenu";
import CmtViewerMenu from "./CmtViewerMenu";

const Posts = ({user,  post, setIsModalOpen, setIsEditModalOpen }) => {

  const { userInfo } = UseFirebase();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);

  const handleToggleComments = () => {
    setShowAllComments(!showAllComments);
  };

  const handleCommentBtn = async () => {
    try {
      if (!commentText || commentText == "") return;

      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/posts/add-comment/${post?._id}/${userInfo?.user._id}`,
        { commentText }
      );

      setCommentText("");

      if (res.data.success) {
        getComments();
        console.log(comments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleLikes = async () => {
    try {
      const postId = post?._id;
      const userId = userInfo?.user?._id;

      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/posts/${postId}/${userId}/like`
      );

      if (res.data.success) {
        const liked = res.data.liked;
        setLiked(liked);
        getLikes();
      }
    } catch (error) {
      console.log(error);
    }
  };


  const getLikes = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/posts/get-likes/${post?._id}`
      );

      if (res.data.success) {
        setLikes(res.data.likes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/posts/get-comments/${post?._id}`
      );

      if (res.data.success) {
        setComments(res.data.comments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hasLiked = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/posts/has-liked/${post?._id}/${userInfo?.user._id}`
      );
      if (res.data.success) {
        setLiked(res.data.liked);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLikes();
    getComments();
    hasLiked();
  }, [post]);

  return (
    <>
      <div className="posts ">
        <div className="d-flex userProfile mt-3 mb-3">
          <img src={user?.photoURL} className="profileIcon" alt="profile pic" />
          <p className="profile-name">{user?.username}</p>
          <p className="post-date">
            <sup>.</sup> {moment(post?.createdAt).fromNow()}
          </p>
          {userInfo?.user?.username == user?.username ? (
            <PostOwnerMenu
              post={post}
              setIsModalOpen={setIsModalOpen}
              setIsEditModalOpen={setIsEditModalOpen}
            />
          ) : (
            <PostViewerMenu post={post} setIsModalOpen={setIsModalOpen} />
          )}
        </div>

        <div className="post-image">
          <img src={post?.fileURL} className="card-img-top" />
          <div className="post-info">
            <div className="post-activity">
              {liked ? (
                <CiHeart
                  className="postIcon likeIcon bg-danger"
                  onClick={handleToggleLikes}
                />
              ) : (
                <CiHeart
                  className="postIcon likeIcon"
                  onClick={handleToggleLikes}
                />
              )}

              <RiChat1Line
                className="postIcon commentIcon"
                onClick={handleToggleComments}
              />
              <CiLocationArrow1 className="postIcon shareIcon" />
              <CiSaveUp2 className="ms-auto postIcon saveIcon" />
            </div>
            <div className="post-text">
              <p className="likes">{likes.length} likes</p>
              <p className="caption">{post?.caption}</p>
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
                    <>
                    <div className="d-flex">
                      <CommentSec comment={comment} index={index} />
                      {post?.username === userInfo?.user.username ? (
                        <CmtOwnerMenu
                          cmt={comment}
                          post={post}
                          getComments={getComments}
                        />
                      ) : comment?.userId == userInfo?.user._id ? (
                        <CmtOwnerMenu
                          cmt={comment}
                          post={post}
                          getComments={getComments}
                        />
                      ) : (
                        <CmtViewerMenu cmt={comment} />
                      )}

                      </div>
                    </>
                  );
                })}
              </>
            ) : (
              <Link className="all-comments" onClick={handleToggleComments}>
                View all comments
              </Link>
            )}
          </div>

          {showAllComments ? (
            <>
              <div className="addComment">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <p onClick={handleCommentBtn}>Add</p>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Posts;
