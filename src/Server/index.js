//

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect =
    "SELECT email,userPassword,ID,firstName,lastName,phoneNumber,website,bio from userinfo;";
  db.query(sqlSelect, (er, re) => {
    console.log(re);
    res.send(re);
  });
});

app.post("/api/insert", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userPassword = req.body.userPassword;
  const Email = req.body.Email;
  const Address = req.body.Address;
  const Website = req.body.Website;
  const phoneNumber = req.body.phoneNumber;
  const bio =
    "Hey there!!! This is the personal space for you to tell about yourself. To write here please go to edit profile.";

  const sqlInsert =
    "INSERT INTO userinfo(firstName,lastName,userPassword,email,address,website,phoneNumber,bio) VALUES (?,?,?,?,?,?,?,?); ";
  db.query(
    sqlInsert,
    [
      firstName,
      lastName,
      userPassword,
      Email,
      Address,
      Website,
      phoneNumber,
      bio,
    ],
    (err, result) => {
      console.log(result);
    }
  );
});

app.post("/api/insertHorse", (req, res) => {
  const horseName = req.body.name;
  const horseGender = req.body.gender;
  const horseBreed = req.body.breed;
  const horseAge = req.body.age;
  const horseHeight = req.body.height;
  const horseColor = req.body.color;
  const breedMethod = req.body.breedMethod;
  const price = req.body.price;
  const description = req.body.description;
  const location = req.body.location;
  const skills = req.body.discipline;
  const uid = req.body.uid;

  const sqlInsert =
    "INSERT INTO horseinfo(horseName,horseAge,description,breedingMethod,skills,color,gender,breed,price,height,location,ID) VALUES (?,?,?,?,?,?,?,?,?,?,?,?); ";
  db.query(
    sqlInsert,
    [
      horseName,
      horseAge,
      description,
      breedMethod,
      skills,
      horseColor,
      horseGender,
      horseBreed,
      price,
      horseHeight,
      location,
      uid,
    ],
    (err, result) => {
      console.log(result);
    }
  );
});

app.listen(3002, () => {
  console.log("running on port 3002");
});
