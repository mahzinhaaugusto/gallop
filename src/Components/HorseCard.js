import FavoriteIcon from "../icons/FavoriteIcon.svg";
import Plus from "../icons/Plus.svg";
// import Axios from "axios";
// import { useState, useEffect } from "react";


export function HorseCard({ horseInfo, onClick, addFavOnClick }) {
    console.log(horseInfo);

    return (
        <>
            {horseInfo.map((horse, i) => <div key={i} className="horseCard">
                <div className="horseCard_cont">
                    <div className="horseCard_cont_images">
                        <img src={horse.horseImage} alt="" />
                        <div className="horseCard_cont_images_favorite">
                            <img src={FavoriteIcon} alt="" onClick={addFavOnClick} />
                        </div>
                    </div>

                    {/* {horseInfo.map((horse, i) => <div key={i} >{horse.horseName} {horse.horseAge} </div>)} */}

                    {/* {horseInfo.map((horse, i) => <div key={i} >{horse.horseAge} </div>)} */}

                    <div className="horseCard_cont_details">
                        <h3 id="horseCard_cont_details_name">{horse.horseName}</h3>
                        <div className="horseCard_cont_details_label">
                            <h4 id="horseCard_cont_details_labels">{horse.breed} | {horse.gender} | {horse.horseAge} yr(s) old </h4>
                        </div>
                        <div className="horseCard_cont_details_description">
                            {horse.description}
                        </div>
                        <button id="horseCard_cont_details_btn" type="button" onClick={onClick}>
                            More
                            <img src={Plus} alt="" />
                        </button>
                    </div>
                </div>
            </div>)}
        </>
    )
}