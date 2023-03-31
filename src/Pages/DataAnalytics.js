import { Footer } from "../Components/Footer";
import { NavBar } from "../Components/NavBar";
// import BackButton from "../icons/BackButton.svg";
import { BarChart, XAxis, YAxis, Tooltip, Bar, PieChart, Pie } from "recharts";
import { groupBy } from "lodash";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINT } from "../server";


export function DataAnalytics() {
    // const goBack = () => {
    //     console.log("working");
    // }

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
                    // let i = 10;
                    // let r = 100;
                    // let g = 120;
                    // let b = 130;
                    breeds.breed = key;
                    breeds.quantity = groupedBreed[key].length;
                    // breeds.color = `rgb(${r}, ${g}, ${b})`;
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
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    // console.log(allHorsesBreed);
    // console.log(allHorsesGender);

    return (
        <div className="dataAnalytics">
            <NavBar />
            <div className="dataAnalytics_cont_master">
                <h2 className="dataAnalytics_cont_master_title">Get to Know Our Horses!</h2>
                <div className="dataAnalytics_cont_master_inner">
                    <div className="dataAnalytics_cont">
                        {/* <div className="dataAnalytics_cont_backBtn">
                            <p className="addHorse_cont_backButton" onClick={goBack}>
                                <img src={BackButton} height="30px" width="30px" alt="Go Back" />
                                Back
                            </p>
                        </div> */}
                        <div className="dataAnalytics_cont_content">
                            <div className="dataAnalytics_cont_title">
                                <h1 className="dataAnalytics_cont_title_text">Horses in Gallop</h1>
                                <hr />
                            </div>
                            <div className="dataAnalytics_cont_mainContent">
                                <div className="dataAnalytics_cont_mainContent_breed">
                                    <h3 className="dataAnalytics_cont_mainContent_breed_title">All Around the World</h3>
                                    <p className="dataAnalytics_cont_mainContent_breed_content">In Gallop, there are many different breeds of horses. Discover the top breeds of horses on Gallop and explore where they are originally from around the world.</p>
                                    <div className="dataAnalytics_cont_mainContent_breed_chart">
                                        <BarChart className="barChart" width={1800} height={250} data={allHorsesBreed} >
                                            <XAxis dataKey="breed" interval={0} tick={{ fontSize: 11, fontFamily: "sans-serif" }} />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="quantity" fill="#75B367" barSize={25} />
                                        </BarChart>
                                    </div>
                                </div>
                                <hr />
                                <div className="dataAnalytics_cont_mainContent_gender">
                                    <h3 className="dataAnalytics_cont_mainContent_gender_title">Gender</h3>
                                    <p className="dataAnalytics_cont_mainContent_gender_content">Those are the Stallions and Mare on Gallop. Easily track the number of stallions and mares by viewing the percentage of males and females listed on our plataform.</p>
                                    <div className="dataAnalytics_cont_mainContent_gender_chart">
                                        <PieChart className="pieChart" width={250} height={250}>
                                            <Tooltip />
                                            <Pie data={allHorsesGender} dataKey="quantity" nameKey="gender" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#5A5A5F" label />
                                        </PieChart>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div >
    )
}

// function CustomizedAxisTick() {
//     const { x, y, payload } = this.props;

//     return (
//         <g transform={`translate(${x},${y})`}>
//             <text x={0} y={0} dy={16} textAnchor="end" fill="#75B367" transform="rotate(-35)">
//                 {payload.value}
//             </text>
//         </g>
//     );
// }