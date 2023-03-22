import { useState } from "react";
import { DropdownIcon } from "./DropdownIcon";

export function SortByDropdown() {
    return (
        <div className="sortBy_master">
            <div className="sortBy_master_cont">
                <SortBy />
            </div>
        </div>
    )
}

function SortBy() {
    const [showSortBy, setShowSortBy] = useState(false);
    const [checkedHigh, setCheckedHigh] = useState(false);
    const [checkedLow, setCheckedLow] = useState(false);
    const [checkedLikes, setCheckedLikes] = useState(false);


    const handlerHigh = () => {
        setCheckedHigh(!checkedHigh);
    }

    const handlerLow = () => {
        setCheckedLow(!checkedLow);
    }

    const handlerLikes = () => {
        setCheckedLikes(!checkedLikes);
    }

    const toggle = () => {
        setShowSortBy(!showSortBy);
    }

    return (
        <div className="dropdown_master">
            <div className="dropdown" onClick={toggle}>
                Sort By
                <DropdownIcon />
            </div>
            {showSortBy && (
                <div className="sortBy">
                    <div className="sortBy_cont">
                        <div className="sortBy_cont_high">
                            <label>
                                <input name="sortBy" id="high" type="radio" checked={checkedHigh} onChange={handlerHigh}>
                                </input>
                                High Price</label>
                        </div>
                        <div className="sortBy_cont_low">
                            <label>
                                <input name="sortBy" id="low" type="radio" checked={checkedLow} onChange={handlerLow}>
                                </input>
                                Low Price</label>
                        </div>
                        <div className="sortBy_cont_likes">
                            <label>
                                <input name="sortBy" id="likes" type="radio" checked={checkedLikes} onChange={handlerLikes}>
                                </input>
                                Most Liked</label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}