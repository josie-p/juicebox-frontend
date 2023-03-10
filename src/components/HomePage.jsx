import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { LogIn, PostList } from "./index";

const HomePage = () => {
  const [loggedIn, setLoggedIn, token, setToken] = useOutletContext();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
      setToken(localStorage.getItem("token"));
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <div>
      {loggedIn ? (
        <div>
          <PostList token={token} />
        </div>
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
