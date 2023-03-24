import FavoriteIcon from "../icons/FavoriteIcon.svg";
import HideShowPass from "../icons/HideShowPass.svg";
import HideVisibility from "../icons/HideVisibility.svg";

export function MoreOwnerCards({ myHorse }) {
    /* const editHorse = () => {
        console.log("working");
    };

    const deleteHorse = () => {
        Axios.delete(`${API_ENDPOINT}deletehorse`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        // alert("check db");
    }; */


    return (
        <>
            {myHorse.map((horse, i) => (
                <div key={i} className="horseCard_myHorses">
                    <div className="horseCard_myHorses_cont">
                        <div className="horseCard_myHorses_cont_images">
                            <img src={horse.thumbnail} alt="" />
                            <div className="horseCard_myHorses_cont_images_favorite">
                                <img src={FavoriteIcon} alt="" />
                                <p>(CALCULATE LIKES)</p>
                                {/* <img src={HideShowPass} alt="Show Horse" />
                                <img src={HideVisibility} alt="Hide Horse" /> */}
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
                            {/* <div className="horseCard_myHorses_cont_details_btns">
                                <button
                                    id="horseCard_myHorses_cont_details_editBtn"
                                    type="button"
                                    onClick={editHorse}
                                >
                                    EDIT
                                    <img src={Edit} alt="" />
                                </button>
                                <button
                                    id="horseCard_myHorses_cont_details_deleteBtn"
                                    type="button"
                                    onClick={deleteHorse}
                                >
                                    DELETE
                                    <img src={Trash} alt="" />
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
