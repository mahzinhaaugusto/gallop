import { DropdownIcon } from "../Components/DropdownIcon";
import { useState, useEffect, useRef } from "react";
import colorList from "../colorList.json";

export function Color({ onChange, className }) {
  let selectColor = onChange;

  const options = colorList.colorList;

  return (
    <div className={className}>
      <label className="filter_cont_color_label">Colour</label>
      <div className="filter_cont_color">
        <ColorDropdown
          isSearchable
          placeholder="Colour"
          options={options}
          selectColor={selectColor}
        />
      </div>
    </div>
  );
}

function ColorDropdown({ placeholder, options, isSearchable, selectColor }) {
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

  const getColorSelection = () => {
    if (selectedValue) {
      return selectedValue.label;
    }
    return placeholder;
  };

  const onItemClick = (option) => {
    setSelectedValue(option);
    selectColor(option.label);
  };

  const isSelected = (option) => {
    if (!selectedValue) {
      return false;
    }

    return selectedValue.value === option.value;
  };

  return (
    <div className="filter_cont_color_dropdown">
      <div
        ref={inputRef}
        onClick={handleInputClick}
        className="filter_cont_color_dropdown_selector"
      >
        <div className="filter_cont_color_selector_selection">
          {getColorSelection()}
        </div>
        <DropdownIcon />
      </div>
      {showOptions && (
        <div className="filter_cont_color_dropdown_options">
          {isSearchable && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="filter_cont_color_dropdown_search"
            >
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
              className={`filter_cont_color_dropdown_options_singleOption ${
                isSelected(option) && "selected"
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
