import { useNavigate } from "react-router-dom";

export function FooterBar() {
    let navigate = useNavigate();



    return (
        <div class="footerBar">
            {/* <div class="navBar_cont">
                <div class="navBar_cont_home" onClick={goToHome}>
                    <img class="navBar_cont_home_icon" src="" alt="" />
                    <label class="navBar_cont_home_label">Home</label>
                </div>
                <div class="navBar_cont_profile" onClick={goToProfile}>
                    <img class="navBar_cont_profile_icon" src="" alt="" />
                    <label class="navBar_cont_profile_label">Profile</label>
                </div>
                <div class="navBar_cont_myHorses" onClick={goToMyHorses}>
                    <img class="navBar_cont_myHorses_icon" src="" alt="" />
                    <label class="navBar_cont_myHorses_label">My Horses</label>
                </div>
                <div class="navBar_cont_favorites" onClick={goToFavorites}>
                    <img class="navBar_cont_favorites_icon" src="" alt="" />
                    <label class="navBar_cont_favorites_label">Favorites</label>
                </div>
            </div> */}
        </div>
    );
}