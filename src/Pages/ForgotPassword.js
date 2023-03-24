import horse from "../icons/Horse.png";
import { Button } from "../Components/Button";
import { useEffect, useState } from "react";
// import { PopUp } from "../Components/PopUp";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINT } from "../server";


export function ForgotPassword() {
    // const [resetPassword, setResetPassword] = useState(false);
    // const [forgotPass, setForgotPass] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    // const [emailTesting, setEmailTesting] = useState([]);

    // let navigate = useNavigate();

    // useEffect(() => {
    //     axios.get(`${API_ENDPOINT}forgotpassword`).then((response) => {
    //         setEmailTesting(response.data);
    //         console.log(emailTesting);
    //     });
    // }, []);

    const resetPass = () => {
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        let a = email.match(validRegex);

        if (email === "" || !a) {
            setErrorMessage("Please provide a valid email");
        } else {
            axios.post(`${API_ENDPOINT}forgotpassword`, {
                email: email
            })
            console.log(email);
        }

        // setResetPassword(!resetPassword);
        // setForgotPass(!forgotPass);
        // console.log("working");
    }

    // const redirect = () => {
    //     navigate("/login");
    // }

    return (
        <>
            {/* {forgotPass && ( */}
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
                                setEmail(e.target.value);
                            }}
                        ></input>
                        <p className="warning">{errorMessage}</p>
                        <div className="forgotPassword_cont_btn">
                            <Button title="Reset Password" className="forgotPassword_cont_btn_reset" onClick={resetPass} />
                            <Link to="/login">Back to Sign In Page</Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* )} */}

            {/* {resetPassword && (
                <div className="forgotPassword_master">
                    <div className="forgotPassword">
                        <div className="forgotPassword_image">
                            <img className="splashScreen_background" src={horse} alt="Splash Screen" />
                        </div>

                        <div className="forgotPassword_cont_content">
                            <h1>Forgot Password?</h1>
                            <p>The instructions to retrieve your password were sent to your email.</p>
                            <p>Please check the email and proceed with the instructions.</p>
                            <div className="forgotPassword_cont_btn">
                                <Button title="Back to Sign In page" className="forgotPassword_cont_btn_reset" onClick={redirect} />
                            </div>
                        </div>
                    </div>
                </div>
            )} */}
        </>
    )
}