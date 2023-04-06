import FavoriteIcon from "../icons/FavoriteIcon.svg";
import FavoriteClicked from "../icons/favoriteClicked.svg";
import Plus from "../icons/Button/Small/Plus.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export function HorseCard({ horseInfo, addFavOnClick, className }) {
  const [toggle, setToggle] = useState(false);
  const [photoKun, setPhoto] = useState(FavoriteClicked);
  let arr = [];
  let check = false;
  useEffect(() => {
    //let imageElement = document.getElementById("fav");
    //imageElement.src = FavoriteIcon;

    axios
      .get(`${process.env.REACT_APP_API_URL}favhorses`)
      .then(async (response) => {
        const favHorses = response.data;
        let flag = true;
        for (let i = 0; i < favHorses.length; i++) {
          // eslint-disable-next-line
          if (horseInfo[0].horseID == favHorses[i].horseID) {
            // eslint-disable-next-line
            if (favHorses[i].ID == localStorage.getItem("id")) {
              setToggle(false);
              // setPhoto(FavoriteIcon);
              flag = false;
              setPhoto(FavoriteClicked);

              // imageElement.src = FavoriteIcon;
            }
          }
        }
        if (flag) {
          // document.getElementById("favoriteIcon").classList.add("favClicked");
          setToggle(true);
          check = true;
          setPhoto(FavoriteIcon);
          //imageElement.src = FavoriteClicked;
        }
      });
  });

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
      await axios
        .get(`${process.env.REACT_APP_API_URL}favhorses`)
        .then(async (response) => {
          const favHorses = response.data;
          let flag = true;
          for (let i = 0; i < favHorses.length; i++) {
            // eslint-disable-next-line
            if (horse.horseID == favHorses[i].horseID) {
              // eslint-disable-next-line
              if (favHorses[i].ID == localStorage.getItem("id")) {
                setToggle(false);
                setPhoto(FavoriteIcon);
                check = false;
                flag = false;
                await axios.post(`${process.env.REACT_APP_API_URL}deletefav`, {
                  id: favHorses[i].favoriteid,
                });
              }
            }
          }
          if (flag) {
            setToggle(true);
            setPhoto(FavoriteClicked);
            check = true;
            await axios.post(`${process.env.REACT_APP_API_URL}addfavorite`, {
              horseid: horse.horseID,
              uid: localStorage.getItem("id"),
            });
          }
        });
    } catch (error) {
      console.error(error);
    }
    arr[0] = toggle;
  }

  return (
    <>
      {horseInfo.map((horse, i) => (
        <div key={i} className={`horseCard ${className}`}>
          <div className="horseCard_cont">
            <div className="horseCard_cont_images">
              <img src={horse.thumbnail} alt="" />
              <div
                className="horseCard_cont_images_favorite"
                id="favIcon"
                onClick={() => {
                  addFavOnClick(horse);
                }}
              >
                {toggle === false ? (
                  <img src={FavoriteClicked} alt="" />
                ) : (
                  <img src={FavoriteIcon} alt="" />
                )}
                {/* <img src={photoKun} alt="" /> */}
              </div>
            </div>
            <div className="horseCard_cont_details">
              <h3 id="horseCard_cont_details_name">{horse.horseName}</h3>
              <div className="horseCard_cont_details_label">
                <h4 id="horseCard_cont_details_labels">
                  {horse.breed.charAt(0).toUpperCase() + horse.breed.slice(1)} |{" "}
                  {horse.gender.charAt(0).toUpperCase() + horse.gender.slice(1)}{" "}
                  | {horse.horseAge} y/o{" "}
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
      ))}{" "}
    </>
  );
}
