import horse from "../icons/Horse.png";
import WhiteLogo from "../icons/WhiteLogo.svg";
import { useEffect, useState } from "react";
import { Button } from "../Components/Button";
import { useNavigate, Link } from "react-router-dom";
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import axios from "axios";

export function SplashScreen() {
  let navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
  });

  const signUpPage = () => {
    navigate("/signup");
  };

  return (
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
            <GoogleOAuthProvider
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            >
              <GoogleButton />
            </GoogleOAuthProvider>
            <Button
              title="Continue with Email"
              className="splashScreen_cont_btn_email"
              onClick={signUpPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function GoogleButton() {
  const [accessToken, setAccessToken] = useState(null);

  const signUpGoogle = useGoogleLogin({
    onSuccess: codeResponse => {
      const access_token = codeResponse.access_token;
      setAccessToken(access_token);
    }
  },
    axios.get(`${process.env.REACT_APP_API_URL}auth`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      }
    }))

  return (
    <button
      className="splashScreen_cont_btn_google"
      onClick={() => signUpGoogle()}
    >
      Continue with Google
    </button>
  );
}
