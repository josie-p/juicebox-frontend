import React, { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { registerAPI } from "../api-adapter";
import { ErrorMessage, HomePage } from "./index";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [loggedIn, setLoggedIn, token, setToken] = useOutletContext();
  const [message, setMessage] = useState("");

  const register = async (userName, password, name, location) => {

    if(userName && password && name){
      const response = await registerAPI(userName, password, name, location);

    if (response.token) {
      setToken(response.token);
      localStorage.setItem("token", token);
      setLoggedIn(true);
    } else {
      setMessage("Hmm... something went wrong; the username you entered may already exist. Try again!");
      document.getElementsByClassName("warning")[0].style.display = "flex"
      document.getElementsByClassName("warning")[0].style.flexDirection = "column"
    }
    }else{
      setMessage("Hmm... something went wrong; check to make sure you filled out all of the required fields.");
      document.getElementsByClassName("warning")[0].style.display = "flex"
      document.getElementsByClassName("warning")[0].style.flexDirection = "column"
    }
  
  };

  return (
    <div>
      {loggedIn ? (
        <HomePage />
      ) : (
        <div id="register-div">
          <ErrorMessage message={message}/>
          <h2 className="register-account-h2">Register an Account</h2>
          <form
            className="editForm"
            onSubmit={(e) => {
              e.preventDefault();
              register(userName, password, name, location);
            }}
          >
            <label>Username</label>
            <input
              type="text"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            ></input>
            <label>password</label>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <label>Name:</label>
            <input
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
            <label>Location:</label>
            <input
              type="text"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            ></input>
            <button type="submit">Register an Account</button>
          </form>
          <Link to="/">
            <button className="goHome">Go Home</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Register;
