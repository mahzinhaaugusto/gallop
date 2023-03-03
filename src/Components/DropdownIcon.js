import arrowDown from "../icons/ArrowDown.svg";

export function DropdownIcon({ onClick }) {
    return (
        <img src={arrowDown} alt="" className="dropdownIcon" onClick={onClick} />
    )
}