import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import horse from "../icons/Horse.png";

export function SignUp() {
  const [Email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [firstEror, setFirstError] = useState("");
  const [lastEror, setLastError] = useState("");
  const [emailEror, setEmailError] = useState("");
  const [pEror, setPError] = useState("");

  let navigate = useNavigate();

  const nextClicked = () => {
    if (firstName === "") {
      setFirstError("Please Enter First Name");
    }
    if (lastName === "") {
      setLastError("Please Enter Last Name");
    }
    if (userPassword === "") {
      setPError("Please Enter valid Password");
    }
    if (Email === "") {
      setEmailError("Please Enter Email Address");
    }
    if (userPassword !== cPassword) {
      alert("Password mismatch");
    } else if (
      firstName !== "" &&
      lastName !== "" &&
      userPassword !== "" &&
      Email !== ""
    ) {
      const hashedPassword = bcrypt.hashSync(userPassword, 10);
      //console.log(hashedPassword);
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

  return (
    <div className="signUp">
      <div className="signUpImage">
        <img className="signUpImage" src={horse} alt="not found" />
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
                      setFirstName(e.target.value);
                    }}
                  ></input>
                  <p className="warning">{firstEror}</p>
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
                      setLastName(e.target.value);
                    }}
                  ></input>
                  <p className="warning">{lastEror}</p>
                </div>
              </div>
            </div>
            <label className="signUpCont_form_emailLabel require">Email</label>
            <input
              type="email"
              name="Email"
              placeholder="example@email.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            <p className="warning">{emailEror}</p>

            <label className="signUpCont_form_passwordLabel require">
              Password
            </label>
            <input
              type="password"
              name="userPassword"
              placeholder="**********"
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
            ></input>
            <p className="warning">{pEror}</p>
            <label className="signUpCont_form_cPasswordLabel require">
              Confirm Password
            </label>
            <input
              type="password"
              name="cPassword"
              placeholder="**********"
              onChange={(e) => {
                setCPassword(e.target.value);
              }}
            ></input>
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
