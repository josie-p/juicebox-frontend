import React, { useState } from "react";
import { useOutletContext } from 'react-router-dom';
import { registerAPI } from '../api-adapter';
import { HomePage } from "./index"

const Register = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState(""); 
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [ loggedIn, setLoggedIn, token, setToken] = useOutletContext();

    const register = async (userName, password, name, location) => {
        const response = await registerAPI(userName, password, name, location);
        console.log(response, 'response fore register');
        if(response.token){
            setToken(response.token)
            localStorage.setItem("token", token);
            setLoggedIn(true);
            }
    }

    return(
        <div>
            {loggedIn? <HomePage/> : 
            <div>
            <h2>Register an Account</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                register(userName, password, name, location);
            }}>
                <label>Username</label>
                <input type="text"
                onChange={(e) => {setUserName(e.target.value)}}
                ></input>
                <label>password</label>
                <input type="password" onChange={(e) => {setPassword(e.target.value)}}></input>
                <label>Name:</label>
                <input type="text" onChange={(e) => {setName(e.target.value)}}></input>
                <label>Location:</label>
                <input type="text" onChange={(e) => {setLocation(e.target.value)}}></input>
                <button type='submit'>Register an Account</button>
            </form>
            </div>
            }
            
        </div>
    )
}

export default Register;