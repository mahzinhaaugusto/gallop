import FavoriteIcon from "../icons/FavoriteIcon.svg";
import FavoriteClicked from "../icons/favoriteClicked.svg";
import Plus from "../icons/Plus.svg";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../server";

export function HorseCard({ horseInfo, addFavOnClick }) {
  // const [favHorses, setFavoritehorses] = useState([]);
  // console.log(horseInfo);
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
        let flag = true;
        for (let i = 0; i < favHorses.length; i++) {
          ////console.log(horse.ID);
          // console.log(favHorses[i].ID);
          if (horse.horseID == favHorses[i].horseID) {
            console.log(horse.ID);
            if (favHorses[i].ID == localStorage.getItem("id")) {
              flag = false;
              console.log("deleted");
              await axios.post(`${API_ENDPOINT}deletefav`, {
                id: favHorses[i].favoriteid,
              });
            }
          }
        }
        if (flag) {
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
        <div key={i} className="horseCard">
          <div className="horseCard_cont">
            <div className="horseCard_cont_images">
              <img src={horse.thumbnail} alt="" />
              <div className="horseCard_cont_images_favorite" id="favIcon">
                <img
                  src={FavoriteIcon}
                  alt=""
                  onClick={() => {
                    addFavOnClick(horse);
                  }}
                />
              </div>
              {/* <div className="horseCard_cont_images_favorite" id="unFavIcon">
                <img
                  src={FavoriteClicked}
                  alt=""
                  onClick={() => {
                    addUnFavOnClick(horse);
                  }}
                />
              </div> */}
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
                {horse.description}
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
        </div>
      ))}
    </>
  );
}
