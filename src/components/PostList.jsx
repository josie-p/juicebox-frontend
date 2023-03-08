import React, { useState, useEffect } from "react";
import { PostCard } from "./";
import { getPostsAPI } from "../api-adapter";
import { useOutletContext } from "react-router-dom";

const PostList = ({ token }) => {
  const [, , , , posts, setPosts] = useOutletContext();
  // const [posts, setPosts] = useState([]);

  // const getPosts = async (token) => {
  //   const fetchedPosts = await getPostsAPI(token);
  //   console.log(fetchedPosts, "fetchedPosts");
  //   setPosts(fetchedPosts.posts[0]);
  // };

  // useEffect(() => {
  //   getPosts(token);
  // }, []);

  return (
    <div>
      <div>
        {posts.map((post, idx) => {
          return (
            <PostCard
              key={`PostCard Key: ${idx}`}
              post={post}
              token={token}
              posts={posts}
              setPosts={setPosts}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostList;
