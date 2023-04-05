import { useState } from "react";

export function Gender(props) {
  const [checkedStallion, setCheckedStallion] = useState(false);
  const [checkedMare, setCheckedMare] = useState(false);

  const handlerStallion = () => {
    setCheckedStallion(!checkedStallion);
    props.handleMessage("Stallion");
  };

  const handlerMare = () => {
    setCheckedMare(!checkedMare);
    props.handleMessage("Mare");
  };

  return (
    <div className="filter_cont_gender">
      <div className="filter_cont_gender_stallion">
        <label>
          <input
            name="genres"
            id="stallion"
            type="radio"
            onClick={handlerStallion}
          />
          Stallion
        </label>
      </div>
      <div className="filter_cont_gender_mare">
        <label>
          <input name="genres" id="mare" type="radio" onClick={handlerMare} />
          Mare
        </label>
      </div>
    </div>
  );
}
