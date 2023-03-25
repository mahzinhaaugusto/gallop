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
import { API_ENDPOINT } from "../server";
import { useLocation } from "react-router-dom";
export function MainPage() {
  let location = useLocation();
  let [allHorses, setHorseInfo] = useState([]);
  let navigate = useNavigate();
  const [filterData, setFilter] = useState();

  const filterReturn = (data) => {
    setFilter(data);
    //console.log(data);
    //console.log(allHorses);
    let horseDatas = [...allHorses];
    for (const key in data) {
      let newList = [];

      for (let i = 0; i < horseDatas.length; i++) {
        //console.log(`${key}: ${user[key]}`);

        if (data[key] == horseDatas[i][key]) {
          newList.push(horseDatas[i]);
        }
      }
      horseDatas = [...newList];
      // setHorseInfo(newList);
      console.log(horseDatas);
    }
    setHorseInfo(horseDatas);
    //setHorseInfo(newList);
  };
  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      console.log("sorry");
      navigate("/login");
    }
    Axios.get(`${API_ENDPOINT}allhorses`).then((response) => {
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
                <FilterDropdown filterReturn={filterReturn} />
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
