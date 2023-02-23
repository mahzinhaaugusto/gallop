import Phone from "../icons/Phone.svg";
import ProfilePic from "../icons/ProfilePic.svg";
import Favourites from "../icons/Favourites.svg";

export function HorseDetail() {
    const goBack = () => { console.log("works") }
    const moreClick = () => { console.log("works") }

    const HorseObj = {
        name: "Madhu",
        location: "Vancouver",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy3GEgxzV3Y4CiLfi21bGS62Y7X4cnAwG8HnSS8RKu&s",
        height: "15ft",
        age: 30,
        color: "Black",
        gender: "Mare",
        breedingMethod: "Naturally",
        disciplines: "Race Horse",
        ownerName: "Mom",
        ownerLocation: "Home",
        webpage: "www.idk.com",
        email: "horse@gmail.com",
        phone: 40028922
    }

    return (
        <div className="horseDetail">
            <h3>Horse Detail</h3>

            <div className="horseDetail_cont">
                <div onClick={goBack}><img src={Favourites} height="30px" width="30px" alt="Go Back" /></div>
                <div className="horseDetail_cont_one">
                    <div className="horseDetail_cont_image">
                        <img src={HorseObj.img} height="400px" width="400px" alt="Horse Image" />
                        <img src={Favourites} height="10px" width="10px" alt="Favourites Icon" />
                        <img src={Favourites} height="10px" width="10px" alt="Carroussel" />
                        <img src={Favourites} height="10px" width="10px" alt="Zoom" />
                    </div>
                    <div className="horseDetail_cont_information">
                        <div className="horseDetail_cont_information_heading">
                            <div className="horseDetail_cont_information_heading_title">
                                <h1>{HorseObj.name}</h1>
                                <img src={Phone} height="50px" width="50px" alt="button phone"></img>
                            </div>
                            <div className="horseDetail_cont_information_heading_location">
                                <img src={Favourites} height="10px" width="10px" alt="Location" />
                                <p>{HorseObj.location}</p>
                            </div>
                        </div>
                        <div className="horseDetail_cont_information_body">
                            <div className="horseDetail_cont_information_body_lineOne">
                                <div className="horseDetail_cont_information_body_lineOne_height">
                                    <h3>Height</h3>
                                    <p>{HorseObj.height}</p>
                                </div>
                                <div className="horseDetail_cont_information_body_lineOne_age">
                                    <h3>Age</h3>
                                    <p>{HorseObj.age}</p>
                                </div>
                            </div>
                            <div className="horseDetail_cont_information_body_lineTwo">
                                <div className="horseDetail_cont_information_body_lineTwo_color">
                                    <h3>Color</h3>
                                    <p>{HorseObj.color}</p>
                                </div>
                                <div className="horseDetail_cont_information_body_lineTwo_gender">
                                    <h3>Gender</h3>
                                    <p>{HorseObj.gender}</p>
                                </div>
                            </div>
                            <div className="horseDetail_cont_information_body_lineThree">
                                <div className="horseDetail_cont_information_body_lineThree_breedingMethod">
                                    <h3>Breeding Method</h3>
                                    <p>{HorseObj.breedingMethod}</p>
                                </div>
                                <div className="horseDetail_cont_information_body_lineOne_age">
                                    <h3>Disciplines</h3>
                                    <p>{HorseObj.disciplines}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div classname="horseDetail_cont_two">
                    <div classname="horseDetail_cont_description">
                        <h4>Horse Description</h4>
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                    </div>
                </div>
                <div classname="horseDetail_cont_three">

                    <div classname="horseDetail_cont_contactInfo_heading">
                        <h4>Contact</h4>
                        <img src={ProfilePic} height="150px" width="150px" alt="Owner's Profile Picture"></img>
                    </div>
                    <div classname="horseDetail_cont_contactInfo_owner">
                        <h3>{HorseObj.ownerName}</h3>
                        <img src={Favourites} height="10px" width="10px" alt="Location Icon" />
                        <p>{HorseObj.ownerLocation}</p>
                        <img src={Favourites} height="10px" width="10px" alt="WebPage Icon" />
                        <p>{HorseObj.webpage}</p>
                    </div>
                    <div classname="horseDetail_cont_contactInfo_contactForms">
                        <h4>Contact Forms</h4>
                        <img src={ProfilePic} height="50px" width="50px" alt="Email Button"></img>
                        <img src={ProfilePic} height="50px" width="50px" alt="Phone Button"></img>
                    </div>
                    <div className="horseDetail_cont_contactInfo_moreFromOwner">
                        <button onClick={moreClick}>More from the owner</button>
                    </div>

                </div>
            </div>
        </div>
    );
}