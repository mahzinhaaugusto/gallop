import { useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import "firebase/storage";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import camera from "../icons/Camera.svg";
import horse from "../icons/Horse.png";

export function SignUp2() {
  const location = useLocation();
  const [Address, setAddress] = useState("");
  const [Website, setWebsite] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

  const firebaseConfig = {
    apiKey: "AIzaSyASdmqlaScVgkSxCrvYng7_SzRnE2VQRgU",
    authDomain: "app1-504b3.firebaseapp.com",
    databaseURL: "https://app1-504b3-default-rtdb.firebaseio.com",
    projectId: "app1-504b3",
    storageBucket: "app1-504b3.appspot.com",
    messagingSenderId: "150727407420",
    appId: "1:150727407420:web:de3b1d71b182fd722dd039",
    measurementId: "G-JC5YWN05W8",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  let navigate = useNavigate();

  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);
    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");

    ctx.drawImage(video, 0, 0, width, height);

    document.getElementById("cameraCont").style.display = "none";
    document.getElementById("profilePhoto").src = photo.toDataURL();
    setUserPhoto(photo.toDataURL());

    photo.toBlob((blob) => {
      const storage = getStorage();
      const storageRef = ref(storage, `gallop/${location.state.firstName}`);
      uploadBytes(storageRef, blob).then(() => {
        getDownloadURL(storageRef).then((result) => {
          setUserPhoto(result);
        });
      });
    });
  };

  const submitClicked = () => {
    Axios.post("http://localhost:3002/api/insert", {
      firstName: location.state.firstName,
      lastName: location.state.lastName,
      userPassword: location.state.userPassword,
      Email: location.state.Email,
      Address: Address,
      Website: Website,
      phoneNumber: phoneNumber,
      userPhoto: userPhoto,
    });
    alert("data written successfully");
    navigate("/");
  };

  const profilePicture = () => {
    // cameraOn = true;
    document.getElementById("cameraCont").style.display = "block";
    getVideo();
  };

  return (
    <>
      <div className="signUp">
        <div className="signUpImage">
          <img className="signUpImage" src={horse} alt="not found" />
        </div>
        <div className="signUpForm">
          <div className="signUp2Cont">
            <h1>Tell Us More About Yourself</h1>
            <div className="icons">
              <div className="signUp2Cont_steps">
                <p className="signUp2Cont_steps_step1">Step 1</p>
                <p className="signUp2Cont_steps_step2">Step 2</p>
              </div>
              <div className="signUp2Cont_icons">
                <div className="signUp2Cont_icons_first">
                  <span className="drawCircle1"></span>
                  <h2 className="signUp2Cont_icons_first_value1">1</h2>
                  <div>
                    <hr className="signUp2Cont_icons_rectangle" />
                  </div>
                </div>

                <div className="signUp2Cont_icons_second">
                  <span className="signUp2Cont_icons_second_drawCircle2"></span>
                  <h2 className="signUp2Cont_icons_second_value2">2</h2>
                </div>
              </div>
            </div>

            <div className="signUp2Cont_form">
              <div className="signUp2Cont_form_image">
                <img
                  id="profilePhoto"
                  src={camera}
                  alt="not found"
                  onClick={profilePicture}
                />
              </div>

              <div className="camera_Cont" id="cameraCont">
                <video ref={videoRef}></video>
                <button onClick={takePhoto}>Click</button>
                <div className="result">
                  <canvas ref={photoRef}></canvas>
                </div>
              </div>

              <label className="signUp2Cont_form_phoneNumberLabel require">
                PhoneNumber
              </label>
              <input
                type="number"
                name="phoneNumber"
                placeholder="Please include national number."
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
              <div className="buttonArray">
                <button className="secondaryBtn">Back</button>
                <button className="primaryBtn" onClick={submitClicked}>
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
