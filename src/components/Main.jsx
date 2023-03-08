import React, { useState, useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { Navbar } from "./";
import { getPostsAPI } from "../api-adapter";

const Main = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [posts, setPosts] = useState([]);
  // setToken(localStorage.getItem("token"));
  if(!token){
    const newToken = localStorage.getItem("token");
    if(newToken){
      setToken(newToken);
    }
  }
 

  const getPosts = async (token) => {
    console.log(token, 'token from main')
    const fetchedPosts = await getPostsAPI(token);
    console.log(await fetchedPosts, "fetchedPosts");
    setPosts(await fetchedPosts.posts[0]);
  };


  useEffect(() => {
    getPosts(token);
 }, [token]);
  return (
    <div id="main">
      <Navbar setLoggedIn={setLoggedIn} />
      {token ? <Outlet context={[loggedIn, setLoggedIn, token, setToken, posts, setPosts]} />: <h1>Loading</h1>}
    </div>
  );
};

export default Main;
