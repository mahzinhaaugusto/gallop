import "../styles/pgs/Favourites.scss";
import { NavBar } from "../Components/NavBar";
import { Footer } from "../Components/Footer";
import { FilterDropdown } from "../Components/Filter";
import { SortByDropdown } from "../Components/SortBy";
// import { HorseCard } from "../Components/HorseCard";
import BackButton from "../icons/BackButton.svg";
import Location from "../icons/Location.svg";
import Link from "../icons/Link.svg";
import "../styles/pgs/MoreOwner.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import { API_ENDPOINT } from "../server";
// import { MyHorsesCard } from "./MyHorses";
import { MoreOwnerCards } from "../Components/MoreOwnerCards";


export function MoreOwner() {
  let navigate = useNavigate();

  let location = useLocation();

  let [horses, setMyHorses] = useState([]);

  let userData = location.state.ownerInfo;

  let horse = location.state.horses;

  const goBack = (event) => {
    event.stopPropagation();
    navigate(-1, {
      state: {
        horse: horse,
      }
    });
  };

  let myHorsesArr = [];

  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      // console.log("sorry");
      navigate("/login");
    }
    Axios.get(`${API_ENDPOINT}allhorses`).then((response) => {
      //console.log(id);
      // console.log(response.data[0].horseID);
      setMyHorses(response.data);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  for (let i = 0; i < horses.length; i++) {
    // eslint-disable-next-line
    if (userData.ID == horses[i].ID) {
      myHorsesArr.push(horses[i]);
    }
  }

  //console.log(myHorsesArr);
  return (
    <div className="moreOwner_master">
      <NavBar />
      <div className="moreOwner">
        <h2>More from {userData.firstName}</h2>
        <div className="moreOwner_cont">
          <div className="moreOwner_cont_header">
            <p className="moreOwner_cont_header_backButton" onClick={goBack}>
              <img alt="Back to previous page" src={BackButton}></img> Back
            </p>
            <div className="moreOwner_cont_header_content">
              <img
                className="moreOwner_cont_header_content_img"
                src={userData.userPhoto}
                height="150px"
                width="150px"
                alt="Owner's profile"
              ></img>
              <div className="moreOwner_cont_header_content_location">
                <img
                  src={Location}
                  height="15px"
                  width="15px"
                  alt="Location Icon"
                />
                <p>{userData.address}</p>
              </div>
              <div className="moreOwner_cont_header_content_webpage">
                <img src={Link} height="25px" width="25px" alt="WebPage Icon" />
                <a href={userData.website}>{userData.website}</a>
              </div>
            </div>
          </div>
          <div className="moreOwner_cont_filterAndSort">
            <FilterDropdown />
            <SortByDropdown />
          </div>
          <div className="moreOwner_cont_cards"><MoreOwnerCards myHorse={myHorsesArr} /></div>
        </div>
        <div className="moreOwner_master_inner">
          <Footer />
        </div>
      </div>
    </div>
  );
}
