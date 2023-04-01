import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import horse from "../icons/Horse.png";
import HideShowPass from "../icons/HideShowPass.svg";
import HideVisibility from "../icons/HideVisibility.svg";
import WhiteLogo from "../icons/WhiteLogo.svg";

export function SignUp() {
  const [Email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [firstError, setFirstError] = useState("");
  const [lastError, setLastError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pError, setPError] = useState("");
  const [cError, setCError] = useState("");
  const [passwordType1, setPasswordType1] = useState("password");
  const [passwordType2, setPasswordType2] = useState("password");


  let navigate = useNavigate();

  const nextClicked = () => {
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let a = Email.match(validRegex);

    if (firstName === "") {
      setFirstError("Please enter first name");
    }
    if (lastName === "") {
      setLastError("Please enter last name");
    }
    if (userPassword === "") {
      setPError("Please enter valid password");
    }
    if (Email === "" || !a) {
      setEmailError("Please enter a valid email address");
    }
    if (userPassword !== cPassword) {
      setCError("Password and Confirm Password do not Match");
    } else if (
      firstName !== "" &&
      lastName !== "" &&
      userPassword !== "" &&
      Email !== "" &&
      Email.match(validRegex)
    ) {
      const hashedPassword = bcrypt.hashSync(userPassword, 10);

      navigate("/signup2", {
        state: {
          firstName: firstName,
          lastName: lastName,
          userPassword: hashedPassword,
          Email: Email,
        },
      });
    }
  };

  const backSplash = () => {
    navigate("/");
  };

  const togglePassword1 = () => {
    if (passwordType1 === "password") {
      setPasswordType1("text");
      return;
    }
    setPasswordType1("password");
  };

  const togglePassword2 = () => {
    if (passwordType2 === "password") {
      setPasswordType2("text");
      return;
    }
    setPasswordType2("password");
  };

  return (
    <div className="signUp">
      <div className="signUpImage">
        <img className="signUpImage" src={horse} alt="not found" />
        <img
          className="splashScreen_logo"
          src={WhiteLogo}
          alt="Gallop App Logo"
        />
      </div>
      <div className="signUpForm">
        <div className="signUpCont">
          <h1>Welcome to Gallop!</h1>
          <div className="icons">
            <div className="signUpCont_steps">
              <p className="signUpCont_steps_step1">Step 1</p>
              <p className="signUpCont_steps_step2">Step 2</p>
            </div>
            <div className="signUpCont_icons">
              <div className="signUpCont_icons_first">
                <span className="drawCircle1"></span>
                <h2 className="signUpCont_icons_first_value1">1</h2>
                <div>
                  <hr className="signUpCont_icons_rectangle" />
                </div>
              </div>

              <div className="signUpCont_icons_second">
                <span className="drawCircle2"></span>
                <h2 className="signUpCont_icons_second_value2">2</h2>
              </div>
            </div>
          </div>
          <div className="signUpCont_form">
            <div className="signUpCont_form_name">
              <div className="signUpCont_form_name_first">
                <div className="signUpCont_form_name_firstNameLabel require">
                  <label>First Name</label>
                </div>
                <div>
                  <input
                    className="signUpCont_form_name_first_input"
                    type="text"
                    name="firstName"
                    placeholder="First"
                    onChange={(e) => {
                      setFirstError("");
                      setFirstName(e.target.value);
                    }}
                  ></input>
                  <p className="warning">{firstError}</p>
                </div>
              </div>
              <div className="signUpCont_form_name_last">
                <div className="signUpCont_form_name_lastNameLabel require">
                  <label>Last Name</label>
                </div>
                <div>
                  <input
                    className="signUpCont_form_name_last_input"
                    type="text"
                    name="lastName"
                    placeholder="Last"
                    onChange={(e) => {
                      setLastError("");
                      setLastName(e.target.value);
                    }}
                  ></input>
                  <p className="warning">{lastError}</p>
                </div>
              </div>
            </div>
            <label className="signUpCont_form_emailLabel require">Email</label>
            <input
              type="email"
              name="Email"
              placeholder="example@email.com"
              onChange={(e) => {
                setEmailError("");
                setEmail(e.target.value);
              }}
            ></input>
            <p className="warning">{emailError}</p>
            <label className="signUpCont_form_passwordLabel require">
              Password
            </label>
            <input
              type={passwordType1}
              name="userPassword"
              placeholder="**********"
              onChange={(e) => {
                setPError("");
                setUserPassword(e.target.value);
              }}
            ></input>
            <div
              className="profile_cont_mainContent_editing_password_toggle_pass"
              onClick={togglePassword1}
            >
              {passwordType1 === "password" ? (
                <img src={HideShowPass} alt="Show password" />
              ) : (
                <img src={HideVisibility} alt="Hide password" />
              )}
            </div>
            <p className="warning">{pError}</p>
            <label className="signUpCont_form_cPasswordLabel require">
              Confirm Password
            </label>
            <input
              type={passwordType2}
              name="cPassword"
              placeholder="**********"
              onChange={(e) => {
                setCError("");
                setCPassword(e.target.value);
              }}
            ></input>
            <div
              className="profile_cont_mainContent_editing_password_toggle_pass"
              onClick={togglePassword2}
            >
              {passwordType2 === "password" ? (
                <img src={HideShowPass} alt="Show password" />
              ) : (
                <img src={HideVisibility} alt="Hide password" />
              )}
            </div>
            <p className="warning">{cError}</p>
            <div className="buttonArray">
              <button className="secondaryBtn" onClick={backSplash}>
                Back
              </button>
              <button className="primaryBtn" onClick={nextClicked}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
