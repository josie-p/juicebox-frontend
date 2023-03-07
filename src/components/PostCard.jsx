import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      {post.tags.map((tag, idx) => {
        return <p key={`Tag Map: ${idx}`}>{tag.name}</p>;
      })}
      <Link to={`/posts/${post.id}`}>See Single Post</Link>
      <button>edit</button>
      <button>delete</button>
      
    </div>
  );
};

export default PostCard;
