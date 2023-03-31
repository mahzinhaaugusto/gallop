import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import CancelButton from "../icons/CancelButton.svg";
import SaveButton from "../icons/SaveButton.svg";
import AddMedia from "../icons/AddMedia.svg";
import BackButton from "../icons/BackButton.svg";
import { Breed } from "../CmptParts/Breed";
import { Color } from "../CmptParts/Color";
import { Discipline } from "../CmptParts/Discipline";
import { useState, useEffect } from "react";
import Axios from "axios";
import { NavBar } from "../Components/NavBar";
import { PopUp } from "../Components/PopUp";
import { Button } from "../Components/Button";
import { useNavigate } from "react-router-dom";

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
  const [discipline, setDiscipline] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [photo, setPhoto] = useState("");
  const [p, setP] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [horsePhotos, setHorsePhotos] = useState([]);
  const [showSavePopUp, setShowSavePopUp] = useState(false);
  const [showCancelPopUp, setShowCancelPopUp] = useState(false);
  const [nameError, setNameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [breedError, setBreedError] = useState("");
  const [heightError, setHeightError] = useState("");
  const [breedingMethodError, setBreedingMethodError] = useState("");
  const [thumbnailError, setThumbnailError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  let navigate = useNavigate();

  let location = sessionStorage.getItem("city");

  useEffect(() => {
    if (localStorage.getItem("id") === null) {
      // console.log("sorry");
      navigate("/login");
    }
  });

  const clickPlus = (event) => {
    const file = event.target.files[0];
    if (horsePhotos.length >= 3) {
      alert("you cannot select more than three photos");
    } else {
      horsePhotos.push(file);
      // console.log(horsePhotos);
    }
  };

  const clickPlusOfThumb = () => {
    //document.getElementById("thumb").style.display = "block";
  };

  const photoSeleceted = (event) => {
    const file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    setPhoto(file);
    //console.log(photo);
    // setPreviewUrl(file);

    reader.onload = () => {
      //   let bl = new Blob([reader.result], { type: file.type });
      setPreviewUrl(reader.result);
      // setPhoto(reader.result);
      //   setBlob(bl);
    };
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

  async function uploadPhotos() {
    const storage = getStorage();
    //console.log(horsePhotos);
    let photoArray = [];

    // eslint-disable-next-line
    if (horsePhotos[0] != "") {
      for (let i = 0; i < 3; i++) {
        //console.log(horsePhotos[i].name);
        let hName = name + i;
        if (horsePhotos[i]) {
          //console.log(horsePhotos[i]);
          const storageR = ref(storage, `Horsephoto/${hName}`);
          await uploadBytes(storageR, horsePhotos[i]).then(() => {
            getDownloadURL(storageR).then((res) => {
              photoArray[i] = res;
              setP(res);
              //console.log(p);
            });
          });
        }
      }
    }
    console.log(p);
    return photoArray;
  }

  const clickSave = () => {
    console.log(breedMethod);
    if (
      name == "" ||
      gender == "" ||
      breed == "" ||
      age == "" ||
      height == undefined ||
      breedMethod == "" ||
      photo == "" ||
      horsePhotos[0] == "" ||
      description == ""
    ) {
      //   setErrorMessage("Please revise all required fields");
      if (name == "") {
        setNameError("Field Required");
      }
      if (gender == "") {
        setGenderError("Field Required");
      }
      if (breed == "") {
        setBreedError("Field Required");
      }
      if (age == "") {
        setAgeError("Field Required");
      }
      if (height == undefined) {
        setHeightError("Field Required");
      }
      if (breedMethod == "") {
        setBreedingMethodError("Field Required");
      }
      if (description == "") {
        setDescriptionError("Field Required");
      }
      if (photo == "") {
        setThumbnailError("Field Required");
      }
      if (horsePhotos.length == 0) {
        setPhotoError("Field Required");
      }
    } else {
      const storage = getStorage();
      let photoArray = [];
      const storageRef = ref(storage, `Horsephoto/${photo.name}`);
      uploadBytes(storageRef, photo).then(() => {
        getDownloadURL(storageRef).then((result) => {
          // eslint-disable-next-line
          if (horsePhotos[0] != "") {
            let uploadPromises = [];
            for (let i = 0; i < 3; i++) {
              let hName = name + i;
              if (horsePhotos[i]) {
                const storageR = ref(storage, `Horsephoto/${hName}`);
                let promise = uploadBytes(storageR, horsePhotos[i]).then(() => {
                  return getDownloadURL(storageR);
                });
                uploadPromises.push(promise);
              }
            }
            Promise.all(uploadPromises).then((results) => {
              results.forEach((res, index) => {
                photoArray[index] = res;
              });
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
                horseThumb: result,
                horsePhotos1: photoArray[0],
                horsePhotos2: photoArray[1],
                horsePhotos3: photoArray[2],
                showInfo: showInfo,
              });
            });
          } else {
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
              horseThumb: result,
              showInfo: showInfo,
            });
          }
        });
      });
      setShowSavePopUp(!showSavePopUp);
    }
  };

  const clickCancel = () => {
    setShowCancelPopUp(!showCancelPopUp);
  };

  const goBack = () => {
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
        <h2>Add Horse</h2>
        <div className="addHorse_cont">
          <div className="addHorse_cont_header">
            <p className="addHorse_cont_backButton" onClick={goBack}>
              <img src={BackButton} height="30px" width="30px" alt="Go Back" />
              Back
            </p>
          </div>
          <div className="addHorse_cont_inner">
            <div className="addHorse_cont_basics">
              <h3>ABOUT HORSE</h3>
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
                      setNameError("");
                      setName(e.target.value);
                    }}
                  ></input>
                  <p className="warning">{nameError}</p>
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
                        Gender
                      </option>
                      <option value="Stallion">Stallion</option>
                      <option value="Mare">Mare</option>
                    </select>
                    <p className="warning">{genderError}</p>
                  </div>
                  <div className="addHorse_cont_basics_details_breed">
                    <Breed
                      className="addHorse_cont_basics_details_breed_cont"
                      onChange={breedClick}
                    />
                    <p className="warning">{breedError}</p>
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
                      placeholder="Centimeters"
                      onChange={(e) => {
                        setHeight(e.target.value);
                      }}
                      onWheel={(e) => e.target.blur()}
                    ></input>
                    <p className="warning">{heightError}</p>
                  </div>
                  <div className="addHorse_cont_basics_details_color">
                    <Color
                      onChange={colorClick}
                      className="addHorse_cont_basics_details_color_cont"
                    />
                  </div>

                </div>
                <div className="addHorse_cont_basics_details_thirdRow">
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
                      onWheel={(e) => e.target.blur()}
                    ></input>
                    <p className="warning">{ageError}</p>
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
                        Breeding Method
                      </option>
                      <option value="Natural">Natural</option>
                      <option value="Artificial">Insemination</option>
                    </select>
                    <p className="warning">{breedingMethodError}</p>
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
              <div className="addHorse_cont_basics_upload">
                <div className="addHorse_cont_basics_upload_thumbnail">
                  <label>
                    Thumbnail{" "}
                    <span className="addHorse_cont_basics_details_name_gender_error">
                      *
                    </span>
                  </label>
                  {/*  <input
                  className="addHorse_cont_basics_upload_thumbnail_input"
                  type="file"
                  id="thumb"
                  name="thumb"
                  accept="image/*"
                  onChange={photoSeleceted}
                /> */}

                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      height="150px"
                      width="150px"
                    />
                  )}

                  <div
                    id="thumbBox"
                    className="addHorse_cont_basics_upload_thumbnail_content"
                  >
                    <p>Upload Thumbnail</p>
                    <div onClick={clickPlusOfThumb}>
                      <label for="thumb">
                        <img src={AddMedia} alt="not " />
                      </label>
                      <input
                        type="file"
                        accept="image/png, image/jpeg"
                        className="addHorse_cont_basics_upload_thumbnail_input"
                        name="newBackground"
                        id="thumb"
                        onChange={photoSeleceted}
                      />
                    </div>
                  </div>
                  <p className="warning">{thumbnailError}</p>
                </div>
                <div className="addHorse_cont_basics_upload_media">
                  <label>
                    Photos{" "}
                    <span className="addHorse_cont_basics_upload_media_error">
                      *
                    </span>
                  </label>
                  <div className="addHorse_cont_basics_upload_media_content">
                    <p>Up to 3 photos </p>
                    <div>
                      <label for="thumbforphotos">
                        <img alt="Add horse media" src={AddMedia} />
                      </label>
                      <input
                        type="file"
                        accept="image/png, image/jpeg"
                        className="addHorse_cont_basics_upload_media_content_image"
                        name="horsePhotos"
                        id="thumbforphotos"
                        onChange={clickPlus}
                      />
                    </div>
                  </div>
                  <p className="warning">{photoError}</p>
                </div>
              </div>

            </div>
            <div className="addHorse_cont_detailed">
              <div className="addHorse_cont_detailed_description">
                <label>
                  Description{" "}
                  <span className="addHorse_cont_basics_details_name_gender_error">
                    *
                  </span>
                </label>
                <div>
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
                  <p className="warning">{descriptionError}</p>
                </div>
                <div className="addHorse_cont_detailed_discipline">
                  <Discipline
                    className="addHorse_cont_detailed_discipline_content"
                    onChange={disciplineClick}
                  />
                </div>
                <div className="addHorse_cont_detailed_documentation">
                  <label>Documentation</label>
                  <div className="addHorse_cont_detailed_documentation_content">
                    <p>Up to 30MB</p>
                    <div>
                      <label for="thumbfordocuments">
                        <img alt="Add horse media" src={AddMedia} />
                      </label>
                      <input
                        type="file"
                        accept="image/png, image/jpeg, .pdf, .doc, .docx, .xls, .xlsx, text"
                        className="addHorse_cont_basics_upload_media_content_image"
                        name="horseDocuments"
                        id="thumbfordocuments"
                        onChange={clickPlus}
                      />
                    </div>
                  </div>
                </div>
                <p className="warning">{errorMessage}</p>
              </div>
            </div>
            <div className="addHorse_cont_aboutOwner">
              <h3>ABOUT OWNER</h3>
              <div className="addHorse_cont_aboutOwner_contactPreferences">
                <label>Contact Preferences</label>
                <div className="addHorse_cont_aboutOwner_contactPreferences_label">
                  <label className="addHorse_cont_aboutOwner_contactPreferences_label_Email" id="ownerEmailCont">
                    <input type="checkbox" id="ownerEmail"></input>
                    Email
                  </label>
                  <label className="addHorse_cont_aboutOwner_contactPreferences_label_Call">
                    <input type="checkbox" id="ownerCall"></input>
                    Call
                  </label>
                  <label className="addHorse_cont_aboutOwner_contactPreferences_label_Text">
                    <input type="checkbox" id="ownerText"></input>
                    Text
                  </label>
                </div>
              </div>
              <div className="addHorse_cont_aboutOwner_location">
                <label>
                  Location {""}
                  <span className="addHorse_cont_aboutOwner_location_error">
                    (you cannot change your location)
                  </span>
                </label>
                <input
                  required
                  name="ownerLocation"
                  value={location}
                  id="ownerLocation"
                  type="text"
                  placeholder="Location"
                /* onChange={(e) => {
                setLocation(e.sessionStorage.setItem("city", city));
              }} */
                ></input>
              </div>
              <div className="addHorse_cont_aboutOwner_displayHorse">
                {/* <label className="toggle-control"> */}
                Display horse on profile
                <input
                  type="checkbox"
                  onClick={(e) => {
                    setShowInfo(e.target.checked);
                  }}
                ></input>
                <span className="control"></span>
                {/* </label> */}
              </div>
              <p className="requiredFields_error">* required fields</p>
            </div>
            <div className="endButtons">
              <img
                alt="Save horse"
                className="endButtons_saveButton"
                src={SaveButton}
                onClick={clickSave}
              ></img>
              <img
                alt="Cancel adding horse"
                className="endButtons_cancelButton"
                src={CancelButton}
                onClick={clickCancel}
              ></img>
            </div>
          </div>
        </div>

        {showSavePopUp && (
          <PopUp
            title="Saved!"
            description="Your horse was successfully saved!"
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
      </div>
    </div>
  );
}
