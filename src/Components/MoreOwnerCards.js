import FavoriteIcon from "../icons/FavoriteIcon.svg";

export function MoreOwnerCards({ myHorse }) {

    return (
        <>
            {myHorse.map((horse, i) => (
                <div key={i} className="horseCard_myHorses">
                    <div className="horseCard_myHorses_cont">
                        <div className="horseCard_myHorses_cont_images">
                            <img src={horse.thumbnail} alt="" />
                            <div className="horseCard_myHorses_cont_images_favorite">
                                <img src={FavoriteIcon} alt="" />
                                {/* <p>{horse.likeNumbers}</p> */}
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
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
