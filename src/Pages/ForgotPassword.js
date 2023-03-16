import horse from "../icons/Horse.png";
import { Button } from "../Components/Button";
import { useState } from "react";
import { PopUp } from "../Components/PopUp";
import { useNavigate } from "react-router-dom";

export function ForgotPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [forgotPass, setForgotPass] = useState(true);

    let navigate = useNavigate();

    const resetPassword = () => {
        setShowPassword(!showPassword);
        setForgotPass(!forgotPass);
        console.log("working");
    }

    const redirect = () => {
        navigate("/login");
    }

    return (
        <>
            {forgotPass && (
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
                            // onChange={(e) => {
                            //     setEmail(e.target.value);
                            // }}
                            ></input>

                            <div className="forgotPassword_cont_btn">
                                <Button title="Reset Password" className="forgotPassword_cont_btn_reset" onClick={resetPassword} />
                                <a href="/login">Back to Sign In Page</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showPassword && (
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
            )}
        </>
    )
}