import { useState } from "react";

export function BreedingMethod() {
    const [checkedNatural, setCheckedNatural] = useState(false);
    const [checkedArtificial, setCheckedArtificial] = useState(false);


    const handlerNatural = () => {
        setCheckedNatural(!checkedNatural);
        console.log("natural");
    }
    const handlerArtificial = () => {
        setCheckedArtificial(!checkedArtificial);
        console.log("artificial");
    }

    return (
        <div className="filter_cont_breedingMethod">
            <div className="filter_cont_breedingMethod_natural">
                <input name="breedingMethod" id="natural" type="checkbox" checked={checkedNatural} onChange={handlerNatural} />
                <label>Natural</label>
            </div>
            <div className="filter_cont_breedingMethod_artificial">
                <input name="breedingMethod" id="artificial" type="checkbox" checked={checkedArtificial} onChange={handlerArtificial} />
                <label>Insemination</label>
            </div>
        </div>
    )
}