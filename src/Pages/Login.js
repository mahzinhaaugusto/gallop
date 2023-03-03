import { useState, useEffect } from "react";
import Axios from "axios";
import "../css/Login.css";
import horse from "../icons/Horse.png";

import { useNavigate, Link } from "react-router-dom";
export function Login() {
  const [credential, setCredential] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  let navigate = useNavigate();

  const loginClicked = () => {
    // Axios.get("http://localhost:3002/api/get").then((response) => {
    //   setCredential(response.data);
    // });
    let flag = false;
    credential.map((val) => {
      if (val.email === userEmail && val.userPassword === userPassword) {
        flag = true;
        navigate("/home");
      }
      setUserEmail("");
      setUserPassword("");
      return 1;
    });
    if (!flag) {
      alert("Sorry not found");
    }
  };

  useEffect(() => {
    Axios.get("http://localhost:3002/api/get").then((response) => {
      setCredential(response.data);
    });
  }, []);

  return (
    <>
      <div className="login">
        <div className="loginImage">
          <img className="loginImage" src={horse} alt="not found" />
        </div>
        <div className="loginCont">
          <h2>Sign In</h2>
          <label>Email</label>
          <input
            type="text"
            value={userEmail}
            name="userEmail"
            placeholder="example@email.com"
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          ></input>
          <label>Password</label>
          <input
            type="password"
            name="userPassword"
            value={userPassword}
            placeholder="**********"
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          ></input>
          <div className="loginCont_RememberCont">
            <div className="loginCont_Remember">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="remember"
              />
              <label>Remember Me</label>
            </div>

            <div>
              <button className="primaryBtn" onClick={loginClicked}>
                Sign In
              </button>
            </div>
          </div>
          <div className="links">
            <Link to="/signup" className="link">
              Forgot Password?
            </Link>

            <Link to="/signup" className="link">
              Create an Account
            </Link>
          </div>
          <div className="horizontalCont">
            <hr className="horizontalCont_leftHorizon"></hr>
            <p className="horizontalCont_Para">OR CONTINUE WITH</p>
            <hr className="horizontalCont_rightHorizon"></hr>
          </div>
          <div className="buttonArray">
            <button className="secondaryBtn">Continue With Google</button>

            <button className="secondaryBtn">Continue With Apple</button>
          </div>
        </div>
      </div>
    </>
  );
}
