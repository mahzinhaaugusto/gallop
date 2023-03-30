import { useLocation, Link } from "react-router-dom";
import HomeIcon from "../icons/HomeIcon.svg";
import User from "../icons/User.svg";
import MyHorsesIcon from "../icons/MyHorses.svg";
import FavoritesNavBar from "../icons/FavoritesNavBar.svg"
import { useState, useEffect } from "react";

export function NavBar() {
    return (
        <header className="navBar">
            <NavBarCont />
        </header>
    );
}

function NavBarCont() {
    const [activeMenu, setActiveMenu] = useState(null);
    const location = useLocation();

    useEffect(() => {
        setActiveMenu(location.pathname.substring(1));
    }, [location]);

    function handleMenuClick(menu) {
        setActiveMenu(menu);
    }

    return (
        <div className="navBar_cont">
            {/* <div className="navBar_cont_inner_home">
                <p>Hello</p> */}

            <Home
                className={activeMenu === 'home' ? 'activeHome' : 'navBar_cont_home'}
                onClick={() => handleMenuClick('home')}
            />
            {/* </div> */}
            <Profile
                className={activeMenu === 'profile' ? 'activeProfile' : 'navBar_cont_profile'}
                onClick={() => handleMenuClick('profile')}
            />
            <MyHorses
                className={activeMenu === 'my-horses' ? 'activeMyHorses' : 'navBar_cont_myHorses'}
                onClick={() => handleMenuClick('my-horses')}
            />
            <Favorites
                className={activeMenu === 'favorites' ? 'activeFavorites' : 'navBar_cont_favorites'}
                onClick={() => handleMenuClick('favorites')}
            />
        </div>
    );
}

function Home({ className, onClick }) {
    return (
        <div
            className={className}
            onClick={onClick}
        >
            <Link to="/home">
                <img className="navBar_cont_home_icon" src={HomeIcon} alt="Home Icon" />
                <label className="navBar_cont_home_label">Home</label>
            </Link>
        </div>
    )
}

function Profile({ className, onClick }) {
    return (
        <div
            className={className}
            onClick={onClick} >
            <Link to="/profile">
                <img className="navBar_cont_profile_icon" src={User} alt="Profile Icon" />
                <label className="navBar_cont_profile_label">Profile</label>
            </Link>
        </div>
    );
}

function MyHorses({ className, onClick }) {
    return (
        <div
            className={className}
            onClick={onClick}>
            <Link to="/my-horses">
                <img className="navBar_cont_myHorses_icon" src={MyHorsesIcon} alt="My Horses Icon" />
                <label className="navBar_cont_myHorses_label">My Horses</label>
            </Link>
        </div>
    );
}

function Favorites({ className, onClick }) {
    return (
        <div
            className={className}
            onClick={onClick}>
            <Link to="/favorites" >
                <img className="navBar_cont_favorites_icon" src={FavoritesNavBar} alt="Favorites Icon" />
                <label className="navBar_cont_favorites_label">Favorites</label>
            </Link>
        </div>
    );
}