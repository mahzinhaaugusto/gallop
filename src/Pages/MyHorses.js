import FavoriteIcon from "../icons/FavoriteIcon.svg";
import { NavBar } from "../Components/NavBar";
import { Button } from "../Components/Button";
import { useNavigate } from "react-router-dom";
import BackButton from "../icons/BackButton.svg";
import { FilterDropdown } from "../Components/Filter";
import { SortByDropdown } from "../Components/SortBy";
import { useState, useEffect } from "react";
import Axios from "axios";
import HideShowPass from "../icons/HideShowPass.svg";
import HideVisibility from "../icons/HideVisibility.svg";
import Edit from "../icons/Edit.svg";
import Trash from "../icons/Trash.svg";
import { Footer } from "../Components/Footer";
import { API_ENDPOINT } from "../server";

export function MyHorses() {
  let navigate = useNavigate();

  const redirectAdd = () => {
    navigate("/add-horse");
  };

  const [showEmpty, setShowEmpty] = useState(false);

  let [myHorses, setMyHorses] = useState([]);
  let myHorsesArr = [];

  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      // console.log("sorry");
      navigate("/login");
    }
    Axios.get(`${API_ENDPOINT}allhorses`).then((response) => {
      // const horses = response.data;
      // console.log(horses);

      // if (horses.length === 0) {
      //   setShowEmpty(true);
      // } else {
      //   setMyHorses(horses);
      // }
      // setMyHorses(response.data);
      // console.log(id);
      // console.log(response.data[0].horseID);
      // if(response.data.length === 0) {
      //   setShowEmpty(true);
      // } else {}
      setMyHorses(response.data);

      // for (let i = 0; i < myHorses.length; i++) {
      //   //console.log(myHorses);
      //   if (id == myHorses[i].ID) {
      //     myHorsesArr.push(myHorses[i]);
      //   }
      // if (myHorses.length === 0) {
      //   console.log(myHorses);
      //   setShowEmpty(true);
      // }
      // }

    });

    // console.log(myHorses);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  let id = localStorage.getItem("id");

  // if (myHorses.length === 0) {
  //   console.log(myHorses);
  //   setShowEmpty(true);
  // }

  for (let i = 0; i < myHorses.length; i++) {
    // eslint-disable-next-line
    if (id == myHorses[i].ID) {
      myHorsesArr.push(myHorses[i]);
    }
    // if (myHorses.length === 0) {
    //   console.log(myHorses);
    //   setShowEmpty(true);
    // }
  }

  const back = (event) => {
    event.stopPropagation();
    navigate(-1);
  };

  return (
    <div className="myHorses">
      <NavBar />
      <div className="myHorses_cont_master">
        <div className="myHorses_cont_master_header">
          <h2 className="myHorses_title">My Horses</h2>
          <Button
            title="Add Horse +"
            className="myHorses_cont_master_btn"
            onClick={redirectAdd}
          />
        </div>
        <div className="myHorses_cont_master_inner">
          <div className="myHorses_cont">
            <div className="myHorses_cont_header">
              <div className="myHorses_cont_header_back">
                <img
                  src={BackButton}
                  alt="Back to Main Page"
                  className="myHorses_cont_header_icon"
                />
                <p className="myHorses_cont_header_text" onClick={back}>
                  Back
                </p>
              </div>
              <div className="myHorses_cont_header_assets">
                <SortByDropdown />
                <FilterDropdown />
              </div>
            </div>
            <div className="myHorses_cont_content">
              <MyHorsesCard myHorse={myHorsesArr} />
              {/* {() => {
                if (myHorsesArr.length === 0) {
                  <h1>LoSER</h1>
                }
              }} */}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export function MyHorsesCard({ myHorse }) {
  let navigate = useNavigate();

  const editHorse = (horse) => {
    navigate("/edit-horse", {
      state: {
        horse: horse,
      },
    });
  };

  const deleteHorse = (id) => {
    // console.log(id);
    Axios.post(`${API_ENDPOINT}deletehorse`, {
      id: id
    })
    window.location.reload();
    // console.Console.log("yesssss");
  };

  return (
    <>
      {myHorse.map((horse, i) => (
        <div key={i} className="horseCard_myHorses">
          <div className="horseCard_myHorses_cont">
            <div className="horseCard_myHorses_cont_images">
              <img src={horse.thumbnail} alt="" />
              <div className="horseCard_myHorses_cont_images_favorite">
                <img src={FavoriteIcon} alt="" />
                <p>{horse.likeNumbers}</p>
                <img src={HideShowPass} alt="Show Horse" />
                <img src={HideVisibility} alt="Hide Horse" />
              </div>
            </div>
            <div className="horseCard_myHorses_cont_details">
              <h3 id="horseCard_myHorses_cont_details_name">
                {horse.horseName}
              </h3>
              <div className="horseCard_myHorses_cont_details_label">
                <h4 id="horseCard_myHorses_cont_details_labels">
                  {horse.breed.charAt(0).toUpperCase() + horse.breed.slice(1)} |{" "}
                  {horse.gender.charAt(0).toUpperCase() + horse.gender.slice(1)}{" "}
                  | {horse.horseAge} yr(s) old{" "}
                </h4>
              </div>
              <div className="horseCard_myHorses_cont_details_btns">
                <button
                  id="horseCard_myHorses_cont_details_editBtn"
                  type="button"
                  onClick={() => {
                    editHorse(horse)
                  }}
                >
                  EDIT
                  <img src={Edit} alt="" />
                </button>
                <button
                  id="horseCard_myHorses_cont_details_deleteBtn"
                  type="button"
                  onClick={() => { deleteHorse(horse.horseID) }}
                >
                  DELETE
                  <img src={Trash} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))
      }
    </>
  );
}
