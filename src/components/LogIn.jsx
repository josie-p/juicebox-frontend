import React, { useState } from "react";
import { logInAPI } from "../api-adapter";
import { Link } from "react-router-dom";

const LogIn = ({ setToken, token, loggedIn, setLoggedIn }) => {
  // console.log(token, setToken, 'props from login')
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const logInUser = async (userName, password) => {
    const response = await logInAPI(userName, password);
    // console.log(response, "repsonse");
    setToken("a token");
    if(response.token){
      console.log("hello", response.token);
      localStorage.setItem("token", response.token);
      // setToken(response.token);
      
      setLoggedIn(true);
    }
  };
  
  console.log(token, 'token from function')
  return (
    <div>
      <form
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
      <Link to="/register" >
        <p>
          If you need an account register here, no email required! Or Login in
          to our test account username: albert pw: bertie99{" "}
        </p>
      </Link>
    </div>
  );
};

export default LogIn;
