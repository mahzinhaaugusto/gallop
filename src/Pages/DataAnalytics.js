import { Footer } from "../Components/Footer";
import { NavBar } from "../Components/NavBar";
import BackButton from "../icons/BackButton.svg";
import { BarChart, XAxis, YAxis, Tooltip, Bar, PieChart, Pie } from "recharts";
import { groupBy } from "lodash";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../server";


export function DataAnalytics() {
    const goBack = () => {
        console.log("working");
    }

    const [allHorsesBreed, setHorsesBreed] = useState([]);
    const [allHorsesGender, setHorsesGender] = useState([]);

    let arrBreed = [];
    let arrGender = [];

    useEffect(() => {
        axios.get(`${API_ENDPOINT}allhorses`)
            .then((response) => {
                const groupedBreed = groupBy(response.data, "breed");
                const groupedGender = groupBy(response.data, "gender");

                for (const key in groupedBreed) {
                    let breeds = {};
                    let i = 10;
                    let r = 100;
                    let g = 120;
                    let b = 130;
                    breeds.breed = key;
                    breeds.quantity = groupedBreed[key].length;
                    breeds.color = `rgb(${r}, ${g}, ${b})`;
                    arrBreed.push(breeds);
                }

                for (const key in groupedGender) {
                    let genders = {};
                    genders.gender = key;
                    genders.quantity = groupedGender[key].length;
                    arrGender.push(genders);
                }

                setHorsesBreed(arrBreed);
                setHorsesGender(arrGender);
            })
    }, []);
    console.log(allHorsesBreed);
    console.log(allHorsesGender);

    return (
        <div className="dataAnalytics">
            <NavBar />
            <div className="dataAnalytics_cont_master">
                <h2 className="dataAnalytics_cont_master_title">Get to Know Our Horses!</h2>
                <div className="dataAnalytics_cont_master_inner">
                    <div className="dataAnalytics_cont">
                        <div className="dataAnalytics_cont_backBtn">
                            <p className="addHorse_cont_backButton" onClick={goBack}>
                                <img src={BackButton} height="30px" width="30px" alt="Go Back" />
                                Back
                            </p>
                        </div>
                        <div className="dataAnalytics_cont_content">
                            <div className="dataAnalytics_cont_title">
                                <h1 className="dataAnalytics_cont_title_text">Horses in Gallop</h1>
                            </div>
                            <div className="dataAnalytics_cont_mainContent">
                                <div className="dataAnalytics_cont_mainContent_breed">
                                    <h2 className="dataAnalytics_cont_mainContent_breed_title">All Around the World</h2>
                                    <p className="dataAnalytics_cont_mainContent_breed_content">In Gallop, there are many different breeds of horses. Discover the top breeds of horses on Gallop and explore where they are originally from around the world.</p>
                                    <div className="dataAnalytics_cont_mainContent_breed_chart">
                                        <BarChart width={730} height={250} data={allHorsesBreed}>
                                            <XAxis dataKey="breed" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="quantity" fill={allHorsesBreed[0].color} />
                                        </BarChart>
                                    </div>
                                </div>
                                <div className="dataAnalytics_cont_mainContent_gender">
                                    <h2 className="dataAnalytics_cont_mainContent_gender_title">Gender</h2>
                                    <p className="dataAnalytics_cont_mainContent_gender_content">Those are the Stallions and Mare on Gallop. Easily track the number of stallions and mares by viewing the percentage of males and females listed on our plataform.</p>
                                    <div className="dataAnalytics_cont_mainContent_gender_chart">
                                        <PieChart width={730} height={250}>
                                            <Tooltip />
                                            <Pie data={allHorsesGender} dataKey="quantity" nameKey="gender" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" label />
                                        </PieChart>
                                    </div>
                                </div>
                                <div className="dataAnalytics_cont_mainContent_liked">
                                    <h2 className="dataAnalytics_cont_mainContent_liked_title">Most Loved</h2>
                                    <p className="dataAnalytics_cont_mainContent_liked_content">Check out the most popular horses on Gallop! Our “Most Loved” charts shows which horses are trending on our website, so you can discover the best breeding options that matches our goals.</p>
                                    <div className="dataAnalytics_cont_mainContent_liked_chart">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}