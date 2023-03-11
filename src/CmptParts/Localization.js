export function Localization() {
    let cityInfo = sessionStorage.getItem("city");
    /*     Geocode.setApiKey("AIzaSyASozGLOD6wCuZssYOYk63BYfUJGdct_1M");
        Geocode.setLocationType("ROOFTOP");
        let city;
    
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude); 
    
            Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                (response) => {
                    const address = response.results[0].formatted_address;
                    let state, country;
                    for (let i = 0; i < response.results[0].address_components.length; i++) {
                    for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
                        switch (response.results[0].address_components[i].types[j]) {
                        case "locality":
                            city = response.results[0].address_components[i].long_name;
                            break;
                        case "administrative_area_level_1":
                            state = response.results[0].address_components[i].long_name;
                            break;
                        case "country":
                            country = response.results[0].address_components[i].long_name;
                            break;
                        }
                    }
                    }
                    console.log(city, state, country);
                    console.log(address);
                },
                (error) => {
                    console.error(error);
                }
            );
        }); */

    return (
        <div className="filter_cont_localization">
            <label className="filter_cont_localization_label">Location</label>
            <span className='filter_cont_localization_info'><strong>{cityInfo}</strong></span>
        </div>
    )
}