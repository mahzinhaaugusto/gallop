
export function HorseDetail(){

const HorseName = "Horse1"
const CityName = "Vancouver"
    return(
        <div className="horseDetailCont">
            <div className="horseDetailCont_image">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy3GEgxzV3Y4CiLfi21bGS62Y7X4cnAwG8HnSS8RKu&s" height="400px" width="400px"  alt="not found"/>
            </div>
            <div className="horseDetailCont_information">
        <h1>{HorseName}</h1>
        <h2>{CityName}</h2>

            </div>
        
        </div>
    );
}