import { useState, useEffect } from "react";
import { NavBar } from "../Components/NavBar";
import { CarouselMain } from "../Components/CarouselMain";
import { SortByDropdown } from "../Components/SortBy";
import { FilterDropdown } from "../Components/Filter";
import { HorseCard } from "../Components/HorseCard";
import { useNavigate } from "react-router-dom";
// import { PopUp } from "../Components/PopUp";
// import { Button } from "../Components/Button";
import { Footer } from "../Components/Footer";
import Axios from "axios";

export function MainPage() {
  let [allHorses, setHorseInfo] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      console.log("sorry");
      navigate("/login");
    }
    Axios.get("http://localhost:3002/api/allhorses").then((response) => {
      setHorseInfo(response.data);
      //console.log(allHorses);
    });
  }, []);

  //console.log(allHorses);

  const goToHorseDetail = () => {
    console.log("working");
  };

  const addToFavorites = () => {
    console.log("add fav working");
  };

  // PopUp implementation
  // const [showPopUp, setShowPopUp] = useState(false);

  // const openPopUp = (event) => {
  //     event.stopPropagation();
  //     setShowPopUp(!showPopUp);
  // }

  // const yes = () => {
  //     alert("Working");
  // }
  // End of PopUp Implementation

  return (
    <div className="mainPage">
      <NavBar />
      <div className="mainPage_cont_master">
        <h2 className="mainPage_cont_master_title">Featured Horses</h2>
        <div className="mainPage_cont_master_inner">
          <CarouselMain />
          <div className="mainPage_cont">
            <div className="mainPage_cont_allHorses">
              <h2 className="mainPage_cont_allHorses_title">All Horses</h2>
              <div className="mainPage_cont_allHorses_dropdowns">
                <SortByDropdown />
                <FilterDropdown />
              </div>
            </div>
            <div className="mainPage_cont_horsesCards">
              <HorseCard
                horseInfo={allHorses}
                onClick={goToHorseDetail}
                addFavOnClick={addToFavorites}
              />
            </div>
          </div>

          {/* PopUp implementation */}
          {/* <Button title="Open PopUp" className="testing" onClick={openPopUp} />

                    {showPopUp && (
                        <PopUp title="Testing" description="Also testing" addContent={
                            <Button className="popUp_btn" title="Yes" onClick={yes} />
                        } />
                    )} */}
          {/* End of PopUp implementation */}

          <Footer />
        </div>
      </div>
    </div>
  );
}
