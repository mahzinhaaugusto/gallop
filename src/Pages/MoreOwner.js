import "../styles/pgs/Favourites.scss";
import { NavBar } from "../Components/NavBar";
import { Footer } from "../Components/Footer";
import { FilterDropdown } from "../Components/Filter";
import { SortByDropdown } from "../Components/SortBy";
import { HorseCard } from "../Components/HorseCard";
import BackButton from "../icons/BackButton.svg";
import Location from "../icons/Location.svg";
import Link from "../icons/Link.svg";

import "../styles/pgs/MoreOwner.scss";

import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";

export function MoreOwner() {
    let navigate = useNavigate();

    let location = useLocation();

    const goBack = () => {
        console.log("works");
    };

    const moreClick = () => {
        console.log("works");
    };

    /* const HorseObj = location.state.horse; */
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
        <div className="moreOwner_master">
            <NavBar />
            <div className="moreOwner">
                <h2>More from {userData.firstName}</h2>
                <div className="moreOwner_cont">
                    <div className="moreOwner_cont_header">
                        <p className="moreOwner_cont_header_backButton"><img src={BackButton}></img> Back</p>
                        <div className="moreOwner_cont_header_content">
                            <img
                                className="moreOwner_cont_header_content_img"
                                src={userData.userPhoto}
                                height="150px"
                                width="150px"
                                alt="Owner's Profile Picture"
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
                                <img
                                    src={Link}
                                    height="25px"
                                    width="25px"
                                    alt="WebPage Icon"
                                />
                                <a href={userData.website}>{userData.website}</a>
                            </div>
                        </div>
                    </div>
                    <div className="moreOwner_cont_filterAndSort">
                        <FilterDropdown />
                        <SortByDropdown />
                    </div>
                    <div className="moreOwner_cont_cards">
                        {/* <HorseCard/> */}
                    </div>
                </div>
                <div className="moreOwner_master_inner">
                    <Footer />
                </div>
            </div>

        </div>
    )
}