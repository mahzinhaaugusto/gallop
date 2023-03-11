import { DropdownIcon } from "../Components/DropdownIcon";
import { useState, useEffect, useRef } from "react";
import breedList from "../breedList.json";

export function Breed({ onChange, className }) {
  const options = breedList.breedList;
  let optionSelected = onChange;
  //console.log(a);

  return (
    <div className={className}>
      <label className="filter_cont_breed_label">
        Breed <span className="filter_cont_breed_label_error">*</span>
      </label>
      <div className="filter_cont_breed">
        <BreedDropdown
          isSearchable
          placeholder="Breed"
          options={options}
          optionSelected={optionSelected}
        />
      </div>
    </div>
  );
}

function BreedDropdown({ placeholder, options, isSearchable, optionSelected }) {
  //console.log(a);
  const [showOptions, setShowOptions] = useState(false);

  const [selectedValue, setSelectedValue] = useState(null);

  const inputRef = useRef();

  const [searchValue, setSearchValue] = useState("");

  const searchRef = useRef();

  // Search
  useEffect(() => {
    setSearchValue("");
    if (showOptions && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showOptions]);

  const onSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }
    return options.filter(
      (option) =>
        option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    );
  };

  useEffect(() => {
    const handler = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    window.addEventListener("click", handler);

    return () => {
      window.removeEventListener("click", handler);
    };
  });

  const handleInputClick = (event) => {
    // event.stopPropagation();
    setShowOptions(!showOptions);
  };

  const getBreedSelection = () => {
    if (selectedValue) {
      return selectedValue.label;
    }
    return placeholder;
  };

  const onItemClick = (option) => {
    setSelectedValue(option);
    optionSelected(option.label);
    //props.onClick(option);
  };

  const isSelected = (option) => {
    if (!selectedValue) {
      return false;
    }

    return selectedValue.value === option.value;
  };

  return (
    <div className="filter_cont_breed_dropdown">
      <div
        ref={inputRef}
        onClick={handleInputClick}
        className="filter_cont_breed_dropdown_selector"
      >
        <div className="filter_cont_breed_selector_selection">
          {getBreedSelection()}
        </div>
        <DropdownIcon />
      </div>
      {showOptions && (
        <div className="filter_cont_breed_dropdown_options">
          {isSearchable && (
            <div className="filter_cont_breed_dropdown_search">
              <input
                type="text"
                onChange={onSearch}
                value={searchValue}
                ref={searchRef}
              />
            </div>
          )}
          {getOptions().map((option) => (
            <div
              onClick={() => onItemClick(option)}
              key={option.value}
              className={`filter_cont_breed_dropdown_options_singleOption ${isSelected(option) && "selected"
                }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
