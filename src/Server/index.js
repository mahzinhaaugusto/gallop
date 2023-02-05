const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();
// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "Hcoe2071@",
//   database: "ap",
// });

// app.get("/", (req, res) => {
//   const sqlInsert =
//     "INSERT INTO userinfo(userName,userPassword) VALUES('eden','yoyo345');";
//   db.query(sqlInsert, (err, result) => {
//     res.send("hello madhu daik");
//   });
// });
//yaroslav
console.log(process.env.USER_NAME);
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
  const sqlSelect = "SELECT userName,userPassword from userinfo;";
  db.query(sqlSelect, (er, re) => {
    res.send(re);
  });
});

app.post("/api/insert", (req, res) => {
  const userName = req.body.userName;
  const userPassword = req.body.userPassword;
  const Email = req.body.Email;
  const Address = req.body.Address;
  const Website = req.body.Website;
  const phoneNumber = req.body.phoneNumber;

  const sqlInsert =
    "INSERT INTO userinfo(userName,userPassword,email,address,website,phoneNumber) VALUES (?,?,?,?,?,?); ";
  db.query(
    sqlInsert,
    [userName, userPassword, Email, Address, Website, phoneNumber],
    (err, result) => {
      console.log(result);
    }
  );
});

app.listen(3002, () => {
  console.log("running on port 3002");
});
