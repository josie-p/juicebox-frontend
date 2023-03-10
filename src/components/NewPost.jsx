import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate, Link } from "react-router-dom";
import { createPostAPI } from "../api-adapter";
import { ErrorMessage } from "./";

const NewPost = () => {
  const [, , token, setToken, posts, setPosts] = useOutletContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const createPost = async (token, title, content, tags) => {
    if (content && title) {
      const response = await createPostAPI(token, title, content, tags);
      const newPost = [...posts];

      newPost.unshift(response.post);
      setPosts(newPost);
        navigate("/");
    }else{
      setMessage("Hmmm... Something went wrong- check to make sure all fields are filled out");
      document.getElementsByClassName("warning")[0].style.display = "flex"
      document.getElementsByClassName("warning")[0].style.flexDirection = "column";
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <div>
      <ErrorMessage message={message}/>
      <h1 className="register-account-h2">Making a New Post</h1>
      <form
        className="editForm"
        onSubmit={(e) => {
          e.preventDefault();

          createPost(token, title, content, tags);
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
