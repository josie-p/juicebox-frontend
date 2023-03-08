import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { deletePostAPI } from "../api-adapter";

const PostCard = ({ post, token, posts, setPosts }) => {
  const navigate = useNavigate();
  return (
    <div>
      <h3>{post.title}</h3>
      {!post.active ? <h4>This post is not active</h4> : null}
      <p>{post.content}</p>
      {post.tags.map((tag, idx) => {
        return <p key={`Tag Map: ${idx}`}>{tag.name}</p>;
      })}
      <Link to={`/posts/${post.id}`}>See Single Post</Link>
      <Link to={`/post/edit/${post.id}`}>
        <button>edit</button>
      </Link>
      <button
        onClick={async () => {
          const deletedPost = await deletePostAPI(token, post.id);
          console.log(
            deletedPost,
            "response from fetch request for delte button"
          );
          window.location.reload(false);
        }}
      >
        delete
      </button>
    </div>
  );
};

export default PostCard;
