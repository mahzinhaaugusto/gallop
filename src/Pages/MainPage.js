import { useState } from "react";
import { NavBar } from "../Components/NavBar";
import { CarouselMain } from "../Components/CarouselMain";
import { SortByDropdown } from "../Components/SortBy";
import { FilterDropdown } from "../Components/Filter";
import { HorseCard } from "../Components/HorseCard";
import { PopUp } from "../Components/PopUp";
import { Button } from "../Components/Button";
import { Footer } from "../Components/Footer";

export function MainPage() {
    const cardInfo = {
        img: "https://cdn.britannica.com/96/1296-050-4A65097D/gelding-bay-coat.jpg",
        horseName: "Yeehaw",
        breed: "Brown",
        gender: "Stallion",
        age: 0,
        description: "Short Description"
    }

    const goToHorseDetail = () => {
        console.log("working");
    }

    const addToFavorites = () => {
        console.log("add fav working");
    }

    // PopUp implementation
    const [showPopUp, setShowPopUp] = useState(false);

    const openPopUp = (event) => {
        event.stopPropagation();
        setShowPopUp(!showPopUp);
    }

    const yes = () => {
        alert("Working");
    }
    // End of PopUp Implementation

    return (
        <div className="mainPage">
            <NavBar />
            <div className="mainPage_cont_master">
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
                            img={cardInfo.img}
                            horseName={cardInfo.horseName}
                            breed={cardInfo.breed}
                            gender={cardInfo.gender}
                            age={cardInfo.age}
                            description={cardInfo.description}
                            onClick={goToHorseDetail}
                            addFavOnClick={addToFavorites}
                        />
                    </div>

                </div>

                {/* PopUp implementation */}
                <Button title="Open PopUp" onClick={openPopUp} />

                {showPopUp && (
                    <PopUp title="Testing" description="Also testing" addContent={
                        <Button className="popUp_btn" title="Yes" onClick={yes} />
                    } />
                )}
                {/* End of PopUp implementation */}

                <Footer />
            </div>

        </div>
    )
}