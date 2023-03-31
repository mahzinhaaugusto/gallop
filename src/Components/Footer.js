import { useNavigate } from "react-router-dom";
import horsePhoto from "../icons/HorseFooter.svg";
import logoFooter from "../icons/LogoFooter.svg";

export function Footer() {
    return (
        <footer className="footer">
            <FooterCont />
        </footer>
    );
}

function FooterCont() {
    return (
        <div className="footer_cont">
            <Image />
            <div className="footer_cont_mainContent_master">
                <div className="footer_cont_mainContent">
                    <LogoFooter />
                    <Data />
                    <Jupiter />
                    <GallopEmail />
                    <Rights />
                </div>
            </div>
        </div>
    );
}

function Image() {
    return (
        <div className="footer_cont_img">
            <img src={horsePhoto} alt="" />
        </div>
    )
}

function LogoFooter() {
    return (
        <div className="footer_cont_logoFooter">
            <img src={logoFooter} alt="" />
        </div>
    );
}

function Rights() {
    return (
        <div className="footer_cont_rights">
            <p>&copy; All Rights Reserved</p>
        </div>
    )
}

function GallopEmail() {
    return (
        <div className="footer_cont_email">
            <a href="mailto:contact@thegallopapp.com">contact@thegallopapp.com</a>
        </div>
    )
}

function Jupiter() {
    return (
        <div className="footer_cont_jupiter">
            <p>Created by Jupiter / Langara College</p>
        </div>
    )
}

function Data() {
    let navigate = useNavigate();
    const goToData = () => {
        navigate("/data-analytics");
    };
    return (
        <div className="footer_cont_documentation">
            <p onClick={goToData}>Statistics</p>
        </div>
    )
}