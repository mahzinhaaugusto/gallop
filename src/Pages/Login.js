// import { PopUp } from "../Components/PopUp.js";
// import { Button } from "../Components/Button.js";
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
  // const [showPopUp, setShowPopUp] = useState(false);
  // const [emailError, setEmailError] = useState("");
  const [cError, setCError] = useState("");
  // const [pError, setPError] = useState("");
  // const [rmCheck, setRmCheck] = useState(false);
  //const [flag, setFlag] = useState(false);
  let navigate = useNavigate();

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
          // setEmailError("Please provide a valid email");
          setCError("Please check your credentials and try again");
          // setShowPopUp(!showPopUp);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    localStorage.clear();
    // if (userEmail == "") {
    //   setEmailError("Please provide a valid email");
    // }
    // if (userPassword == "") {
    //   setPError("Please provide a password");
    // }
    Axios.get(`${process.env.REACT_APP_API_URL}get`).then((response) => {
      setCredential(response.data);
    });
  }, []);

  // const closePopUp = () => {
  //   setShowPopUp(!showPopUp);
  // }

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
                  // setEmailError("");
                  setUserEmail(e.target.value);
                }}
              ></input>
              {/* <p className="warning">{emailError}</p> */}
              <label className="loginCont_label">Password</label>
              <input
                type="password"
                name="userPassword"
                id="userPassword"
                defaultValue={userPassword}
                placeholder="**********"
                onChange={(e) => {
                  // setPError("");
                  setCError("");
                  setUserPassword(e.target.value);
                }}
              ></input>
              {/* <p className="warning">{pError}</p> */}
              <p className="warning">{cError}</p>
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
                <Link to="/forgot-password" className="link">
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
            </div>
          </div>
        </div>
      </div>
      {/* {showPopUp && (
        <PopUp title="Something went wrong" description="Email or password are not a match" addContent={
          <Button className="popUp_btn" title="Close" onClick={closePopUp} />
        } />
      )} */}
    </>
  );
}
