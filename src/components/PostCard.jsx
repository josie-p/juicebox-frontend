import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { deletePostAPI } from "../api-adapter";

const PostCard = ({ post, token, posts, setPosts, setSearchTerm }) => {
  const navigate = useNavigate();
  return (
    <div id="homeHold">
      <div className="post-card-div">
        <h3>{post.title}</h3>
        {!post.active ? <h4>This post is not active</h4> : null}
        <p>{post.content}</p>
        {post.tags.map((tag, idx) => {
          if (tag.name.includes("#")) {
            return (
              <p
                class="post-card-tag"
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
            if (deletedPost.name.includes("Unauthorized")) {
              alert("You Cant Delete a post that isnt yours");
            }
            window.location.reload(false);
          }}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default PostCard;
