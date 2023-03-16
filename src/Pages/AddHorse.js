import CancelButton from "../icons/CancelButton.svg";
import SaveButton from "../icons/SaveButton.svg";

import AddMedia from "../icons/AddMedia.svg";
import BackButton from "../icons/BackButton.svg";
import { Breed } from "../CmptParts/Breed";
import { Color } from "../CmptParts/Color";
import { Discipline } from "../CmptParts/Discipline";
import { useState } from "react";
import Axios from "axios";
import { NavBar } from "../Components/NavBar";
import { Footer } from "../Components/Footer";
// Im using the Favorites icon as a placeholder for future icons

export function AddHorse() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState();
  const [height, setHeight] = useState();
  const [color, setColor] = useState("");
  const [breedMethod, setBreedMethod] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [discipline, setDiscipline] = useState("");
  const clickPlus = () => {
    console.log("works");
  };
  const colorClick = (data) => {
    console.log(data);
    setColor(data);
  };
  const breedClick = (data) => {
    setBreed(data);
  };
  const disciplineClick = (data) => {
    console.log(data);
    setDiscipline(data);
  };
  const clickSave = () => {
    let uid = localStorage.getItem("id");
    Axios.post("http://localhost:3002/api/insertHorse", {
      name: name,
      gender: gender,
      breed: breed,
      age: age,
      height: height,
      color: color,
      breedMethod: breedMethod,
      price: price,
      description: description,
      location: location,
      discipline: discipline,
      uid: uid,
    });
    alert("Well Done");
  };
  const clickCancel = () => {
    console.log("works");
  };
  const goBack = () => {
    console.log("works");
  };

  return (
    <div className="addHorse_master">
      <NavBar />
      <div className="addHorse">
        <h2>Add Horse</h2>
        <div className="addHorse_cont">
          <p className="addHorse_cont_backButton" onClick={goBack}>
            <img src={BackButton} height="30px" width="30px" alt="Go Back" />
            Back
          </p>
          <div className="addHorse_cont_basics">
            <h3>HORSE BASICS</h3>
            <div className="addHorse_cont_basics_details">
              <div className="addHorse_cont_basics_details_name">
                <label>
                  Horse Name{" "}
                  <span className="addHorse_cont_basics_details_name_error">
                    *
                  </span>
                </label>
                <input
                  required
                  name="horseName"
                  id="horseName"
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></input>
              </div>
              <div className="addHorse_cont_basics_details_firstRow">
                <div className="addHorse_cont_basics_details_gender">
                  <label>
                    Gender{" "}
                    <span className="addHorse_cont_basics_details_name_gender_error">
                      *
                    </span>
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
                      Select
                    </option>
                    <option value="stallion">Stallion</option>
                    <option value="mare">Mare</option>
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
                    Age{" "}
                    <span className="addHorse_cont_basics_details_age_error">
                      *
                    </span>
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
                  ></input>
                </div>
              </div>
              <div className="addHorse_cont_basics_details_secondRow">
                <div className="addHorse_cont_basics_details_height">
                  <label>
                    Height{" "}
                    <span className="addHorse_cont_basics_details_height_error">
                      *
                    </span>
                  </label>
                  <input
                    required
                    name="height"
                    id="height"
                    type="number"
                    placeholder="HH"
                    onChange={(e) => {
                      setHeight(e.target.value);
                    }}
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
                    Breeding Method{" "}
                    <span className="addHorse_cont_basics_details_breedingMethod_error">
                      *
                    </span>
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
                      Select
                    </option>
                    <option value="natural">Natural</option>
                    <option value="artificial">Insemination</option>
                  </select>
                </div>
              </div>
              <div className="addHorse_cont_basics_details_price">
                <label>Price</label>
                <input
                  name="price"
                  id="price"
                  type="number"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <div className="addHorse_cont_basics_upload">
              <div className="addHorse_cont_basics_upload_thumbnail">
                <label>Thumbnail</label>
                <div className="addHorse_cont_basics_upload_thumbnail_content">
                  <p>Upload Thumbnail</p>
                  <div onClick={clickPlus}>
                    <img src={AddMedia} />
                  </div>
                </div>
              </div>
              <div className="addHorse_cont_basics_upload_media">
                <label>
                  Media{" "}
                  <span className="addHorse_cont_basics_upload_media_error">
                    *
                  </span>
                </label>
                <div className="addHorse_cont_basics_upload_media_content">
                  <p>Up to 3 photos </p>
                  <div onClick={clickPlus}>
                    <img src={AddMedia} />
                  </div>
                </div>
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
                <Discipline onChange={disciplineClick} />
              </div>
              <div className="addHorse_cont_detailed_documentation">
                <label>
                  Documentation{" "}
                  <span className="addHorse_cont_detailed_documentation_error">
                    *
                  </span>
                </label>
                <div className="addHorse_cont_detailed_documentation_content">
                  <p>Up to 30MB</p>
                  <div onClick={clickPlus}>
                    <img src={AddMedia} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="addHorse_cont_aboutOwner">
            <h3>ABOUT OWNER</h3>
            <div className="addHorse_cont_aboutOwner_contactPreferences">
              <label>Contact Preferences</label>
              <input type="checkbox" id="ownerEmail"></input>
              <p>Email</p>
              <input type="checkbox" id="ownerCall"></input>
              <p>Call</p>
              <input type="checkbox" id="ownerText"></input>
              <p>Text</p>
            </div>
            <div className="addHorse_cont_aboutOwner_location">
              <label>
                Location{" "}
                <span className="addHorse_cont_aboutOwner_location_error">
                  *
                </span>
              </label>
              <input
                required
                name="ownerLocation"
                id="ownerLocation"
                type="text"
                placeholder="Location"
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
              ></input>
            </div>
            <div className="addHorse_cont_aboutOwner_displayHorse">
              <label className="toggle-control">{/* Display horse on profile */}
                <input  type="checkbox"
              checked="checked"></input>
                <span className="control"></span>
              </label>
              
            </div>
            <p>* required fields</p>
          </div>
          <div className="endButtons">
            <img
              className="endButtons_saveButton"
              src={SaveButton}
              onClick={clickSave}
            ></img>
            <img
              className="endButtons_cancelButton"
              src={CancelButton}
              onClick={clickCancel}
            ></img>
          </div>
        </div>
        <p>{height}</p>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
