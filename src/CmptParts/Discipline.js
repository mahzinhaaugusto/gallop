import { CloseButton } from "../Components/Filter";
import { DropdownIcon } from "../Components/DropdownIcon";
import { useState, useEffect, useRef } from "react";
import disciplinesList from "../disciplinesList.json";

export function Discipline({ onChange, className }) {
  const options = disciplinesList.disciplinesList;
  const disciplineSet = onChange;

  return (
    <div className={className}>
      <label className="filter_cont_discipline_label">Discipline</label>
      <div className="filter_cont_discipline">
        <DisciplineDropdown
          isMulti
          isSearchable
          placeholder="Discipline (up to 3)"
          options={options}
          disciplineSet={disciplineSet}
        // isOptionDisabled={() => selectedOptions.length >= 3}
        />
      </div>
    </div>
  );
}

function DisciplineDropdown({
  placeholder,
  options,
  isSearchable,
  isMulti,
  disciplineSet,
}) {
  const [showOptions, setShowOptions] = useState(false);

  const [selectedValue, setSelectedValue] = useState(isMulti ? [] : null);

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

  const getDisciplineSelection = () => {
    if (!selectedValue || selectedValue.length === 0) {
      return placeholder;
    }

    // Code for multiple selection
    if (isMulti) {
      return (
        <div className="filter_cont_discipline_multiSelection">
          {selectedValue.map((option) => (
            <div
              key={option.value}
              className="filter_cont_discipline_multiSelection_singleOption"
            >
              {option.label}
              <span
                onClick={(event) => optionRemove(event, option)}
                className="filter_cont_discipline_multiSelection_singleOption_closeBtn"
              >
                <CloseButton />
              </span>
            </div>
          ))}
        </div>
      );
    }
    return selectedValue.label;
  };

  const removeOption = (option) => {
    return selectedValue.filter((opt) => opt.value !== option.value);
  };

  const optionRemove = (event, option) => {
    event.stopPropagation();
    setSelectedValue(removeOption(option));
  };

  const onItemClick = (option) => {
    let newOption;
    if (isMulti) {
      if (selectedValue.findIndex((opt) => opt.value === option.value) >= 0) {
        newOption = removeOption(option);
      } else {
        if (selectedValue.length < 3) {
          newOption = [...selectedValue, option];
        } else {
          newOption = [...selectedValue];
          // alert("You're not allowed to select more than 3")
        }
      }
    } else {
      newOption = option;
    }
    setSelectedValue(newOption);
    let skills = "";
    //console.log(newOption[0]);
    for (let i = 0; i < newOption.length; i++) {
      if (i == newOption.length - 1) {
        skills += newOption[i].label;
      } else {
        skills += newOption[i].label + ", ";
      }
    }
    //console.log(skills);
    disciplineSet(skills);
  };

  const isSelected = (option) => {
    if (isMulti) {
      return (
        selectedValue.filter((opt) => opt.value === option.value).length > 0
      );
    }

    if (!selectedValue) {
      return false;
    }

    return selectedValue.value === option.value;
  };

  return (
    <div className="filter_cont_discipline_dropdown">
      <div
        ref={inputRef}
        onClick={handleInputClick}
        className="filter_cont_discipline_dropdown_selector"
      >
        <div className="filter_cont_discipline_selector_selection">
          {getDisciplineSelection()}
        </div>
        <DropdownIcon />
      </div>
      {showOptions && (
        <div className="filter_cont_discipline_dropdown_options">
          {isSearchable && (
            <div onClick={(e) => e.stopPropagation()} className="filter_cont_discipline_dropdown_search">
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
              className={`filter_cont_discipline_dropdown_options_singleOption ${isSelected(option) && "selected"
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
