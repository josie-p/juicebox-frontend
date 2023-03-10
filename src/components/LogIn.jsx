import React, { useState } from "react";
import { logInAPI } from "../api-adapter";
import { Link } from "react-router-dom";
import { ErrorMessage } from "./";

const LogIn = ({ setToken, token, loggedIn, setLoggedIn }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const logInUser = async (userName, password) => {
    const response = await logInAPI(userName, password);

    if (response.token) {
      localStorage.setItem("token", response.token);
      setToken(response.token);
      setLoggedIn(true);
    }else{
      setMessage("You have entered the wrong username and/or password- try again!");
      document.getElementsByClassName("warning")[0].style.display = "flex"
      document.getElementsByClassName("warning")[0].style.flexDirection = "column"
    }
  };


  return (
    <div>
   <ErrorMessage message={message}/>
      <h2 className="register-account-h2">Log In to Your Account</h2>
      <form
        id="log-in-form"
        onSubmit={(e) => {
          e.preventDefault();
          logInUser(userName, password);
        }}
      >
        <label>Username</label>
        <input
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          type="text"
        ></input>
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <button type="submit">Log In</button>
      </form>
      <Link to="/register">
        <p id="link-register">
          If you need an account register here, no email required! Or Login in
          to our test account username: albert pw: bertie99{" "}
        </p>
      </Link>
    </div>
  );
};

export default LogIn;
