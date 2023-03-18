//
import { useState, useEffect } from "react";
import Axios from "axios";
import bcrypt from "bcryptjs";
import horse from "../icons/Horse.png";
import WhiteLogo from "../icons/WhiteLogo.svg";

import { useNavigate, Link } from "react-router-dom";
export function Login() {
  const [credential, setCredential] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  // const [rmCheck, setRmCheck] = useState(false);
  //const [flag, setFlag] = useState(false);
  let navigate = useNavigate();

  // let email, pass;

  // if (localStorage.checkbox && localStorage.checkbox !== "") {
  //   setRmCheck(true);
  //   email = localStorage.username;
  //   pass = localStorage.password;
  // } else {
  //   //rmCheck.removeAttribute("checked");
  //   //emailInput.value = "";
  //   //pass.value = "";
  // }

  // const isRemembered = () => {
  //   console.log(rmCheck);
  //   if (rmCheck && userEmail !== "" && userPassword !== "") {
  //     localStorage.username = userEmail;
  //     localStorage.checkbox = rmCheck;
  //     localStorage.password = userPassword;
  //   } else {
  //     localStorage.username = "";
  //     localStorage.checkbox = "";
  //     localStorage.password = "";
  //   }
  // };
  const loginClicked = () => {
    let promises = [];

    for (let i = 0; i < credential.length; i++) {
      let promise = new Promise((resolve, reject) => {
        bcrypt.compare(
          userPassword,
          credential[i].userPassword,
          function (err, isMatch) {
            if (err) {
              reject(err);
            }
            if (isMatch && credential[i].email === userEmail) {
              resolve(true);
            } else {
              resolve(false);
            }
          }
        );
      });
      promises.push(promise);
    }

    Promise.all(promises)
      .then((results) => {
        let flag = false;
        for (let i = 0; i < results.length; i++) {
          if (results[i]) {
            flag = true;
            localStorage.setItem("id", credential[i].ID);
            navigate("/home");
            setUserEmail("");
            setUserPassword("");
            break;
          }
        }
        if (!flag) {
          alert("Sorry not found");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    Axios.get("http://localhost:3002/api/get").then((response) => {
      setCredential(response.data);
    });
  }, []);

  return (
    <>
      <div className="login">
        <div className="loginCont_master">
          <div className="loginImage">
            <img className="loginImage" src={horse} alt="not found" />
            <img
              className="loginImage_logo"
              src={WhiteLogo}
              alt="Gallop App Logo"
            />
          </div>
          <div className="loginCont">
            <div className="loginCont_infoInputSec">
              <h1>Sign In</h1>
              <label className="loginCont_label">Email</label>
              <input
                type="text"
                name="userEmail"
                id="userEmail"
                defaultValue={userEmail}
                placeholder="example@email.com"
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
              ></input>
              <label className="loginCont_label">Password</label>
              <input
                type="password"
                name="userPassword"
                id="userPassword"
                defaultValue={userPassword}
                placeholder="**********"
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
              ></input>
              <div className="loginCont_RememberCont">
                <div className="loginCont_Remember">
                  <label>
                    <input
                      type="checkbox"
                      id="remember"
                      name="remember"
                      className="remember"
                      // onChange={(e) => {
                      //   setRmCheck(e.target.checked);
                      // }}
                      // onClick={isRemembered}
                    />
                    Remember Me
                  </label>
                </div>

                <button className="primaryBtn" onClick={loginClicked}>
                  Sign In
                </button>
              </div>
              <div className="links">
                <Link to="/reset-password" className="link">
                  Forgot Password?
                </Link>

                <Link to="/signup" className="link">
                  Create an Account
                </Link>
              </div>
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
      </div>
    </>
  );
}
