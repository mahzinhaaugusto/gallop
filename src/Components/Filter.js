import { useState } from "react";
import closeIcon from "../icons/CloseIcon.svg";
import { DropdownIcon } from "./DropdownIcon";
import { Breed } from "../CmptParts/Breed";
import { Gender } from "../CmptParts/Gender";
import { Color } from "../CmptParts/Color";
import { BreedingMethod } from "../CmptParts/BreedingMethod";
import { Discipline } from "../CmptParts/Discipline";
import { Height } from "../CmptParts/Height";
import { Age } from "../CmptParts/Age";
import { Price } from "../CmptParts/Price";
import { Button } from "../Components/Button";

export function CloseButton(props) {
    const { onClick } = props;
    return (
        <div className="closeBtn_cont">
            <img src={closeIcon} alt="" className="closeBtn_cont_btn" onClick={onClick} />
        </div>
    )
}

export function FilterDropdown() {
    return (
        <div className="filter_master">
            <div className="filter_master_cont">
                <Filter />
            </div>
        </div>
    )
}

function Filter() {

    const [showFilter, setShowFilter] = useState(false);

    const toggle = () => {
        setShowFilter(!showFilter);
    }

    return (
        <div className="dropdown_master">
            <div className="dropdown" onClick={toggle}>
                Filter
                <DropdownIcon />
            </div>
            {showFilter && (
                <section className="filter">
                    <div className="filter_cont">
                        <h3 className="filter_cont_heading">Filters</h3>
                        <CloseButton onClick={toggle} />
                    </div>
                    <FilterCont />
                </section>
            )}
        </div>
    )
}

function FilterCont() {
    const resetFilter = () => {
        console.log("reset button working");
        // document.getElementsByClassName("filter_cont_all").value = null;
    }

    const applyFilter = () => {
        console.log("apply button working");
    }

    return (
        <div id="testing" className="filter_cont_all">
            <Breed />
            <Gender />
            <Color />
            <BreedingMethod />
            <Discipline />
            <Height />
            <Age />
            <Price />
            <div className="filter_cont_all_buttons">
                <Button className="resetFilterSelection" title="Reset" onClick={resetFilter} />
                <Button className="renderFilterSelection" title="Apply" onClick={applyFilter} />
            </div>
        </div>
    )
}



