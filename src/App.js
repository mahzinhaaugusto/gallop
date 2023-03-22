import React from "react";
import "./style.scss";
import { SplashScreen } from "./Pages/SplashScreen";
import { MainPage } from "./Pages/MainPage";
import Geocode from "react-geocode";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/storage";

console.log(process.env.REACT_APP_APIKEY);
Geocode.setApiKey(process.env.REACT_APP_APIKEY);
Geocode.setLocationType("ROOFTOP");
let city;

navigator.geolocation.getCurrentPosition(function (position) {
  /* console.log("Latitude is :", position.coords.latitude);
  console.log("Longitude is :", position.coords.longitude);  */

  Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
    (response) => {
      /* const address = response.results[0].formatted_address; */
      for (let i = 0; i < response.results[0].address_components.length; i++) {
        for (
          let j = 0;
          j < response.results[0].address_components[i].types.length;
          j++
        ) {
          switch (response.results[0].address_components[i].types[j]) {
            case "locality":
              city = response.results[0].address_components[i].long_name;
              break;
            /* case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
            case "country":
                country = response.results[0].address_components[i].long_name;
                break; */
          }
        }
      }
      console.log(city);
      sessionStorage.setItem("city", city);
    },
    (error) => {
      console.error(error);
    }
  );
});
const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getFirestore(app);
export function Main() {
  return (
    <>
      <MainPage />
    </>
  );
}

export function App() {
  return <SplashScreen />;
}
