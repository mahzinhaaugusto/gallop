// import { API_ENDPOINT } from "../server";
import { useState, useEffect } from "react";
import { NavBar } from "../Components/NavBar";
import { Footer } from "../Components/Footer";
import { Button } from "../Components/Button";
import Camera from "../icons/Camera.svg";
import BackButton from "../icons/BackButton.svg";
import { PopUp } from "../Components/PopUp";
import { useNavigate } from "react-router-dom";
import Edit from "../icons/Edit.svg";
import axios from "axios";
import { googleLogout } from "@react-oauth/google";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export function Profile() {
  const [showProfile, setShowProfile] = useState(true);
  const [showEditing, setShowEditing] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  // const [background, setBackground] = useState("");
  // const [previewUrl, setPreviewUrl] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const profileEdit = profileInfo;

  let navigate = useNavigate();

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
    localStorage.clear();
    googleLogout();
    navigate("/");
  };

  const [showCount, setShowCount] = useState(0);

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

    // const storage = getStorage();
    // const storageRef = ref(storage, `Horsephoto/${background.name}`);
    // uploadBytes(storageRef, background)
    //   .then(() => {
    //     getDownloadURL(storageRef)
    //       .then((result) => {

    //       })
    //   })

    axios.post(`${process.env.REACT_APP_API_URL}editprofile`, {
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
    axios.post(`${process.env.REACT_APP_API_URL}delete`, {
      id: id,
    });
    navigate("/");
  };

  const redirect = () => {
    firstLoad();
    setShowEditing(!showEditing);
    setShowProfile(!showProfile);
  };

  let credential = [];

  function firstLoad() {
    axios.get(`${process.env.REACT_APP_API_URL}get`).then((response) => {
      credential = response.data;
      let id = localStorage.getItem("id");
      // console.log(id);
      for (let i = 0; i < credential.length; i++) {
        // eslint-disable-next-line
        if (credential[i].ID == id) {
          // console.log(credential[i]);
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
            password: credential[i].userPassword,
            website: credential[i].website,
            firstName: credential[i].firstName,
            lastName: credential[i].lastName,
          });
          // console.log(profileInfo.userPhoto);
        }
      }
    });
  }

  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      // console.log("sorry");
      navigate("/login");
    }
    firstLoad();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const profileEditing = {
    maxLength: 150,
    inputLength: 40,
  };

  const changeBackground = (event) => {
    const file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const storage = getStorage();
      const storageRef = ref(storage, `Horsephoto/${file.name}`);
      uploadBytes(storageRef, file).then(() => {
        getDownloadURL(storageRef).then((result) => {
          profileEdit.background = result;
          console.log(result);
        });
      });
      document.getElementById("backgroundPhoto").src = reader.result;
    };
  };

  const changeProfilePhoto = (event) => {
    const file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const storage = getStorage();
      const storageRef = ref(storage, `Horsephoto/${file.name}`);
      uploadBytes(storageRef, file).then(() => {
        getDownloadURL(storageRef).then((result) => {
          profileEdit.profilePhoto = result;
          console.log(result);
        });
      });
      document.getElementById("profilePhoto").src = reader.result;
    };
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
                <div className="profile_cont_mainContent_name_phoneNumber_cont">
                  <div className="profile_cont_mainContent_name">
                    <h4 className="profile_cont_mainContent_name_title">
                      Name:
                    </h4>
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
                </div>
                <div className="profile_cont_mainContent_email_website_cont">
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
                  id="backgroundPhoto"
                  src={profileInfo.background}
                  alt="profile background"
                  className="profile_cont_header_background"
                />
                <label for="backgroundChange">
                  <img
                    src={Camera}
                    alt="change background"
                    className="profile_cont_header_background_editing"
                  />
                </label>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="profile_cont_header_background_editing_selection"
                  name="newBackground"
                  id="backgroundChange"
                  onChange={changeBackground}
                />
                <div className="profile_cont_header_content">
                  <img
                    id="profilePhoto"
                    src={profileInfo.userPhoto}
                    alt="profile pic"
                    className="profile_cont_header_content_pic"
                  />
                  <label htmlFor="profileChange">
                    <img
                      src={Camera}
                      alt="change profile"
                      className="profile_cont_header_content_pic_editing"
                    />
                  </label>
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className="profile_cont_header_background_editing_selection"
                    name="newBackground"
                    id="profileChange"
                    onChange={changeProfilePhoto}
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
                    defaultValue={profileInfo.bioContent}
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
                    defaultValue={profileInfo.fullName}
                    onChange={(event) => {
                      const myString = event.target.value.split(" ");
                      // eslint-disable-next-line
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
                    placeholder="1234567890"
                    defaultValue={profileInfo.phoneNumber}
                    onChange={(event) => {
                      profileEdit.phoneNumber = event.target.value;
                    }}
                    onWheel={(e) => e.target.blur()}
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
                    defaultValue={profileInfo.email}
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
                    defaultValue={sessionStorage.getItem("city")}
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
                    defaultValue={profileInfo.websiteInfo}
                    onChange={(event) => {
                      profileEdit.website = event.target.value;
                    }}
                  />
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
