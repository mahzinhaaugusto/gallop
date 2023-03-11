import Phone from "../icons/Phone.svg";
import ProfilePic from "../icons/ProfilePic.svg";
import Favorite from "../icons/FavoriteHorse.svg";
import BackButton from "../icons/BackButton.svg";
import Location from "../icons/Location.svg";
import Link from "../icons/Link.svg";
import Email from "../icons/Email.svg";

import "../styles/pgs/AddHorse.scss";
import { NavBar } from "../Components/NavBar";
import { Footer } from "../Components/Footer";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";

export function HorseDetail() {
  let location = useLocation();
  const goBack = () => {
    console.log("works");
  };
  const moreClick = () => {
    console.log("works");
  };

  const HorseObj = location.state.horse;
  // console.log(HorseObj);
  let [userData, setUserData] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3002/api/get").then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].ID == location.state.horse.ID)
          setUserData(response.data[i]);
      }
    });
  }, []);
  console.log(userData);

  return (
    <div className="horseDetail_master">
      <NavBar />
      <div className="horseDetail">
        <h2 className="horseDetail_title">Horse Detail</h2>

        <div className="horseDetail_cont">
          <p className="horseDetail_cont_backButton" onClick={goBack}>
            <img src={BackButton} height="30px" width="30px" alt="Go Back" />Back
          </p>
          <div className="horseDetail_cont_one">
            <div className="horseDetail_cont_image">
              <img
                src={HorseObj.img}
                height="400px"
                width="400px"
                alt="Horse Image"
              />

            </div>
            <div className="horseDetail_cont_information">
              <div className="horseDetail_cont_information_heading">
                <div className="horseDetail_cont_information_heading_title">
                  <h1>
                    {HorseObj.horseName.charAt(0).toUpperCase() +
                      HorseObj.horseName.slice(1)}
                  </h1>
                  <div className="horseDetail_cont_information_heading_title_buttons">
                    <img
                      src={Phone}
                      height="50px"
                      width="50px"
                      alt="button phone"
                    ></img>
                    <img
                      src={Favorite}
                      height="50px"
                      width="50px"
                      alt="button favorite"
                    ></img>
                  </div>
                </div>
                <div className="horseDetail_cont_information_heading_locationAndPrice">
                  <img
                    src={Location}
                    height="10px"
                    width="10px"
                    alt="Location"
                  />
                  <p className="horseDetail_cont_information_heading_locationAndPrice_location">{HorseObj.location}</p>
                  <p className="horseDetail_cont_information_heading_locationAndPrice_price">${HorseObj.price}</p>
                </div>
              </div>
              <div className="horseDetail_cont_information_body">
                <div className="horseDetail_cont_information_body_height">
                  <label>Height</label>
                  <p>{HorseObj.height + " Feet"}</p>
                </div>
                <div className="horseDetail_cont_information_body_age">
                  <label>Age</label>
                  <p>{HorseObj.horseAge + " Years"}</p>
                </div>

                <div className="horseDetail_cont_information_body_color">
                  <label>Color</label>
                  <p>{HorseObj.color}</p>
                </div>
                <div className="horseDetail_cont_information_body_gender">
                  <label>Gender</label>
                  <p>{HorseObj.gender}</p>
                </div>

                <div className="horseDetail_cont_information_body_breedingMethod">
                  <label>Breeding Method</label>
                  <p>{HorseObj.breedingMethod}</p>
                </div>
                <div className="horseDetail_cont_information_body_disciplines">
                  <label>Disciplines</label>
                  <p>{HorseObj.skills}</p>
                </div>


              </div>

            </div>

          </div>
          <div class="line">
          </div>
          <div className="horseDetail_cont_two">
            <div className="horseDetail_cont_description">
              <h4>Horse Description</h4>
              <p>{HorseObj.description}</p>
            </div>
            <div class="line"></div>
          </div>
          <div className="horseDetail_cont_three">
            <div className="horseDetail_cont_contactInfo_heading">
              <h4>Contact</h4>
              </div>
              <div className="horseDetail_cont_contactInfo_heading_content">

                <img
                  className="horseDetail_cont_contactInfo_img"
                  src={userData.userPhoto}
                  height="150px"
                  width="150px"
                  alt="Owner's Profile Picture"
                ></img>
              
              <div className="horseDetail_cont_contactInfo_owner">
                <h4>{userData.firstName + " " + userData.lastName}</h4>
                <div className="horseDetail_cont_contactInfo_owner_location">
                  <img
                    src={Location}
                    height="15px"
                    width="15px"
                    alt="Location Icon"
                  />
                  <p>{userData.address}</p>
                </div>
                <div className="horseDetail_cont_contactInfo_owner_webpage">
                  <img
                    src={Link}
                    height="25px"
                    width="25px"
                    alt="WebPage Icon"
                  />
                  <p>{userData.website}</p>
                </div>
              </div>
              <div className="horseDetail_cont_contactInfo_contactForms">
                <img
                  className="horseDetail_cont_contactInfo_contactForms_phone"
                  src={Phone}
                  height="50px"
                  width="50px"
                  alt="Phone Button"
                ></img>
                <img
                  className="horseDetail_cont_contactInfo_contactForms_email"
                  src={Email}
                  height="50px"
                  width="50px"
                  alt="Email Button"
                ></img>

              </div>
              <div className="horseDetail_cont_contactInfo_moreFromOwner">
                <button onClick={moreClick}>More from the owner</button>
              </div>
              </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
