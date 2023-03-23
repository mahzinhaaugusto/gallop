import horse from "../icons/Horse.png";
import WhiteLogo from "../icons/WhiteLogo.svg";
import { useEffect } from "react";
import { Button } from "../Components/Button";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

// import { useGoogleLogin } from '@react-oauth/google';
// import { Login } from "./Login";

export function SplashScreen() {
  let navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
  });
  // const [showLogin, setShowLogin] = useState(false);

  // const signUpGoogle = useGoogleLogin({
  //     onSuccess: codeResponse => console.log(codeResponse)
  // })
  // () => {

  // onError:
  //     onSuccess = { credentialResponse => {
  //     console.log(credentialResponse);
  // }
  // }
  // onError={() => {
  //     console.log('Login Failed');
  // }}
  // Add auth Google
  // }

  const signUpApple = () => {
    // Add auth Google
  };

  const signUpPage = () => {
    navigate("/signup");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="splashScreen_master">
        <div className="splashScreen">
          <div className="splashScreen_image">
            <img
              className="splashScreen_background"
              src={horse}
              alt="Splash Screen"
            />
            <img
              className="splashScreen_logo"
              src={WhiteLogo}
              alt="Gallop App Logo"
            />
          </div>

          <div className="splashScreen_cont_content">
            <h1>Join Gallop for Best Horses</h1>
            <h3>
              Already have an account? &nbsp;
              <Link to="/login" className="splashScreen_cont_content_signIn">
                Sign In
              </Link>
            </h3>

            <div className="horizontalCont">
              <hr className="horizontalCont_leftHorizon"></hr>
              <p className="horizontalCont_Para">OR CONTINUE WITH</p>
              <hr className="horizontalCont_rightHorizon"></hr>
            </div>

            <div className="splashScreen_cont_btn">
              {/* <Button title="Continue with Google" className="splashScreen_cont_btn_google" onClick={
                                useGoogleLogin({
                                    onSuccess: codeResponse => console.log(codeResponse)
                                })
                            } /> */}
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
              <Button
                title="Continue with Email"
                className="splashScreen_cont_btn_email"
                onClick={signUpPage}
              />
              <Button
                title="Continue with Apple"
                className="splashScreen_cont_btn_apple"
                onClick={signUpApple}
              />
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
