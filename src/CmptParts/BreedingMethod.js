import { useState } from "react";

export function BreedingMethod(props) {
  const [checkedNatural, setCheckedNatural] = useState(false);
  const [checkedArtificial, setCheckedArtificial] = useState(false);

  const handlerNatural = () => {
    setCheckedNatural(!checkedNatural);
    // console.log("natural");
    props.handleMessage("natural");
  };
  const handlerArtificial = () => {
    setCheckedArtificial(!checkedArtificial);
    props.handleMessage("artificial");
    //console.log("artificial");
  };

  return (
    <div className="filter_cont_breedingMethod">
      <div className="filter_cont_breedingMethod_natural">
        <label>
          <input
            name="breedingMethod"
            id="natural"
            type="radio"
            checked={checkedNatural}
            onChange={handlerNatural}
          />
          Natural
        </label>
      </div>
      <div className="filter_cont_breedingMethod_artificial">
        <label>
          <input
            name="breedingMethod"
            id="artificial"
            type="radio"
            checked={checkedArtificial}
            onChange={handlerArtificial}
          />
          Insemination
        </label>
      </div>
    </div>
  );
}
