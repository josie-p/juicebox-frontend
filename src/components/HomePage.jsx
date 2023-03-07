import React from "react";
import { useOutletContext } from "react-router-dom";
import { LogIn, PostList } from "./index";

const HomePage = () => {
  const [loggedIn, setLoggedIn, token, setToken] = useOutletContext();
  console.log(token, "token");
  if (localStorage.getItem("token")) {
    setLoggedIn(true);
    setToken(localStorage.getItem("token"));
  } else {
    setLoggedIn(false);
  }
  return (
    <div>
      <h1>Home Page</h1>
      {loggedIn ? (
        <>
          <h1>Posts</h1>
          <PostList token={token} />
        </>
      ) : (
        <LogIn
          setToken={setToken}
          token={token}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
        />
      )}
    </div>
  );
};

export default HomePage;
