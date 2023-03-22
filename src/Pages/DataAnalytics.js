import { Footer } from "../Components/Footer";
import { NavBar } from "../Components/NavBar";
import BackButton from "../icons/BackButton.svg";

export function DataAnalytics() {
    const goBack = () => {

    }

    return (
        <div className="dataAnalytics">
            <NavBar />
            <div className="dataAnalytics_cont_master">
                <h2 className="dataAnalytics_cont_master_title">Get to Know Our Horses!</h2>
                <div className="dataAnalytics_cont_master_inner">
                    <div>
                        <p className="addHorse_cont_backButton" onClick={goBack}>
                            <img src={BackButton} height="30px" width="30px" alt="Go Back" />
                            Back
                        </p>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}