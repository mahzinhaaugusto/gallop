import horse from "../icons/Horse.png";
import WhiteLogo from "../icons/WhiteLogo.svg";
import { useEffect } from "react";
import { Button } from "../Components/Button";
import { useNavigate } from "react-router-dom";
// import { Login } from "./Login";

export function SplashScreen() {
  let navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
  });
  // const [showLogin, setShowLogin] = useState(false);

  const goToLogin = () => {
    navigate("/login");
    // setShowLogin(!showLogin);
  };

  // const [showLogin, setShowLogin] = useState(false);

  const signUpGoogle = () => {
    // Add auth Google
  };

  const signUpApple = () => {
    // Add auth Google
  };

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
            <a href="/login" className="splashScreen_cont_content_signIn">
              Sign In
            </a>
          </h3>

          <div className="horizontalCont">
            <hr className="horizontalCont_leftHorizon"></hr>
            <p className="horizontalCont_Para">OR CONTINUE WITH</p>
            <hr className="horizontalCont_rightHorizon"></hr>
          </div>

          <div className="splashScreen_cont_btn">
            <Button
              title="Continue with Google"
              className="splashScreen_cont_btn_google"
              onClick={signUpGoogle}
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
  );
}
