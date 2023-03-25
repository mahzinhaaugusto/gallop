import "../styles/pgs/Favourites.scss";
import { NavBar } from "../Components/NavBar";
import { Footer } from "../Components/Footer";
import { FilterDropdown } from "../Components/Filter";
import { SortByDropdown } from "../Components/SortBy";
import { HorseCard } from "../Components/HorseCard";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";
import { API_ENDPOINT } from "../server";

export function Favorites() {
  let navigate = useNavigate();
  const [favHorses, setFavoritehorses] = useState([]);
  useEffect(() => {
    Axios.get(`${API_ENDPOINT}favhorses`).then((response) => {
      //setFavoritehorses(response.data);
      //console.log(response.data);
      let favorites = [];
      
      Axios.get(`${API_ENDPOINT}allhorses`).then((res) => {
        //setHorseInfo(response.data);
        //console.log(allHorses);

        for (let i = 0; i < response.data.length; i++) {
          for (let j = 0; j < res.data.length; j++) {
            if (res.data[j].horseID == response.data[i].horseID) {
              favorites.push(res.data[j]);
            }
          }
        }
        //console.log(favorites);

        setFavoritehorses(favorites);
      });
    });
  }, []);
  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      console.log("sorry");
      navigate("/login");
    }
    console.log(favHorses);
  }, [favHorses]);
  return (
    <div className="favorites_master">
      <NavBar />
      <div className="favorites">
        <h2>Favorites</h2>
        <div className="favorites_cont">
          <div className="favorites_cont_filterAndSort">
            <FilterDropdown />
            <SortByDropdown />
          </div>
          <div className="favorites_cont_cards">
            <HorseCard horseInfo={favHorses} onClick="" addFavOnClick="" />
          </div>
        </div>
        <div className="favorites_master_inner">
          <Footer />
        </div>
      </div>
    </div>
  );
}
