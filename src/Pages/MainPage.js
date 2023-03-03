import { NavBar } from "../Components/NavBar";
import { CarouselMain } from "../Components/CarouselMain";
import { SortByDropdown } from "../Components/SortBy";
import { FilterDropdown } from "../Components/Filter";

export function MainPage() {
    return (
        <div className="mainPage">
            <NavBar />
            <div className="mainPage_cont">
                <CarouselMain />
                <div className="mainPage_cont_allHorses">
                    <h1 className="mainPage_cont_allHorses_title">All Horses</h1>
                    <div className="mainPage_cont_allHorses_dropdowns">
                        <SortByDropdown />
                        <FilterDropdown />
                    </div>
                </div>
            </div>
        </div>
    )
}