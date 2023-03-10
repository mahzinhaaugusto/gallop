import FavoriteIcon from "../icons/FavoriteIcon.svg";
import Plus from "../icons/Plus.svg";
import { useNavigate } from "react-router-dom";
// import Axios from "axios";
// import { useState, useEffect } from "react";

export function HorseCard({ horseInfo, onClick, addFavOnClick }) {
  // console.log(horseInfo);
  let navigate = useNavigate();
  function moreClicked(horse) {
    navigate("/horse-detail", {
      state: {
        horse: horse,
      },
    });
  }
  return (
    <>
      {horseInfo.map((horse, i) => (
        <div key={i} className="horseCard">
          <div className="horseCard_cont">
            <div className="horseCard_cont_images">
              <img src={horse.horseImage} alt="" />
              <div className="horseCard_cont_images_favorite">
                <img src={FavoriteIcon} alt="" onClick={addFavOnClick} />
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
