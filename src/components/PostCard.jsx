import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deletePostAPI } from "../api-adapter";
import { ErrorMessage } from "./";

const PostCard = ({ post, token, posts, setPosts, setSearchTerm }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("")

  return (
    <div id="homeHold">
      <div className="post-card-div">
        <ErrorMessage message={message}/>
        <h3 className="post-card-title">{post.title}</h3>
        {!post.active ? <h4>This post is not active</h4> : null}
        <p className="post-card-content">{post.content}</p>
        {post.tags.map((tag, idx) => {
          if (tag.name.includes("#")) {
            return (
              <p
                className="post-card-tag"
                key={`Tag Map: ${idx}`}
                onClick={() => {
                  document.getElementById("searchBar").value = tag.name;
                  setSearchTerm(tag.name);
                }}
              >
                {tag.name}
              </p>
            );
          } else {
            return (
              <p
                className="post-card-tag"
                key={`Tag Map: ${idx}`}
                onClick={() => {
                  document.getElementById("searchBar").value = tag.name;
                  setSearchTerm(tag.name);
                }}
              >
                #{tag.name}
              </p>
            );
          }
        })}
        <Link to={`/posts/${post.id}`} className="singleDetails">
          See Details
        </Link>
        <Link to={`/post/edit/${post.id}`}>edit</Link>
        <button
          className="deleteButton"
          onClick={async () => {
            const deletedPost = await deletePostAPI(token, post.id);
            if (deletedPost.name?.includes("Unauthorized")) {
              setMessage("You may not delete a post which does not belong to you");
              document.getElementsByClassName("warning")[0].style.display = "flex";
              document.getElementsByClassName("warning")[0].style.flexDirection = "column";
                  setTimeout(() => {
              window.location.reload(false);
            }, 3500);
            }else{
              window.location.reload(false);
            }
          }}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default PostCard;
