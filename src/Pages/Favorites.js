import "../styles/pgs/Favourites.scss";
import { NavBar } from "../Components/NavBar";
import { Footer } from "../Components/Footer";
import { FilterDropdown } from "../Components/Filter";
import { SortByDropdown } from "../Components/SortBy";
import { HorseCard } from "../Components/HorseCard";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useState, useEffect } from "react";

export function Favorites() {
    
    return (
        <div className="favorites_master">
            <NavBar/>
            <div className="favorites">
                <h2>Favorites</h2>
                <div className="favorites_cont">
                    <div className="favorites_cont_filterAndSort">
                        <FilterDropdown/>
                        <SortByDropdown/>
                    </div>
                    <div className="favorites_cont_cards">
                        {/* <HorseCard/> */}
                    </div>
                </div>
                <div className="favorites_master_inner">
                <Footer/>
                </div> 
            </div>
            
        </div>
    )
}