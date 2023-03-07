import React from "react";

const PostCard = ({ post }) => {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      {post.tags.map((tag, idx) => {
        return <p key={`Tag Map: ${idx}`}>{tag.name}</p>;
      })}
    </div>
  );
};

export default PostCard;
