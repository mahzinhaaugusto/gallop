import { useState } from "react";
import closeIcon from "../icons/CloseIcon.svg";
import { DropdownIcon } from "./DropdownIcon";
import { Breed } from "../CmptParts/Breed";
import { Gender } from "../CmptParts/Gender";
import { ColorForFilter } from "../CmptParts/ColorForFilter";
import { BreedingMethod } from "../CmptParts/BreedingMethod";
import { Discipline } from "../CmptParts/Discipline";
import { Height } from "../CmptParts/Height";
import { Age } from "../CmptParts/Age";
import { Price } from "../CmptParts/Price";
import { Localization } from "../CmptParts/Localization";
import { Button } from "../Components/Button";

export function CloseButton(props) {
  const { onClick } = props;
  return (
    <div className="closeBtn_cont">
      <img
        src={closeIcon}
        alt=""
        className="closeBtn_cont_btn"
        onClick={onClick}
      />
    </div>
  );
}

export function FilterDropdown({ filterReturn }) {
  return (
    <div className="filter_master">
      <div className="filter_master_cont">
        <Filter filterReturn={filterReturn} />
      </div>
    </div>
  );
}

function Filter({ filterReturn }) {
  const [showFilter, setShowFilter] = useState(false);

  const toggle = () => {
    setShowFilter(!showFilter);
  };

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
          <FilterCont filterReturn={filterReturn} />
        </section>
      )}
    </div>
  );
}

function FilterCont({ filterReturn }) {
  const [gender, seGender] = useState("");
  const [bMetod, setBMethod] = useState("");
  const [color, sColor] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [maxheight, setMax] = useState("");
  const [minHeight, setMin] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [bred, seBreed] = useState("");
  const setColor = (info) => {
    sColor(info);
  };
  const setBreed = (data) => {
    seBreed(data);
  };
  const setGender = (info) => {
    seGender(info);
  };
  const setBreeding = (info) => {
    setBMethod(info);
  };
  const disciplineClick = (data) => {
    setDiscipline(data);
  };
  const setHeight = (min, max) => {
    setMin(min);
    setMax(max);
  };
  const setAge = (min, max) => {
    setMinAge(min);
    setMaxAge(max);
  };
  const setPrice = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const applyFilter = () => {
    let filterData = {};
    // eslint-disable-next-line
    if (gender != "") filterData.gender = gender;
    // eslint-disable-next-line
    if (bMetod != "") filterData.breedingMethod = bMetod;
    // eslint-disable-next-line
    if (discipline != "") filterData.discipline = discipline;
    // eslint-disable-next-line
    if (color != "" && color != "Select") filterData.color = color;
    // eslint-disable-next-line
    if (bred != "") filterData.breed = bred;
    // eslint-disable-next-line
    if (minHeight != "") {
      filterData.minHeight = minHeight;
      filterData.maxHeight = maxheight;
    }
    // eslint-disable-next-line
    if (minAge != "") {
      filterData.minAge = minAge;
      filterData.maxAge = maxAge;
    }
    // eslint-disable-next-line
    if (minPrice != "") {
      filterData.maxPrice = maxPrice;
      filterData.minPrice = minPrice;
    }

    filterReturn(filterData);
    filterData = {};
  };

  return (
    <div id="testing" className="filter_cont_all">
      <Localization />
      <Breed onChange={setBreed} className="filter_cont_breed_exterior" />
      <Gender handleMessage={setGender} />
      <ColorForFilter
        handleMessage={setColor}
        className="filter_cont_color_exterior"
      />
      <BreedingMethod handleMessage={setBreeding} />
      <Discipline
        onChange={disciplineClick}
        className="filter_cont_discipline_exterior"
      />
      <Height handleMessage={setHeight} />
      <Age handleMessage={setAge} />
      <Price handleMessage={setPrice} />
      <div className="filter_cont_all_buttons">
        <Button
          className="renderFilterSelection"
          title="Apply"
          onClick={applyFilter}
        />
      </div>
    </div>
  );
}
