import { useState } from "react";

export function Gender() {
    const [checkedStallion, setCheckedStallion] = useState(false);
    const [checkedMare, setCheckedMare] = useState(false);


    const handlerStallion = () => {
        setCheckedStallion(!checkedStallion);
        console.log("stallion");
    }
    const handlerMare = () => {
        setCheckedMare(!checkedMare);
        console.log("mare");
    }

    return (
        <div className="filter_cont_gender">
            <div className="filter_cont_gender_stallion">
                <label>
                    <input name="genres" id="stallion" type="checkbox" checked={checkedStallion} onChange={handlerStallion} />
                    Stallion</label>
            </div>
            <div className="filter_cont_gender_mare">
                <label>
                    <input name="genres" id="mare" type="checkbox" checked={checkedMare} onChange={handlerMare} />
                    Mare</label>
            </div>
        </div>
    )
}