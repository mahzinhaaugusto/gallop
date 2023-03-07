import Plus from "../icons/Plus.svg";
import Favourites from "../icons/Favourites.svg";
import "../styles/pgs/AddHorse.scss";
// Im using the Favorites icon as a placeholder for future icons

export function AddHorse() {
  const clickPlus = () => {
    console.log("works");
  };
  const clickSave = () => {
    console.log("works");
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
          <input required name="horseName" id="horseName" type="text"></input>
          <div className="addHorse_cont_basics_details">
            <h4>Gender *</h4>
            <select required name="gender" id="gender">
              <option value="" disabled selected>
                Select
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <h4>Breed *</h4>
            <select required name="breed" id="breed">
              <option value="" disabled selected>
                Select
              </option>
              <option value="x">X</option>
              <option value="y">Y</option>
            </select>
            <h4>Age (years) *</h4>
            <input required name="age" id="age" type="number"></input>
            <h4>Height (hh) *</h4>
            <input required name="height" id="height" type="number"></input>
            <h4>Color</h4>
            <select name="color" id="color">
              <option value="" disabled selected>
                Select
              </option>
              <option value="x">X</option>
              <option value="y">Y</option>
            </select>
            <h4>Breeding Method *</h4>
            <select required name="breedingMethod" id="breedingMethod">
              <option value="" disabled selected>
                Select
              </option>
              <option value="x">X</option>
              <option value="y">Y</option>
            </select>
            <h4>Price</h4>
            <input name="price" id="price" type="number"></input>
          </div>
          <div className="addHorse_cont_basics_upload">
            <div className="addHorse_cont_basics_upload_thumbnail">
              <h4>Thumbnail</h4>
              <textarea name="thumbnail" id="thumbnail" cols="50" rows="6">
                Upload Thumbnail
              </textarea>
              <div onClick={clickPlus}>
                <img src={Plus} />
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
            ></textarea>
            <h4>Disciplines</h4>
            <select name="disciplines" id="disciplines">
              <option value="" disabled selected>
                Select
              </option>
              <option value="x">X</option>
              <option value="y">Y</option>
            </select>
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
    </div>
  );
}
