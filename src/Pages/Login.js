import { useState, useEffect } from "react";
import Axios from "axios";
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
          <img src={horse} alt="not found" />
        </div>
        <div className="loginCont">
          <h2>Sign In</h2>
          <label>Email</label>
          <input
            type="text"
            value={userEmail}
            name="userEmail"
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          ></input>
          <label>Password</label>
          <input
            type="password"
            name="userPassword"
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          ></input>
          <div className="loginCont_RememberCont">
            <div className="loginCont_Remember">
              <input type="checkbox" id="remember" name="remember" />
              <label>Remember Me</label>
            </div>

            <div>
              <button onClick={loginClicked}>Sign In</button>
            </div>
          </div>
          <div className="links">
            <Link to="/signup">Forgot Password?</Link>

            <Link to="/signup">Create an Account</Link>
          </div>
          <div className="horizontalCont">
            <hr className="horizontalCont_leftHorizon"></hr>
            <p className="horizontalCont_Para">OR CONTINUE WITH</p>
            <hr className="horizontalCont_rightHorizon"></hr>
          </div>
          <div>
            <button>Continue With Google</button>
          </div>

          <button>Continue With Apple</button>
        </div>
      </div>
    </>
  );
}
