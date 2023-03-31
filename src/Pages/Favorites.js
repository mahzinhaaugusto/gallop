import "../styles/pgs/Favourites.scss";
import { NavBar } from "../Components/NavBar";
import { Footer } from "../Components/Footer";
import { FilterDropdown } from "../Components/Filter";
import { SortByDropdown } from "../Components/SortBy";
import { HorseCard } from "../Components/HorseCard";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import BackButton from "../icons/BackButton.svg";

export function Favorites() {
  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      // console.log("sorry");
      navigate("/login");
    }
  });

  let navigate = useNavigate();
  const [favHorses, setFavoritehorses] = useState([]);
  const [showEmpty, setShowEmpty] = useState(false);

  let favorites = [];

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}favhorses`).then((response) => {
      Axios.get(`${process.env.REACT_APP_API_URL}allhorses`).then((res) => {
        for (let i = 0; i < response.data.length; i++) {
          // eslint-disable-next-line
          if (localStorage.getItem("id") == response.data[i].ID) {
            // console.log("hello");
            for (let j = 0; j < res.data.length; j++) {
              // eslint-disable-next-line
              if (response.data[i].horseID == res.data[j].horseID)
                favorites.push(res.data[j]);
            }
          }
        }

        if (favorites.length === 0) {
          setShowEmpty(true);
        } else {
          setFavoritehorses(favorites);
        }
      });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const back = (event) => {
    event.stopPropagation();
    navigate(-1);
  };

  return (
    <div className="favorites_master">
      <NavBar />
      <div className="favorites_master_inner">
        <div className="favorites">
          <h2>Favorites</h2>
        </div>
        <div className="favorites_cont_inner">
          <div className="favorites_cont">
            <div className="favorites_cont_header">
              <div className="favorites_cont_header_back">
                <img
                  src={BackButton}
                  alt="Back to Main Page"
                  className="favorites_cont_header_icon"
                />
                <p className="favorites_cont_header_text" onClick={back}>
                  Back
                </p>
              </div>
              <div className="favorites_cont_filterAndSort">
                <FilterDropdown />
                <SortByDropdown />
              </div>
            </div>
            <div className="favorites_cont_cards">
              <HorseCard horseInfo={favHorses} onClick="" addFavOnClick="" className="favorite_horseCard" />
            </div>
            {showEmpty && (
              <>
                <h1 className="showEmpty_header">Nothing Here Yet</h1>
                <h2 className="showEmpty_header_sub">
                  What about adding something here?
                </h2>
              </>
            )}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
