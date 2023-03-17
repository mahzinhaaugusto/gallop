import { useState, useEffect } from "react";
import { NavBar } from "../Components/NavBar";
import { Footer } from "../Components/Footer";
import { Button } from "../Components/Button";
import Camera from "../icons/Camera.svg";
import HideShowPass from "../icons/HideShowPass.svg";
import HideVisibility from "../icons/HideVisibility.svg";
import BackButton from "../icons/BackButton.svg";
import { PopUp } from "../Components/PopUp";
import { useNavigate } from "react-router-dom";
import Edit from "../icons/Edit.svg";
import horse from "../icons/Horse.png";
import bcrypt from "bcryptjs";
import axios from "axios";

export function Profile() {
  const [showProfile, setShowProfile] = useState(true);
  const [showEditing, setShowEditing] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  //   const [profileEdit, setProfileEdit] = useState({ bioContent: "",
  // fullName:"", });
  const profileEdit = {};

  const editProfile = (event) => {
    setShowPopUpSave(false);
    event.stopPropagation();
    setShowEditing(!showEditing);
    setShowProfile(!showProfile);
  };

  const backToProfile = (event) => {
    event.stopPropagation();
    setShowEditing(!showEditing);
    setShowProfile(!showProfile);
  };

  const signOut = () => {
    console.log("Sign Out working");
  };

  const [showCount, setShowCount] = useState(0);
  //const [credential, setCredential] = useState([]);

  const [showPopUpDelete, setShowPopUpDelete] = useState(false);

  const [showPopUpSave, setShowPopUpSave] = useState(false);

  const deleteAccount = () => {
    setShowPopUpDelete(!showPopUpDelete);
  };

  const saveEditing = () => {
    setShowPopUpSave(!showPopUpSave);
    const bioContent = document.getElementById(
      "profile_cont_mainContent_editing_bio_content"
    );
    profileEdit.bioContent = bioContent.value;

    let id = localStorage.getItem("id");
    axios.post("http://localhost:3002/api/editprofile", {
      profileEdit: profileEdit,
      id: id,
    });
  };

  const cancel = () => {
    setShowEditing(!showEditing);
    setShowProfile(!showProfile);
    setShowPopUpDelete(!showPopUpDelete);
  };

  const confirmDelete = () => {
    // Add the delete command for the db
    let id = localStorage.getItem("id");
    console.log(id);
    axios.post("http://localhost:3002/api/delete", {
      id: id
    })
    console.log("working");
  };

  let navigate = useNavigate();

  const redirect = () => {
    firstLoad();
    setShowEditing(!showEditing);
    setShowProfile(!showProfile);
    // setShowPopUpDelete(!showPopUpDelete);
    // navigate("/home");
  };
  let credential = [];
  function firstLoad() {
    axios.get("http://localhost:3002/api/get").then((response) => {
      credential = response.data;
      let id = localStorage.getItem("id");
      console.log(id);
      for (let i = 0; i < credential.length; i++) {
        if (credential[i].ID == id) {
          console.log(credential[i]);
          setProfileInfo({
            background: "",
            profile: "",
            bioContent: credential[i].bio,
            fullName: credential[i].firstName + " " + credential[i].lastName,
            phoneNumber: credential[i].phoneNumber,
            email: credential[i].email,
            websiteInfo: credential[i].website,
            userPhoto: credential[i].userPhoto,
            background: credential[i].backgroundPhoto,
          });
          // console.log(profileInfo.userPhoto);
        }
      }
    });
  }
  useEffect(() => {
    firstLoad();
    //console.log(credential);
  }, []);

  const profileEditing = {
    maxLength: 150,
    inputLength: 40,
  };

  const [passwordType, setPasswordType] = useState("password");
  // const [passInput, setPassInput] = useState("");

  // const setOnChange = (event) => {
  //   profileEdit.password = bcrypt.hashSync(
  //     event.target.value,
  //     10
  //   );
  //   setPassInput(event.target.value);
  // }

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  return (
    <div className="profile">
      <NavBar />

      {showProfile && (
        <div className="profile_cont_master">
          <h1 className="profile_title">Profile</h1>
          <div className="profile_cont_master_inner">
            <div className="profile_cont">
              <div className="profile_cont_header">
                <img
                  src={profileInfo.background}
                  alt="profile background"
                  className="profile_cont_header_background"
                />
                <div className="overlay"></div>
                <div className="profile_cont_header_content">
                  <img
                    src={profileInfo.userPhoto}
                    alt="profile pic"
                    height="150px"
                    width="150px"
                    className="profile_cont_header_content_pic"
                  />
                  <button
                    id="horseCard_myHorses_cont_details_editBtn"
                    type="button"
                    onClick={editProfile}
                  >
                    EDIT
                    <img src={Edit} alt="" />
                  </button>
                </div>
              </div>
              <div className="profile_cont_mainContent">
                <div className="profile_cont_mainContent_bio">
                  <h4 className="profile_cont_mainContent_bio_title">Bio:</h4>
                  <p className="profile_cont_mainContent_bio_content">
                    {profileInfo.bioContent}
                  </p>
                </div>
                <div className="profile_cont_mainContent_name">
                  <h4 className="profile_cont_mainContent_name_title">Name:</h4>
                  <p className="profile_cont_mainContent_name_content">
                    {profileInfo.fullName}
                  </p>
                </div>
                <div className="profile_cont_mainContent_phoneNumber">
                  <h4 className="profile_cont_mainContent_phoneNumber_title">
                    Phone Number:
                  </h4>
                  <p className="profile_cont_mainContent_phoneNumber_content">
                    {profileInfo.phoneNumber}
                  </p>
                </div>
                <div className="profile_cont_mainContent_email">
                  <h4 className="profile_cont_mainContent_email_title">
                    Email:
                  </h4>
                  <p className="profile_cont_mainContent_email_content">
                    {profileInfo.email}
                  </p>
                </div>
                <div className="profile_cont_mainContent_website">
                  <h4 className="profile_cont_mainContent_website_title">
                    Website:
                  </h4>
                  <a
                    className="profile_cont_mainContent_website_content"
                    href={profileInfo.websiteInfo}
                  >
                    {profileInfo.websiteInfo}
                  </a>
                </div>
                <div className="profile_cont_mainContent_cta">
                  <Button
                    title="Sign Out"
                    className="profile_cont_mainContent_cta_signOut"
                    onClick={signOut}
                  />
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      )}

      {showEditing && (
        <div className="profile_cont_master">
          <h1 className="profile_title">Edit Profile</h1>
          <div className="profile_cont_master_inner">
            <div className="profile_cont">
              <div
                className="profile_cont_backToProfile"
                onClick={backToProfile}
              >
                <img
                  src={BackButton}
                  alt="back to profile"
                  className="profile_cont_backToProfile_icon"
                />
                <p className="profile_cont_backToProfile_text">Back</p>
              </div>
              <div className="profile_cont_header">
                <img
                  src={profileInfo.background}
                  alt="profile background"
                  className="profile_cont_header_background"
                />
                <img
                  src={Camera}
                  alt="change background"
                  className="profile_cont_header_background_editing"
                />
                <div className="profile_cont_header_content">
                  <img
                    src={profileInfo.userPhoto}
                    alt="profile pic"
                    className="profile_cont_header_content_pic"
                  />
                  <img
                    src={Camera}
                    alt="change profile picture"
                    className="profile_cont_header_content_pic_editing"
                  />
                </div>
              </div>
              <div className="profile_cont_mainContent_editing">
                <div className="profile_cont_mainContent_editing_bio">
                  <h4 className="profile_cont_mainContent_editing_bio_title">
                    Bio:
                  </h4>
                  <textarea
                    id="profile_cont_mainContent_editing_bio_content"
                    cols="40"
                    rows="4"
                    maxLength={profileEditing.maxLength}
                    placeholder="Please tell us a bit about yourself."
                    onChange={(event) => {
                      setShowCount(event.target.value.length);
                    }}
                  ></textarea>
                  <p
                    className="profile_cont_mainContent_editing_bio_title"
                    id="profile_cont_mainContent_editing_bio_title_"
                  >
                    {showCount}/150
                  </p>
                </div>
                <div className="profile_cont_mainContent_editing_name">
                  <h4 className="profile_cont_mainContent_editing_name_title">
                    Name:
                  </h4>
                  <input
                    className="profile_cont_mainContent_editing_name_info"
                    type="text"
                    maxLength={profileEditing.inputLength}
                    placeholder="Hunter Smith"
                    onChange={(event) => {
                      const myString = event.target.value.split(" ");
                      if (myString.length == 1) {
                        profileEdit.firstName = myString;
                        profileEdit.lastName = "";
                      } else {
                        profileEdit.firstName = myString[0];
                        let lastName = "";
                        for (let i = 1; i < myString.length; i++) {
                          lastName += myString[i];
                        }
                        profileEdit.lastName = lastName;
                      }
                      //profileEdit.fullName = event.target.value;
                    }}
                  />
                </div>
                <div className="profile_cont_mainContent_editing_phoneNumber">
                  <h4 className="profile_cont_mainContent_editing_phoneNumber_title">
                    Phone Number:
                  </h4>
                  <input
                    className="profile_cont_mainContent_editing_phoneNumber_info"
                    type="number"
                    max="10"
                    placeholder="1234567890"
                    onChange={(event) => {
                      profileEdit.phoneNumber = event.target.value;
                    }}
                  />
                </div>
                <div className="profile_cont_mainContent_editing_email">
                  <h4 className="profile_cont_mainContent_editing_email_title">
                    Email:
                  </h4>
                  <input
                    className="profile_cont_mainContent_editing_email_info"
                    type="email"
                    max="10"
                    placeholder="hsmith@mylangara.ca"
                    onChange={(event) => {
                      profileEdit.email = event.target.value;
                    }}
                  />
                </div>
                <div className="profile_cont_mainContent_editing_location">
                  <h4 className="profile_cont_mainContent_editing_location_title">
                    Location:
                  </h4>
                  <input
                    className="profile_cont_mainContent_editing_location_info"
                    type="text"
                    maxLength={profileEditing.inputLength}
                    placeholder="Vancouver"
                    onChange={(event) => {
                      profileEdit.address = event.target.value;
                    }}
                  />
                </div>
                <div className="profile_cont_mainContent_editing_website">
                  <h4 className="profile_cont_mainContent_editing_website_title">
                    Website:
                  </h4>
                  <input
                    className="profile_cont_mainContent_editing_website_info"
                    type="text"
                    maxLength={profileEditing.inputLength}
                    placeholder="thegallopapp.com"
                    onChange={(event) => {
                      profileEdit.website = event.target.value;
                    }}
                  />
                </div>
                <div className="profile_cont_mainContent_editing_password">
                  <h4 className="profile_cont_mainContent_editing_password_title">
                    Password:
                  </h4>
                  <input
                    className="profile_cont_mainContent_editing_password_info"
                    type={passwordType}
                    // value={passInput}
                    maxLength={profileEditing.inputLength}
                    placeholder="************"
                    onChange={(event) => {
                      profileEdit.password = bcrypt.hashSync(
                        event.target.value,
                        10
                      );
                      // setPassInput(event.target.value)
                    }}
                  />
                  <div
                    className="profile_cont_mainContent_editing_password_toggle"
                    onClick={togglePassword}
                  >
                    {passwordType === "password" ? (
                      <img src={HideShowPass} alt="Show password" />
                    ) : (
                      <img src={HideVisibility} alt="Hide password" />
                    )}
                  </div>
                </div>
                <div className="profile_cont_mainContent_editing_cta">
                  <p
                    className="profile_cont_mainContent_editing_cta_deleteBtn"
                    onClick={deleteAccount}
                  >
                    Delete Account
                  </p>
                  <Button
                    title="Save"
                    className="profile_cont_mainContent_editing_cta_saveBtn"
                    onClick={saveEditing}
                  />
                </div>

                {showPopUpDelete && (
                  <PopUp
                    title="Delete Account"
                    description="Are you sure you want to delete your account?"
                    addContent={
                      <div className="popUp_btn_cont">
                        <Button
                          className="popUp_btn_cancelBtn"
                          title="Cancel"
                          onClick={cancel}
                        />
                        <Button
                          className="popUp_btn_deleteBtn"
                          title="Delete"
                          onClick={confirmDelete}
                        />
                      </div>
                    }
                  />
                )}

                {showPopUpSave && (
                  <PopUp
                    title="Saved!"
                    description="Your changes in your profile have been saved"
                    addContent={
                      <div className="popUp_btn_cont">
                        <Button
                          className="popUp_btn_doneBtn"
                          title="Go to Profile Page"
                          onClick={redirect}
                        />
                      </div>
                    }
                  />
                )}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
