import Phone from "../icons/Phone.svg";
import ProfilePic from "../icons/ProfilePic.svg";
import Favourites from "../icons/Favourites.svg";
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
        <h3>Horse Detail</h3>

        <div className="horseDetail_cont">
          <div onClick={goBack}>
            <img src={Favourites} height="30px" width="30px" alt="Go Back" />
          </div>
          <div className="horseDetail_cont_one">
            <div className="horseDetail_cont_image">
              <img
                src={HorseObj.img}
                height="400px"
                width="400px"
                alt="Horse Image"
              />
              <img
                src={Favourites}
                height="10px"
                width="10px"
                alt="Favourites Icon"
              />
              <img
                src={Favourites}
                height="10px"
                width="10px"
                alt="Carroussel"
              />
              <img src={Favourites} height="10px" width="10px" alt="Zoom" />
            </div>
            <div className="horseDetail_cont_information">
              <div className="horseDetail_cont_information_heading">
                <div className="horseDetail_cont_information_heading_title">
                  <h1>
                    {HorseObj.horseName.charAt(0).toUpperCase() +
                      HorseObj.horseName.slice(1)}
                  </h1>
                  <img
                    src={Phone}
                    height="50px"
                    width="50px"
                    alt="button phone"
                  ></img>
                </div>
                <div className="horseDetail_cont_information_heading_location">
                  <img
                    src={Favourites}
                    height="10px"
                    width="10px"
                    alt="Location"
                  />
                  <p>{HorseObj.location}</p>
                </div>
              </div>
              <div className="horseDetail_cont_information_body">
                <div className="horseDetail_cont_information_body_lineOne">
                  <div className="horseDetail_cont_information_body_lineOne_height">
                    <label>Height</label>
                    <p>{HorseObj.height + " Feet"}</p>
                  </div>
                  <div className="horseDetail_cont_information_body_lineOne_age">
                    <label>Age</label>
                    <p>{HorseObj.horseAge + " Years"}</p>
                  </div>
                </div>
                <div className="horseDetail_cont_information_body_lineTwo">
                  <div className="horseDetail_cont_information_body_lineTwo_color">
                    <label>Color</label>
                    <p>{HorseObj.color}</p>
                  </div>
                  <div className="horseDetail_cont_information_body_lineTwo_gender">
                    <label>Gender</label>
                    <p>{HorseObj.gender}</p>
                  </div>
                </div>
                <div className="horseDetail_cont_information_body_lineThree">
                  <div className="horseDetail_cont_information_body_lineThree_breedingMethod">
                    <label>Breeding Method</label>
                    <p>{HorseObj.breedingMethod}</p>
                  </div>
                  <div className="horseDetail_cont_information_body_lineOne_age">
                    <label>Disciplines</label>
                    <p>{HorseObj.skills}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div classname="horseDetail_cont_two">
            <div classname="horseDetail_cont_description">
              <h4>Horse Description</h4>
              <p>{HorseObj.description}</p>
            </div>
          </div>
          <div classname="horseDetail_cont_three">
            <div classname="horseDetail_cont_contactInfo_heading">
              <h4>Contact</h4>
              <img
                src={userData.userPhoto}
                height="150px"
                width="150px"
                alt="Owner's Profile Picture"
              ></img>
            </div>
            <div classname="horseDetail_cont_contactInfo_owner">
              <h3>{userData.firstName + " " + userData.lastName}</h3>
              <img
                src={Favourites}
                height="10px"
                width="10px"
                alt="Location Icon"
              />
              <p>{userData.address}</p>
              <img
                src={Favourites}
                height="10px"
                width="10px"
                alt="WebPage Icon"
              />
              <p>{userData.website}</p>
            </div>
            <div classname="horseDetail_cont_contactInfo_contactForms">
              <h4>Contact Forms</h4>
              <img
                src={ProfilePic}
                height="50px"
                width="50px"
                alt="Email Button"
              ></img>
              <img
                src={ProfilePic}
                height="50px"
                width="50px"
                alt="Phone Button"
              ></img>
            </div>
            <div className="horseDetail_cont_contactInfo_moreFromOwner">
              <button onClick={moreClick}>More from the owner</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
