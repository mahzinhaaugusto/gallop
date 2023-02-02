import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [Email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [Address, setAddress] = useState("");
  const [Website, setWebsite] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const submitClicked = () => {
    Axios.post("http://localhost:3002/api/insert", {
      userName: userName,
      userPassword: userPassword,
      Email: Email,
      Address: Address,
      Website: Website,
      phoneNumber: phoneNumber,
    }).then(() => {
      setEmail("");
    });
  };
  return (
    <div className="App">
      <h1>Gallop Sign UP</h1>
      <label>Email</label>
      <input
        type="email"
        name="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      <label>UserName</label>
      <input
        type="text"
        name="userName"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      ></input>
      <label>Password</label>
      <input
        type="password"
        name="userPassword"
        onChange={(e) => {
          setUserPassword(e.target.value);
        }}
      ></input>
      <label>Address</label>
      <input
        type="text"
        name="Address"
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      ></input>
      <label>Website</label>
      <input
        type="text"
        name="Website"
        onChange={(e) => {
          setWebsite(e.target.value);
        }}
      ></input>
      <label>PhoneNumber</label>
      <input
        type="number"
        name="phoneNumber"
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
      ></input>
      <button onClick={submitClicked}>Submit</button>
    </div>
  );
}

export default App;
//YO
