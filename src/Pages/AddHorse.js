import Plus from "../icons/Plus.svg";
import Favourites from "../icons/Favourites.svg";
import { Breed } from "../CmptParts/Breed";
import { Color } from "../CmptParts/Color";
import { Discipline } from "../CmptParts/Discipline";
import { useState } from "react";
import Axios from "axios";
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
      uid: 1,
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
    <div className="addHorse">
      <h3>Add Horse</h3>
      <div className="addHorse_cont">
        <div onClick={goBack}>
          <img src={Favourites} height="30px" width="30px" alt="Go Back" />
        </div>
        <div className="addHorse_cont_basics">
          <h3>HORSE BASICS</h3>
          <h4>Horse Name *</h4>
          <input
            required
            name="horseName"
            id="horseName"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <div className="addHorse_cont_basics_details">
            <div className="addHorse_cont_basics_details_gender">
              <h4>Gender *</h4>
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
              {/* <h4>Breed *</h4> */}
              <Breed className="nothing" onChange={breedClick} />
            </div>
            {/* <select required name="breed" id="breed">
                            <option value="" disabled selected>Select</option>
                            <option value={options.value}>{options.label}</option>
                            <option value="y">Y</option>
                        </select> */}
            <div className="addHorse_cont_basics_details_age">
              <h4>Age (years) *</h4>
              <input
                required
                name="age"
                id="age"
                type="number"
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              ></input>
            </div>
            <div className="addHorse_cont_basics_details_height">
              <h4>Height (hh) *</h4>
              <input
                required
                name="height"
                id="height"
                type="number"
                onChange={(e) => {
                  setHeight(e.target.value);
                }}
              ></input>
            </div>
            <div className="addHorse_cont_basics_details_color">
              {/* <h4>Color</h4> */}
              <Color onChange={colorClick} />
            </div>
            {/* <select name="color" id="color">
                            <option value="" disabled selected>Select</option>
                            <option value="x">X</option>
                            <option value="y">Y</option>
                        </select> */}
            <div className="addHorse_cont_basics_details_breedingMethod">
              <h4>Breeding Method *</h4>
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
            <div className="addHorse_cont_basics_details_price">
              <h4>Price</h4>
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
              <h4>Thumbnail</h4>

              <div className="addHorse_cont_basics_upload_thumbnail_content">
                <p>
                  Upload Thumbnail
                </p>
                <div onClick={clickPlus}>
                  <img src={Plus} />
                </div>
              </div>
            </div>
            <div className="addHorse_cont_basics_upload_media">
              <h4>Media *</h4>
              <textarea required name="media" id="media" cols="50" rows="6">
                You can upload x photos
              </textarea>
              <div onClick={clickPlus}>
                <img src={Plus} />
              </div>
            </div>
          </div>
        </div>
        <div className="addHorse_cont_detailed">
          <h3>ABOUT HORSES - DETAILED</h3>
          <div className="addHorse_cont_detailed_description">
            <h4>Description</h4>
            <textarea
              name="description"
              id="description"
              cols="50"
              rows="6"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
            {/* <h4>Disciplines</h4> */}
            <Discipline onChange={disciplineClick} />
            {/* <select name="disciplines" id="disciplines">
                            <option value="" disabled selected>Select</option>
                            <option value="x">X</option>
                            <option value="y">Y</option>
                        </select> */}
            <h4>Documentation *</h4>
            <textarea
              required
              name="documentation"
              id="media"
              cols="50"
              rows="6"
            >
              You can upload x photos
            </textarea>
            <div onClick={clickPlus}>
              <img src={Plus} />
            </div>
          </div>
        </div>
        <div className="addHorse_cont_aboutOwner">
          <h3>ABOUT OWNER</h3>
          <div className="addHorse_cont_aboutOwner_contactPreferences">
            <h4>Contact Preferences</h4>
            <input type="checkbox" id="ownerEmail"></input>
            <p>Email</p>
            <input type="checkbox" id="ownerCall"></input>
            <p>Call</p>
            <input type="checkbox" id="ownerText"></input>
            <p>Text</p>
          </div>
          <div className="addHorse_cont_aboutOwner_location">
            <h4>Location *</h4>
            <input
              required
              name="ownerLocation"
              id="ownerLocation"
              type="text"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            ></input>
          </div>
          <div className="addHorse_cont_aboutOwner_displayHorse">
            <h4>Display horse on profile</h4>
            <input type="checkbox" id="displayHorse"></input>
          </div>
          <p>* required fields</p>
        </div>
        <button onClick={clickSave}>SAVE</button>
        <button onClick={clickCancel}>CANCEL</button>
      </div>
      <p>{height}</p>
    </div>
  );
}
