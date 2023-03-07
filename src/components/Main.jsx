import { React, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { Navbar } from "./";

const Main = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  return (
    <div id="main">
      <Navbar />
      <Outlet context={[loggedIn, setLoggedIn, token, setToken]} />
    </div>
  );
};

export default Main;
