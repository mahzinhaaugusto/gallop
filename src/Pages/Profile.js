import { useState } from "react";
import { NavBar } from "../Components/NavBar";
import { Footer } from "../Components/Footer";
import { Button } from "../Components/Button";
import Camera from "../icons/Camera.svg";
import HideShowPass from "../icons/HideShowPass.svg";
import BackButton from "../icons/BackButton.svg";
import { PopUp } from "../Components/PopUp";
import { useNavigate } from "react-router-dom";

export function Profile() {
    const [showProfile, setShowProfile] = useState(true);
    const [showEditing, setShowEditing] = useState(false);

    const editProfile = (event) => {
        event.stopPropagation();
        setShowEditing(!showEditing);
        setShowProfile(!showProfile);
    }

    const backToProfile = (event) => {
        event.stopPropagation();
        setShowEditing(!showEditing);
        setShowProfile(!showProfile);
    }

    const [showCount, setShowCount] = useState();

    const [showPopUpDelete, setShowPopUpDelete] = useState(false);
    const [showPopUpSave, setShowPopUpSave] = useState(false);

    const deleteAccount = () => {
        setShowPopUpDelete(!showPopUpDelete);

    }

    const saveEditing = () => {
        setShowPopUpSave(!showPopUpSave);
        // Add the save command for the db
    }

    const cancel = () => {
        setShowEditing(!showEditing);
        setShowProfile(!showProfile);
    }

    const confirmDelete = () => {
        // Add the delete command for the db
    }

    let navigate = useNavigate();
    const redirect = () => {
        navigate("/");
    }

    const profileInfo = {
        background: "",
        profile: "",
        bioContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat lorem.",
        fullName: "TESTING TESTING TESTING",
        phoneNumber: 111111111111,
        email: "user@domain.com",
        websiteInfo: "www.myhorses.ca"
    }

    const profileEditing = {
        maxLength: 150,
        inputLength: 40
    }

    return (
        <div className="profile">
            <NavBar />

            {showProfile && (
                <div className="profile_cont_master">
                    <h2 className="profile_title">Profile</h2>
                    <div className="profile_cont">
                        <div className="profile_cont_header">
                            <img src={profileInfo.background} alt="profile background" className="profile_cont_header_background" />
                            <div className="profile_cont_header_content">
                                <img src={profileInfo.profile} alt="profile pic" className="profile_cont_header_content_pic" />
                                <Button className="profile_cont_header_content_edit" title="Edit Profile" onClick={editProfile} />
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
                                <h4 className="profile_cont_mainContent_phoneNumber_title">Phone Number:</h4>
                                <p className="profile_cont_mainContent_phoneNumber_content">
                                    {profileInfo.phoneNumber}
                                </p>
                            </div>
                            <div className="profile_cont_mainContent_email">
                                <h4 className="profile_cont_mainContent_email_title">Email:</h4>
                                <p className="profile_cont_mainContent_email_content">
                                    {profileInfo.email}
                                </p>
                            </div>
                            <div className="profile_cont_mainContent_website">
                                <h4 className="profile_cont_mainContent_website_title">Website:</h4>
                                <p className="profile_cont_mainContent_website_content">
                                    {profileInfo.websiteInfo}
                                </p>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            )}

            {showEditing && (
                <div className="profile_cont_master">
                    <h2 className="profile_title">Edit Profile</h2>
                    <div className="profile_cont">
                        <div className="profile_cont_backToProfile" onClick={backToProfile}>
                            <img src={BackButton} alt="back to profile" className="profile_cont_backToProfile_icon" />
                            <p className="profile_cont_backToProfile_text">Back</p>
                        </div>
                        <div className="profile_cont_header">
                            <img src={profileInfo.img1} alt="profile background" className="profile_cont_header_background" />
                            <img src={Camera} alt="change background" className="profile_cont_header_background_editing" />
                            <div className="profile_cont_header_content">
                                <img src={profileInfo.img2} alt="profile pic" className="profile_cont_header_content_pic" />
                                <img src={Camera} alt="change profile picture" className="profile_cont_header_content_pic_editing" />
                            </div>
                        </div>
                        <div className="profile_cont_mainContent_editing">
                            <div className="profile_cont_mainContent_editing_bio">
                                <h4 className="profile_cont_mainContent_editing_bio_title">Bio:</h4>
                                <p className="profile_cont_mainContent_editing_bio_title" id="profile_cont_mainContent_editing_bio_title_">{showCount}/150</p>
                                <textarea cols="40" rows="4" maxLength={profileEditing.maxLength} placeholder="Please tell us a bit about yourself." onChange={(event) => { setShowCount(event.target.value.length) }}></textarea>
                            </div>
                            <div className="profile_cont_mainContent_editing_name">
                                <h4 className="profile_cont_mainContent_editing_name_title">Name:</h4>
                                <input className="profile_cont_mainContent_editing_name_info" type="text" maxLength={profileEditing.inputLength} />
                            </div>
                            <div className="profile_cont_mainContent_editing_phoneNumber">
                                <h4 className="profile_cont_mainContent_editing_phoneNumber_title">Phone Number:</h4>
                                <input className="profile_cont_mainContent_editing_phoneNumber_info" type="number" max="10" placeholder="" />
                            </div>
                            <div className="profile_cont_mainContent_editing_email">
                                <h4 className="profile_cont_mainContent_editing_email_title">Email:</h4>
                                <input className="profile_cont_mainContent_editing_email_info" type="email" max="10" placeholder="" />
                            </div>
                            <div className="profile_cont_mainContent_editing_website">
                                <h4 className="profile_cont_mainContent_editing_website_title">Website:</h4>
                                <input className="profile_cont_mainContent_editing_website_info" type="text" maxLength={profileEditing.inputLength} placeholder="" />
                            </div>
                            <div className="profile_cont_mainContent_editing_location">
                                <h4 className="profile_cont_mainContent_editing_location_title">Location:</h4>
                                <input className="profile_cont_mainContent_editing_location_info" type="text" maxLength={profileEditing.inputLength} placeholder="" />
                            </div>
                            <div className="profile_cont_mainContent_editing_password">
                                <h4 className="profile_cont_mainContent_editing_password_title">Password:</h4>
                                <input className="profile_cont_mainContent_editing_name_info" type="password" maxLength={profileEditing.inputLength} placeholder="" />
                                <img src={HideShowPass} alt="hide and show password icon" />
                            </div>
                            <div className="profile_cont_mainContent_editing_cta">
                                <p className="profile_cont_mainContent_editing_cta_deleteBtn" onClick={deleteAccount}>Delete Account</p>
                                <Button title="Save +" className="profile_cont_mainContent_editing_cta_saveBtn" onClick={saveEditing} />
                            </div>

                            {showPopUpDelete && (
                                <PopUp title="Delete Account" description="Are you sure you want to delete your account?" addContent={
                                    <div className="popUp_btn_cont">
                                        <Button className="popUp_btn_cancelBtn" title="Cancel" onClick={cancel} />
                                        <Button className="popUp_btn_deleteBtn" title="Delete" onClick={confirmDelete} />
                                    </div>
                                } />
                            )}

                            {showPopUpSave && (
                                <PopUp title="Saved!" description="Your changes in your profile have been saved" addContent={
                                    <div className="popUp_btn_cont">
                                        <Button className="popUp_btn_doneBtn" title="Done" onClick={redirect} />
                                    </div>
                                } />
                            )}
                        </div>
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    )
}