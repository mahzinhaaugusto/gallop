import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

export function Main() {
  return (
    <>
      <h1>Welcome</h1>
    </>
  );
}

export function SignUp() {
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

function Login() {
  const [credential, setCredential] = useState([]);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  let navigate = useNavigate();

  const createAccount = () => {
    navigate("/signup");
  };
  const loginClicked = () => {
    // Axios.get("http://localhost:3002/api/get").then((response) => {
    //   setCredential(response.data);
    // });
    credential.map((val) => {
      if (val.userName === userName && val.userPassword === userPassword) {
        navigate("/home");
      }
      return 1;
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3002/api/get").then((response) => {
      setCredential(response.data);
    });
  }, []);

  return (
    <>
      <div className="App">
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
      </div>
      <div>
        <button onClick={loginClicked}>Login</button>
      </div>
      <button onClick={createAccount}>Create Account</button>
    </>
  );
}

export function App() {
  return <Login />;
}
