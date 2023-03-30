import FavoriteIcon from "../icons/FavoriteIcon.svg";
import FavoriteClicked from "../icons/favoriteClicked.svg";
import Plus from "../icons/Plus.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINT } from "../server";
import { useState } from "react";

export function HorseCard({ horseInfo, addFavOnClick, className }) {

  const [toggle, setToggle] = useState(false);

  let navigate = useNavigate();

  function moreClicked(horse) {
    navigate("/horse-detail", {
      state: {
        horse: horse,
      },
    });
  }

  async function addFavOnClick(horse) {
    try {
      await axios.get(`${API_ENDPOINT}favhorses`).then(async (response) => {
        const favHorses = response.data;
        console.log(favHorses);
        let flag = true;
        for (let i = 0; i < favHorses.length; i++) {
          // eslint-disable-next-line
          if (horse.horseID == favHorses[i].horseID) {
            console.log(horse.ID);
            // eslint-disable-next-line
            if (favHorses[i].ID == localStorage.getItem("id")) {
              setToggle(false);
              flag = false;
              await axios.post(`${API_ENDPOINT}deletefav`, {
                id: favHorses[i].favoriteid,
              });
              window.location.reload();
            }
          }
        }
        if (flag) {
          // document.getElementById("favoriteIcon").classList.add("favClicked");
          setToggle(true);
          console.log("added");
          await axios.post(`${API_ENDPOINT}addfavorite`, {
            horseid: horse.horseID,
            uid: localStorage.getItem("id"),
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {horseInfo.map((horse, i) => (
        <div key={i} className={`horseCard ${className}`}>
          <div className="horseCard_cont">
            <div className="horseCard_cont_images">
              <img src={horse.thumbnail} alt="" />
              <div className="horseCard_cont_images_favorite" id="favIcon" onClick={() => {
                addFavOnClick(horse);
              }}>
                {toggle === true ? (
                  <img src={FavoriteClicked} alt="" />) : (<img src={FavoriteIcon} alt="" />)
                }
              </div>
            </div>
            <div className="horseCard_cont_details">
              <h3 id="horseCard_cont_details_name">{horse.horseName}</h3>
              <div className="horseCard_cont_details_label">
                <h4 id="horseCard_cont_details_labels">
                  {horse.breed.charAt(0).toUpperCase() + horse.breed.slice(1)} |{" "}
                  {horse.gender.charAt(0).toUpperCase() + horse.gender.slice(1)}{" "}
                  | {horse.horseAge} yr(s) old{" "}
                </h4>
              </div>
              <div className="horseCard_cont_details_description">
                {horse.description.substring(0, 50)}
              </div>
            </div>
            <div className="horseCard_cont_details_btn_master">
                <button
                  id="horseCard_cont_details_btn"
                  type="button"
                  onClick={() => {
                    moreClicked(horse);
                  }}
                >
                  MORE
                  <img src={Plus} alt="" />
                </button>
              </div>
          </div>
        </div>
      ))}
    </>
  );
}
