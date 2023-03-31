import horse from "../icons/Horse.png";
import { Button } from "../Components/Button";
import { useState } from "react";
import { PopUp } from "../Components/PopUp";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";


export function ForgotPassword() {
    const [showPopUp, setShowPopUP] = useState(false);
    // const [forgotPass, setForgotPass] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [exists, setExists] = useState("");
    const [email, setEmail] = useState("");

    // let navigate = useNavigate();

    const checkEmail = async (email) => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}checkemail`, {
            params: { email }
        });
        return response.data.emailExists;
    }

    // const intervalRedirect = () => {
    //     navigate("/login");
    // }

    const resetPass = async () => {
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        let a = email.match(validRegex);

        if (email === "" || !a) {
            setErrorMessage("Please provide a valid email");
        } else {

            const emailExists = await checkEmail(email);

            if (!emailExists) {
                setExists("This is not a valid email, please provide a valid email");
            } else {
                axios.post(`${process.env.REACT_APP_API_URL}forgotpassword`, {
                    email: email
                })
                setShowPopUP(!showPopUp);
                // setInterval(intervalRedirect, 3000);
            }
        }
    }

    return (
        <>
            <div className="forgotPassword_master">
                <div className="forgotPassword">
                    <div className="forgotPassword_image">
                        <img className="splashScreen_background" src={horse} alt="Splash Screen" />
                    </div>

                    <div className="forgotPassword_cont_content">
                        <h1>Forgot Password?</h1>

                        <label className="forgotPassword_cont_content_label require">Email Address</label>
                        <input
                            type="email"
                            name="Email"
                            placeholder="example@email.com"
                            onChange={(e) => {
                                setErrorMessage("");
                                setExists("");
                                setEmail(e.target.value);
                            }}
                        ></input>
                        <p className="warning">{errorMessage}</p>
                        <p className="warning">{exists}</p>
                        <div className="forgotPassword_cont_btn">
                            <Button title="Request New Password" className="forgotPassword_cont_btn_reset" onClick={resetPass} />
                            <Link to="/login">Back to Sign In Page</Link>
                        </div>
                    </div>
                </div>
            </div>
            {showPopUp && (
                <PopUp title="Reset Password Requested" description="Please check your inbox for a reset password link">
                </PopUp>
            )}
        </>
    )
}