import FavoriteIcon from "../icons/FavoriteIcon.svg";
import Axios from "axios";


export function MoreOwnerCards({ myHorse }) {

    async function addFavOnClick(horse) {
        try {
            await Axios.get(`${process.env.REACT_APP_API_URL}favhorses`).then(async (response) => {
                const favHorses = response.data;
                console.log(favHorses);
                let flag = true;
                for (let i = 0; i < favHorses.length; i++) {
                    // eslint-disable-next-line
                    if (horse.horseID == favHorses[i].horseID) {
                        // eslint-disable-next-line
                        if (favHorses[i].ID == localStorage.getItem("id")) {
                            flag = false;
                            console.log("deleted");
                            await Axios.post(`${process.env.REACT_APP_API_URL}deletefav`, {
                                id: favHorses[i].favoriteid,
                            });
                        }
                    }
                }
                if (flag) {
                    console.log("added");
                    await Axios.post(`${process.env.REACT_APP_API_URL}addfavorite`, {
                        horseid: horse.horseID,
                        uid: localStorage.getItem("id"),
                    });
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {myHorse.map((horse, i) => (
                <div key={i} className="horseCard_myHorses">
                    <div className="horseCard_myHorses_cont">
                        <div className="horseCard_myHorses_cont_images">
                            <img src={horse.thumbnail} alt="" />
                            <div className="horseCard_myHorses_cont_images_favorite">
                                <img
                                    src={FavoriteIcon}
                                    alt=""
                                    onClick={() => { addFavOnClick(horse) }}
                                />
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
