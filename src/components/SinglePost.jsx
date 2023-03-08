import React, { useState, useEffect } from "react";
import { useOutletContext, useParams, Link } from "react-router-dom";
import { getPostsAPI } from "../api-adapter";

const SinglePost = () => {
  const [, , token, setToken] = useOutletContext();
  const [posts, setPosts] = useState([]);
  const { id } = useParams();

  const getPosts = async (token) => {
    console.log(token, "token from single post");
    const response = await getPostsAPI(token);
    console.log(response);
    setPosts(response.posts[0]);
  };

  useEffect(() => {
    console.log(localStorage.getItem("token"), "token from localstorage");
    if (!token) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    getPosts(token);
  }, [token]);

  console.log(posts, "posts in single post");
  console.log("token", token);

  const singlePost = posts.filter((post) => {
    if (post.id == id) {
      return true;
    }
    console.log(typeof id, id, "typeof id");
    console.log(typeof post.id, post.id, "typeof post.id");
    return false;
  });

  console.log(singlePost, "single post");

  return (
    <>
      {posts.length ? (
        <div>
          <h1>post by {singlePost[0].author.username}</h1>
          <h2>{singlePost[0].title}</h2>
          <p>{singlePost[0].content}</p>
          {singlePost[0].tags.map((tag, idx) => {
            return <p key={`Tag Map Single Post: ${idx}`}>{tag.name}</p>;
          })}
          <Link to="/">
            <p>Return to All Posts</p>
          </Link>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
};

export default SinglePost;
