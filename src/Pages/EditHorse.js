import CancelButton from "../icons/CancelButton.svg";
import SaveButton from "../icons/SaveButton.svg";
import BackButton from "../icons/BackButton.svg";
import { Breed } from "../CmptParts/Breed";
import { Color } from "../CmptParts/Color";
import { Discipline } from "../CmptParts/Discipline";
import { useState, useEffect } from "react";
import Axios from "axios";
import { NavBar } from "../Components/NavBar";
import { PopUp } from "../Components/PopUp";
import { Button } from "../Components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { API_ENDPOINT } from "../server";

export function EditHorse() {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState();
    const [height, setHeight] = useState();
    const [color, setColor] = useState("");
    const [breedMethod, setBreedMethod] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [discipline, setDiscipline] = useState("");
    const [showSavePopUp, setShowSavePopUp] = useState(false);
    const [showCancelPopUp, setShowCancelPopUp] = useState(false);

    let navigate = useNavigate();
    let location = useLocation();

    const horseObj = location.state.horse;
    // console.log(horseObj);

    const horseID = horseObj.horseID;
    // console.log(horseID);

    useEffect(() => {
        if (localStorage.getItem("id") === null) {
            navigate("/login");
        }
    });

    const colorClick = (data) => {
        setColor(data);
    };

    const breedClick = (data) => {
        setBreed(data);
    };

    const disciplineClick = (data) => {
        setDiscipline(data);
    };

    const clickSave = () => {
        Axios.post(`${API_ENDPOINT}edithorse`, {
            name: name,
            gender: gender,
            breed: breed,
            age: age,
            height: height,
            color: color,
            breedMethod: breedMethod,
            price: price,
            description: description,
            discipline: discipline,
            horseID: horseID,
        });
        setShowSavePopUp(!showSavePopUp);
    };

    const clickCancel = () => {
        setShowCancelPopUp(!showCancelPopUp);
    };
    const goBack = (event) => {
        event.stopPropagation();
        navigate(-1);
    };

    const redirect = () => {
        navigate("/my-horses");
    };

    const cancel = () => {
        setShowCancelPopUp(!showCancelPopUp);
    };

    return (
        <div className="addHorse_master">
            <NavBar />
            <div className="addHorse">
                <h2>Edit Horse</h2>
                <div className="addHorse_cont">
                    <p className="addHorse_cont_backButton" onClick={goBack}>
                        <img src={BackButton} height="30px" width="30px" alt="Go Back" />
                        Back
                    </p>
                    <div className="addHorse_cont_basics">
                        <h3>EDIT HORSE</h3>
                        <div className="addHorse_cont_basics_details">
                            <div className="addHorse_cont_basics_details_name">
                                <label>
                                    Horse Name
                                </label>
                                <input
                                    required
                                    name="horseName"
                                    id="horseName"
                                    type="text"
                                    // defaultValue={horseObj.horseName}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                ></input>
                            </div>
                            <div className="addHorse_cont_basics_details_firstRow">
                                <div className="addHorse_cont_basics_details_gender">
                                    <label>
                                        Gender
                                    </label>
                                    <select
                                        required
                                        name="gender"
                                        id="gender"
                                        onChange={(e) => {
                                            setGender(e.target.value);
                                        }}
                                    >
                                        <option value="" disabled selected>
                                            Gender
                                        </option>
                                        <option value="Stallion">Stallion</option>
                                        <option value="Mare">Mare</option>
                                    </select>
                                </div>
                                <div className="addHorse_cont_basics_details_breed">
                                    <Breed
                                        className="addHorse_cont_basics_details_breed_cont"
                                        onChange={breedClick}
                                    />
                                </div>

                                <div className="addHorse_cont_basics_details_age">
                                    <label>
                                        Age
                                    </label>
                                    <input
                                        required
                                        name="age"
                                        id="age"
                                        type="number"
                                        placeholder="Years"
                                        onChange={(e) => {
                                            setAge(e.target.value);
                                        }}
                                        onWheel={(e) => e.target.blur()}
                                    ></input>
                                </div>
                            </div>
                            <div className="addHorse_cont_basics_details_secondRow">
                                <div className="addHorse_cont_basics_details_height">
                                    <label>
                                        Height
                                    </label>
                                    <input
                                        required
                                        name="height"
                                        id="height"
                                        type="number"
                                        placeholder="Centimeters"
                                        onChange={(e) => {
                                            setHeight(e.target.value);
                                        }}
                                        onWheel={(e) => e.target.blur()}
                                    ></input>
                                </div>
                                <div className="addHorse_cont_basics_details_color">
                                    <Color
                                        onChange={colorClick}
                                        className="addHorse_cont_basics_details_color_cont"
                                    />
                                </div>
                                <div className="addHorse_cont_basics_details_breedingMethod">
                                    <label>
                                        Breeding Method
                                    </label>
                                    <select
                                        required
                                        name="breedingMethod"
                                        id="breedingMethod"
                                        onChange={(e) => {
                                            setBreedMethod(e.target.value);
                                        }}
                                    >
                                        <option value="" disabled selected>
                                            Breeding Method
                                        </option>
                                        <option value="Natural">Natural</option>
                                        <option value="Artificial">Insemination</option>
                                    </select>
                                </div>
                            </div>
                            <div className="addHorse_cont_basics_details_price">
                                <label>Price</label>
                                <input
                                    name="price"
                                    id="price"
                                    type="number"
                                    placeholder="Dollars"
                                    onChange={(e) => {
                                        setPrice(e.target.value);
                                    }}
                                    onWheel={(e) => e.target.blur()}
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className="addHorse_cont_detailed">
                        <div className="addHorse_cont_detailed_description">
                            <label>Description</label>
                            <textarea
                                name="description"
                                id="description"
                                cols="50"
                                rows="6"
                                placeholder="Write a short description"
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            ></textarea>
                            <div className="addHorse_cont_detailed_discipline">
                                <Discipline
                                    className="addHorse_cont_detailed_discipline_content"
                                    onChange={disciplineClick}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="endButtons">
                        <img
                            alt="Save horse"
                            className="endButtons_saveButton"
                            src={SaveButton}
                            onClick={clickSave}
                        ></img>
                        <img
                            alt="Cancel editing horse"
                            className="endButtons_cancelButton"
                            src={CancelButton}
                            onClick={clickCancel}
                        ></img>
                    </div>
                </div>

                {showSavePopUp && (
                    <PopUp
                        title="Editions saved!"
                        description="Your horse alterations were successfully saved."
                        addContent={
                            <Button
                                className="popUp_btn_horseSaved"
                                title="Go to My Horses"
                                onClick={redirect}
                            />
                        }
                    />
                )}

                {showCancelPopUp && (
                    <PopUp
                        title="Are you sure?"
                        description="Are you sure you want to leave? Your changes will be lost."
                        addContent={
                            <>
                                <Button
                                    className="popUp_btn_cancel"
                                    title="Cancel"
                                    onClick={cancel}
                                />
                                <Button
                                    className="popUp_btn_leave"
                                    title="Leave"
                                    onClick={redirect}
                                />
                            </>
                        }
                        classNameContent="btn_cont"
                    />
                )}
                {/* <Footer /> */}
            </div>
        </div>
    );
}
