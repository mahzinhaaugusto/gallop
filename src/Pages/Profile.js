import { useState, useEffect } from "react";
import { NavBar } from "../Components/NavBar";
import { Footer } from "../Components/Footer";
import { Button } from "../Components/Button";
import Camera from "../icons/Camera.svg";
import HideShowPass from "../icons/HideShowPass.svg";
import BackButton from "../icons/BackButton.svg";
import { PopUp } from "../Components/PopUp";
import { useNavigate } from "react-router-dom";
import horse from "../icons/Horse.png";

import Axios from "axios";

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
    Axios.post("http://localhost:3002/api/editprofile", {
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
  };

  let navigate = useNavigate();

  const redirect = () => {
    firstLoad();
    setShowEditing(!showEditing);
    setShowProfile(!showProfile);
    setShowPopUpDelete(!showPopUpDelete);

    // navigate("/home");
  };
  let credential = [];
  function firstLoad() {
    Axios.get("http://localhost:3002/api/get").then((response) => {
      credential = response.data;
      let id = localStorage.getItem("id");
      for (let i = 0; i < credential.length; i++) {
        if (credential[i].ID == id) {
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
          console.log(profileInfo.fullName);
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

  return (
    <div className="profile">
      <NavBar />

      {showProfile && (
        <div className="profile_cont_master">
          <h2 className="profile_title">Profile</h2>
          <div className="profile_cont_master_inner">
            <div className="profile_cont">
              <div className="profile_cont_header">
                <img
                  src={profileInfo.background}
                  alt="profile background"
                  className="profile_cont_header_background"
                />
                <div className="profile_cont_header_content">
                  <img
                    src={profileInfo.userPhoto}
                    alt="profile pic"
                    className="profile_cont_header_content_pic"
                  />
                  <Button
                    className="profile_cont_header_content_edit"
                    title="Edit Profile"
                    onClick={editProfile}
                  />
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
                  <p className="profile_cont_mainContent_website_content">
                    {profileInfo.websiteInfo}
                  </p>
                </div>
                <Button
                  title="Sign Out"
                  className="profile_cont_mainContent_cta_signOut"
                  onClick={signOut}
                />
              </div>
            </div>
            <Footer />
          </div>
        </div>
      )}

      {showEditing && (
        <div className="profile_cont_master">
          <h2 className="profile_title">Edit Profile</h2>
          <div className="profile_cont">
            <div className="profile_cont_backToProfile" onClick={backToProfile}>
              <img
                src={BackButton}
                alt="back to profile"
                className="profile_cont_backToProfile_icon"
              />
              <p className="profile_cont_backToProfile_text">Back</p>
            </div>
            <div className="profile_cont_header">
              <img
                src={profileInfo.img1}
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
                  src={profileInfo.img2}
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
                <p
                  className="profile_cont_mainContent_editing_bio_title"
                  id="profile_cont_mainContent_editing_bio_title_"
                >
                  {showCount}/150
                </p>
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
                  className="profile_cont_mainContent_editing_name_info"
                  type="password"
                  maxLength={profileEditing.inputLength}
                  placeholder="************"
                  onChange={(event) => {
                    profileEdit.password = event.target.value;
                  }}
                />
                <img src={HideShowPass} alt="hide and show password icon" />
              </div>
              <div className="profile_cont_mainContent_editing_cta">
                <p
                  className="profile_cont_mainContent_editing_cta_deleteBtn"
                  onClick={deleteAccount}
                >
                  Delete Account
                </p>
                <Button
                  title="Save +"
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
                        title="Done"
                        onClick={redirect}
                      />
                    </div>
                  }
                />
              )}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
