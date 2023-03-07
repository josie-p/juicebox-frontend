import React from "react";
import { useOutletContext } from "react-router-dom";
import { LogIn } from "./index";

const HomePage = () => {
  const [loggedIn, setLoggedIn, token, setToken] = useOutletContext();
  // console.log(setToken, "loggedIn");
  return (
    <div>
      <h1>Home Page</h1>
      {loggedIn ? (
        <h1>Links to post and stuff</h1>
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
