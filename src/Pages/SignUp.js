import { useState } from "react";

import "../App.css";
import ellipse from "../icons/Ellipse.svg";
import ellipse2 from "../icons/Ellipse2.svg";
import { useNavigate } from "react-router-dom";
export function SignUp() {
  const [Email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  let navigate = useNavigate();

  const nextClicked = () => {
    if (userPassword !== cPassword) {
      alert("Password mismatch");
    } else {
      navigate("/signup2", {
        state: {
          firstName: firstName,
          lastName: lastName,
          userPassword: userPassword,
          Email: Email,
        },
      });
    }
  };

  return (
    <div className="signUpCont">
      <h1>Gallop Sign UP</h1>
      <div className="signUpCont_steps">
        <p className="signUpCont_steps_step1">Step 1</p>
        <p className="signUpCont_steps_step2">Step 2</p>
      </div>
      <div className="signUpCont_icons">
        <div className="signUpCont_icons_first">
          <img src={ellipse} alt="not found" height="40px" width="40px" />
          <h2 className="signUpCont_icons_first_value1">1</h2>
          <div className="signUpCont_icons_rectangle">
            <hr />
          </div>
        </div>

        <div className="signUpCont_icons_second">
          <img src={ellipse2} alt="not found" height="40px" width="40px" />
          <h2 className="signUpCont_icons_second_value2">2</h2>
        </div>
      </div>
      <div className="signUpCont_form">
        <div className="signUpCont_form_name">
          <label className="signUpCont_form_name_firstNameLabel require">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          ></input>
          <label className="signUpCont_form_name_lastNameLabel require">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          ></input>
        </div>
        <label className="signUpCont_form_emailLabel require">Email</label>
        <input
          type="email"
          name="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>

        <label className="signUpCont_form_passwordLabel require">
          Password
        </label>
        <input
          type="password"
          name="userPassword"
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
        ></input>
        <label className="signUpCont_form_cPasswordLabel require">
          Confirm Password
        </label>
        <input
          type="password"
          name="cPassword"
          onChange={(e) => {
            setCPassword(e.target.value);
          }}
        ></input>
        <button onClick={nextClicked}>Next</button>
        <button>Back</button>
      </div>
    </div>
  );
}
