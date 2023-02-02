const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
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
const db = mysql.createPool({
  host: "test.cukstmmatbd1.us-west-2.rds.amazonaws.com",
  user: "madhu",
  password: "hcoe2071",
  database: "gallop",
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
