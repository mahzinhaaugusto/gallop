import { useState } from "react";
import { DropdownIcon } from "./DropdownIcon";

export function SortByDropdown({ sortType }) {
  return (
    <div className="sortBy_master">
      <div className="sortBy_master_cont">
        <SortBy sortType={sortType} />
      </div>
    </div>
  );
}

function SortBy({ sortType }) {
  const [showSortBy, setShowSortBy] = useState(false);
  const [checkedHigh, setCheckedHigh] = useState(false);
  const [checkedLow, setCheckedLow] = useState(false);
  const [checkedLikes, setCheckedLikes] = useState(false);

  const handlerHigh = () => {
    setCheckedHigh(!checkedHigh);
    sortType("high");
  };

  const handlerLow = () => {
    setCheckedLow(!checkedLow);
    sortType("low");
  };

  const handlerLikes = () => {
    setCheckedLikes(!checkedLikes);
    sortType("likes");
  };

  const toggle = () => {
    setShowSortBy(!showSortBy);
  };

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
              <input
                name="sortBy"
                id="high"
                type="radio"
                onClick={handlerHigh}
              ></input>
              <label htmlFor="high">High Price</label>
            </div>
            <div className="sortBy_cont_low">
              <input
                name="sortBy"
                id="low"
                type="radio"
                onClick={handlerLow}
              ></input>
              <label htmlFor="low">Low Price</label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
