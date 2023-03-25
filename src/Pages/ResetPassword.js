import horse from "../icons/Horse.png";
import { Button } from "../Components/Button";
import { useState } from "react";
// import { PopUp } from "../Components/PopUp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINT } from "../server";
import HideShowPass from "../icons/HideShowPass.svg";
import HideVisibility from "../icons/HideVisibility.svg";
import bcrypt from "bcryptjs";

export function ResetPassword() {
    let navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordType1, setPasswordType1] = useState("password");
    const [passwordType2, setPasswordType2] = useState("password");
    const [token, setToken] = useState("");
    const [errorToken, setErrorToken] = useState("");

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

    const resetPass2 = () => {
        if (token === "") {
            setErrorToken("Please provide a valid token");
        }
        if (password === "" || confirmPassword === "") {
            setErrorMessage("Please provide a password");
        }
        if (password !== confirmPassword) {
            setErrorMessage("Both passwords do not match, please check the data and try again");
        } else {
            const hashedPassword = bcrypt.hashSync(password, 10);

            axios.post(`${API_ENDPOINT}reset`, {
                userPassword: hashedPassword,
                token: token
            })
            // console.log(password);
            // console.log(token);
            navigate("/login");
        }
    }

    return (
        <>
            <div className="resetPassword_master">
                <div className="resetPassword">
                    <div className="resetPassword_image">
                        <img className="splashScreen_background" src={horse} alt="Splash Screen" />
                    </div>

                    <div className="resetPassword_cont_content">
                        <h1>Reset Password</h1>
                        <label className="resetPassword_cont_content_label require">Token</label>
                        <input
                            type="text"
                            name="token"
                            placeholder="Token"
                            onChange={(e) => {
                                setErrorMessage("");
                                setToken(e.target.value);
                            }}
                        ></input>
                        <p className="warning">{errorToken}</p>
                        <label className="resetPassword_cont_content_label require">Password</label>
                        <input
                            type={passwordType1}
                            name="password"
                            placeholder="**********"
                            onChange={(e) => {
                                setErrorMessage("");
                                setPassword(e.target.value);
                            }}
                        ></input>
                        <div
                            className="profile_cont_mainContent_editing_password_toggle"
                            onClick={togglePassword1}
                        >
                            {passwordType1 === "password" ? (
                                <img src={HideShowPass} alt="Show password" />
                            ) : (
                                <img src={HideVisibility} alt="Hide password" />
                            )}
                        </div>
                        <label className="resetPassword_cont_content_label require">Confirm Password</label>
                        <input
                            type={passwordType2}
                            name="confirmPassword"
                            placeholder="**********"
                            onChange={(e) => {
                                setErrorToken("");
                                setConfirmPassword(e.target.value);
                            }}
                        ></input>
                        <div
                            className="profile_cont_mainContent_editing_password_toggle"
                            onClick={togglePassword2}
                        >
                            {passwordType2 === "password" ? (
                                <img src={HideShowPass} alt="Show password" />
                            ) : (
                                <img src={HideVisibility} alt="Hide password" />
                            )}
                        </div>
                        <p className="warning">{errorMessage}</p>
                        {/* <p className="warning">{exists}</p> */}
                        <div className="resetPassword_cont_btn">
                            <Button title="Reset Password" className="resetPassword_cont_btn_reset" onClick={resetPass2} />
                            {/* <Link to="/login">Back to Sign In Page</Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}