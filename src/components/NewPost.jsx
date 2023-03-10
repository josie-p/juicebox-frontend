import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate, Link } from "react-router-dom";
import { createPostAPI } from "../api-adapter";

const NewPost = () => {
  const [, , token, setToken, posts, setPosts] = useOutletContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  const createPost = async (token, title, content, tags) => {
    const response = await createPostAPI(token, title, content, tags);

    if (response.post.id) {
      const newPost = [...posts];
      console.log("inside if of new post");
      newPost.unshift(response.post);
      setPosts(newPost);
    }

    console.log(response, "response from new post");
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <div>
      <h1 className="register-account-h2">Making a New Post</h1>
      <form
        className="editForm"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(token, "token from new post");
          createPost(token, title, content, tags);
          navigate("/");
        }}
      >
        <label>Title</label>
        <input
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <label>Content</label>
        <textarea
          cols="50"
          rows="4"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
        <label>Tags</label>
        <input
          type="text"
          onChange={(e) => {
            setTags(e.target.value);
          }}
        ></input>
        <button type="submit">Post</button>
      </form>
      <Link to="/">
        <button className="goHome">Go Home</button>
      </Link>
    </div>
  );
};

export default NewPost;
