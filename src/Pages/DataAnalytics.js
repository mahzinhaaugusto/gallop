import { Footer } from "../Components/Footer"
import { NavBar } from "../Components/NavBar"

export function DataAnalytics() {

    return (
        <div className="dataAnalytics">
            <NavBar />
            <div className="dataAnalytics_cont_master">
                <h2 className="dataAnalytics_cont_master_title">Get to Know Our Horses!</h2>
                <div className="dataAnalytics_cont_master_inner">
                    <Footer />
                </div>
            </div>
        </div>
    )
}