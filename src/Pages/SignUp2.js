import { useLocation } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import ellipse from "../icons/Ellipse.svg";
import ellipse2 from "../icons/Ellipse2.svg";
import camera from "../icons/Camera.svg";
export function SignUp2() {
  const location = useLocation();
  const [Address, setAddress] = useState("");
  const [Website, setWebsite] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  let navigate = useNavigate();

  const submitClicked = () => {
    Axios.post("http://localhost:3002/api/insert", {
      firstName: location.state.firstName,
      lastName: location.state.lastName,
      userPassword: location.state.userPassword,
      Email: location.state.Email,
      Address: Address,
      Website: Website,
      phoneNumber: phoneNumber,
    });
    alert("data written successfully");
    navigate("/");
  };

  return (
    <>
      <div className="signUp2Cont">
        <h1>Tell Us More About Yourself</h1>

        <div className="signUp2Cont_steps">
          <p className="signUp2Cont_steps_step1">Step 1</p>
          <p className="signUp2Cont_steps_step2">Step 2</p>
        </div>
        <div className="signUp2Cont_icons">
          <div className="signUp2Cont_icons_first">
            <img src={ellipse2} alt="not found" height="40px" width="40px" />
            <h2 className="signUp2Cont_icons_first_value1">1</h2>
            <div className="signUp2Cont_icons_rectangle">
              <hr />
            </div>
          </div>

          <div className="signUp2Cont_icons_second">
            <img src={ellipse} alt="not found" height="40px" width="40px" />
            <h2 className="signUp2Cont_icons_second_value2">2</h2>
          </div>
        </div>

        <div className="signUp2Cont_form">
          <div className="signUp2Cont_form_image"></div>
          <div className="signUp2Cont_form_camera">
            <img src={camera} alt="not found" />
          </div>
          <label className="signUp2Cont_form_phoneNumberLabel require">
            PhoneNumber
          </label>
          <input
            type="number"
            name="phoneNumber"
            onChange={(e) => {
              setPhoneNumber(+e.target.value);
            }}
          ></input>
          <label className="signUp2Cont_form_addressLabel require">
            Address
          </label>
          <input
            type="text"
            name="Address"
            placeholder="Street, City, Province"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          ></input>
          <label className="signUp2Cont_form_websiteLabel">Website</label>
          <input
            type="text"
            name="Website"
            onChange={(e) => {
              setWebsite(e.target.value);
            }}
          ></input>

          <button onClick={submitClicked}>Create An Account</button>
          <button>Back</button>
          <p>{phoneNumber}</p>
        </div>
      </div>
    </>
  );
}
