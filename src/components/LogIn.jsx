import React, { useState } from "react";
import { logInAPI } from "../api-adapter";
import { Link } from "react-router-dom";

const LogIn = ({ setToken, token, loggedIn, setLoggedIn }) => {
  // console.log(token, setToken, 'props from login')
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const logInUser = async (userName, password) => {
    const response = await logInAPI(userName, password);

    if (response.token) {
      localStorage.setItem("token", response.token);
      setToken(response.token);
      setLoggedIn(true);
    }else{
      alert("You have entered the wrong username and/or password")
    }
  };

  console.log(token, "token from function");
  return (
    <div>
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
