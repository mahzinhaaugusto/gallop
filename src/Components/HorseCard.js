import FavoriteIcon from "../icons/FavoriteIcon.svg";
import Plus from "../icons/Plus.svg";

export function HorseCard({ img, horseName, breed, gender, age, description, onClick, addFavOnClick }) {
    return (
        <div className="horseCard">
            <div className="horseCard_cont">
                <div className="horseCard_cont_images">
                    <img src={img} alt="" />
                    <div className="horseCard_cont_images_favorite">
                        <img src={FavoriteIcon} alt="" onClick={addFavOnClick} />
                    </div>
                </div>
                <div className="horseCard_cont_details">
                    <h3 id="horseCard_cont_details_name">{horseName}</h3>
                    <div className="horseCard_cont_details_label">
                        <h4 id="horseCard_cont_details_labels">{breed} | {gender} | {age} yr(s) old </h4>
                    </div>
                    <div className="horseCard_cont_details_description">
                        {description}
                    </div>
                    <button id="horseCard_cont_details_btn" type="button" onClick={onClick}>
                        More
                        <img src={Plus} alt="" />
                    </button>
                </div>
            </div>
        </div>
    )
}