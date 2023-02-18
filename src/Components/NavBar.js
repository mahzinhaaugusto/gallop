import { useNavigate } from "react-router-dom";
import "../css/cmpt/NavBar.css";

export function NavBar() {
    return (
        <div className="navBar">
            <NavBarCont />
        </div>
    );
}

function NavBarCont() {
    return (
        <div className="navBar_cont">
            <Home />
            <Profile />
            <MyHorses />
            <Favorites />
        </div>
    );
}

function Home() {
    let navigate = useNavigate();
    const goToHome = () => {
        navigate("/home");
    };

    return (
        <div className="navBar_cont_home" onClick={goToHome}>
            <img className="navBar_cont_home_icon" src="" alt="" />
            <label className="navBar_cont_home_label">Home</label>
        </div>
    )
}

function Profile() {
    let navigate = useNavigate();
    const goToProfile = () => {
        navigate("/profile");
    }

    return (
        <div className="navBar_cont_profile" onClick={goToProfile}>
            <img className="navBar_cont_profile_icon" src="" alt="" />
            <label className="navBar_cont_profile_label">Profile</label>
        </div>
    );
}

function MyHorses() {
    let navigate = useNavigate();
    const goToMyHorses = () => {
        navigate("/my-horses");
    }

    return (
        <div className="navBar_cont_myHorses" onClick={goToMyHorses}>
            <img className="navBar_cont_myHorses_icon" src="" alt="" />
            <label className="navBar_cont_myHorses_label">My Horses</label>
        </div>
    );
}

function Favorites() {
    let navigate = useNavigate();
    const goToFavorites = () => {
        navigate("/favorites");
    }

    return (
        <div className="navBar_cont_favorites" onClick={goToFavorites}>
            <img className="navBar_cont_favorites_icon" src="" alt="" />
            <label className="navBar_cont_favorites_label">Favorites</label>
        </div>
    );
}