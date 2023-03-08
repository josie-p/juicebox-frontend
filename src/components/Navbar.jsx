import React from "react";

const Navbar = ({ setLoggedIn }) => {
  return (
    <div id="navbar">
      <h2> I am navbar</h2>
      <h2
        onClick={() => {
          localStorage.setItem("token", "");
          setLoggedIn(false);
        }}
      >
        Log Out
      </h2>
    </div>
  );
};

export default Navbar;
