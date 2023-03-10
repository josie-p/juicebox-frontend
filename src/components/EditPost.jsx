import React, { useState } from "react";
import {
  useOutletContext,
  useParams,
  useNavigate,
  Link,
} from "react-router-dom";
import { editPostAPI } from "../api-adapter";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";

const EditPost = () => {
  const [loggedIn, setLoggedIn, token, setToken, posts, setPosts] =
    useOutletContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const currentPostArr = posts.filter((post) => {
    if (post.id === Number(id)) {
      return true;
    } else {
      return false;
    }
  });

  const currentPost = currentPostArr[0];

  const editPost = async (token, id, title, content, tags) => {
    const response = await editPostAPI(token, id, title, content, tags);
    if (response.name?.includes("Unauthorized")) {
      setMessage("You may not edit a post which does not belong to you");
      document.getElementsByClassName("warning")[0].style.display = "flex"
      document.getElementsByClassName("warning")[0].style.flexDirection = "column"
      setTimeout( () => {
        navigate("/");
      }, 3500);
      
    } else {
      let newPostArray = [...posts];
      newPostArray = newPostArray.filter((post, idx) => {
        if (post.id === Number(id)) {
          return false;
        } else {
          return true;
        }
      });
      newPostArray.unshift(response.post);
      setPosts(newPostArray);
      alert("Post has been succesfully edited");
      navigate("/");
    }
  };

  let startingTags = "";

  if (currentPost) {
    currentPost.tags.map((tag, idx) => {
      startingTags = startingTags + " " + tag.name;
    });
  }

  return currentPost ? (
    <div id="edit-post-div">
      <ErrorMessage message={message}/>
      <h1 id="edit-page-h1">
        <span id="you-are-editing">You are Editing:</span> "{currentPost.title}"
      </h1>
      <form
        className="editForm"
        onSubmit={(e) => {
          e.preventDefault();
          editPost(token, id, title, content, tags);
        }}
      >
        <label>Title</label>
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type="text"
          defaultValue={currentPost.title}
        ></input>
        <label>Content</label>
        <textarea
          onChange={(e) => {
            setContent(e.target.value);
          }}
          type="text"
          defaultValue={currentPost.content}
          rows="4"
          cols="40"
        />
        <label>Tags</label>
        <input
          onChange={(e) => {
            setTags(e.target.value);
          }}
          type="text"
          defaultValue={startingTags}
        ></input>
        <button type="submit">Submit Changes</button>
      </form>
      <Link to="/">
        <button className="goHome">Go Home</button>
      </Link>
    </div>
  ) : (
    <Loading />
  );
};

export default EditPost;
