import React from "react";
import { Link } from "react-router-dom";
const Navbar = ({ setLoggedIn, loggedIn }) => {
  return (
    <div id="navbar">
      {loggedIn ? (
        <h2
          onClick={() => {
            localStorage.setItem("token", "");
            setLoggedIn(false);
          }}
        >
          Log Out
        </h2>
      ) : null}
      {loggedIn ? (
        <Link to="/newpost">
          <h2>New Post</h2>
        </Link>
      ) : null}
    </div>
  );
};

export default Navbar;
