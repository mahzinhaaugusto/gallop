const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();
let apikey = process.env.APIKEY;
const OAuth2 = google.auth.OAuth2;
const UIDGenerator = require("uid-generator");
const uidgen = new UIDGenerator();
const axios = require("axios");

const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENTID,
  process.env.OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});
const accessToken = oauth2Client.getAccessToken();

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
  const sqlSelect = "SELECT * from userinfo;";
  db.query(sqlSelect, (er, re) => {
    // console.log(re);
    res.send(re);
  });
});

app.get("/api/checkemail", (req, res) => {
  const { email } = req.query;
  const sqlCheckEmail =
    "SELECT COUNT (*) AS count FROM userinfo WHERE email = ?;";
  db.query(sqlCheckEmail, [email], (er, re) => {
    const count = re[0].count;
    const emailExists = count > 0;
    return res.json({ emailExists });
  });
});

app.get("/api/priceorder", (req, res) => {
  const { sql } = req.query;
  // console.log(sql);
  db.query(sql, (er, re) => {
    // console.log(re);
    res.send(re);
  });
});

app.post("/api/delete", (req, res) => {
  const id = req.body.id;
  console.log(id);
  const sqlDeleteHorse = "DELETE FROM horseinfo WHERE ID = ?;";
  const sqlDeleteUser = "DELETE FROM userinfo WHERE ID = ?;";
  db.query(sqlDeleteHorse, [id], (er, re) => {
    console.log(re);
  });
  db.query(sqlDeleteUser, [id], (er, re) => {
    console.log(re);
  });
});

app.post("/api/deletefav", (req, res) => {
  const id = req.body.id;
  const deleteOne = "delete from favoritehorses where favoriteid = ?;";
  const sqlUpdateLikes =
    "UPDATE horseinfo SET likeNumbers = (SELECT COUNT(isFavorite)FROM favoritehorses WHERE horseinfo.horseID = favoritehorses.horseID);";
  db.query(deleteOne, [id], (er, re) => {
    console.log(re);
  });
  db.query(sqlUpdateLikes, (err, result) => {
    console.log(result);
    res.send(result);
  });
});

app.get("/api/allhorses", (req, res) => {
  const selectAll = "SELECT * FROM horseinfo;";
  db.query(selectAll, (er, re) => {
    // console.log(re);
    res.send(re);
  });
});

app.get("/api/favhorses", (req, res) => {
  const selectAll = "SELECT * FROM favoritehorses;";
  db.query(selectAll, (er, re) => {
    // console.log(re);
    res.send(re);
  });
});

app.post("/api/editprofile", (req, res) => {
  const profileInfo = req.body.profileEdit;

  console.log(profileInfo);
  const id = req.body.id;
  const sqlEdit =
    "UPDATE userinfo SET bio = ?, firstName = ?, lastName = ?, phoneNumber = ?, email = ?, address = ?, website = ?, userPassword = ?, userPhoto = ?, backgroundPhoto = ?  WHERE ID =  ?";
  db.query(
    sqlEdit,
    [
      profileInfo.bioContent,
      profileInfo.firstName,
      profileInfo.lastName,
      profileInfo.phoneNumber,
      profileInfo.email,
      profileInfo.address,
      profileInfo.website,
      profileInfo.password,
      profileInfo.profilePhoto,
      profileInfo.background,
      id,
    ],
    (err, result) => {
      console.log(err);
    }
  );
});

app.post("/api/insert", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userPassword = req.body.userPassword;
  const Email = req.body.Email;
  const Address = req.body.Address;
  const Website = req.body.Website;
  const phoneNumber = req.body.phoneNumber;
  const location = req.body.location1;
  const bio =
    "Hey there!!! This is the personal space for you to tell about yourself. To write here please go to edit profile.";
  const userPhoto = req.body.userPhoto;
  const backgroundPhoto =
    "https://firebasestorage.googleapis.com/v0/b/app1-504b3.appspot.com/o/gallop%2Fhorse.png?alt=media&token=61dbac87-df8f-491a-a358-25bffe79eb6b";

  const sqlInsert =
    "INSERT INTO userinfo(firstName,lastName,userPassword,email,address,website,phoneNumber,bio,userPhoto,backgroundPhoto,location) VALUES (?,?,?,?,?,?,?,?,?,?,?); ";
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
      userPhoto,
      backgroundPhoto,
      location,
    ],
    (err, result) => {
      // console.log(result);
      res.send(result);
    }
  );
});

app.post("/api/edithorse", (req, res) => {
  const horseName = req.body.name;
  const horseAge = req.body.age;
  const breedingMethod = req.body.breedMethod;
  const skills = req.body.discipline;
  const color = req.body.color;
  const gender = req.body.gender;
  const breed = req.body.breed;
  const price = req.body.price;
  const height = req.body.height;
  const description = req.body.description;
  const horseID = req.body.horseID;
  console.log(price);

  const sqlUpdateHorse =
    "UPDATE horseinfo SET horseName = ?, horseAge = ?, breedingMethod = ?, skills = ?, color = ?, gender = ?, breed = ?, price = ?, height = ?, description = ? WHERE horseID = ?;";

  db.query(
    sqlUpdateHorse,
    [
      horseName,
      horseAge,
      breedingMethod,
      skills,
      color,
      gender,
      breed,
      price,
      height,
      description,
      horseID,
    ],
    (err, res) => {
      console.log(err);
      // res.send(res);
    }
  );
});

app.post("/api/addfavorite", (req, res) => {
  const horseid = req.body.horseid;
  const uid = req.body.uid;
  const sqlInsert =
    "insert into favoritehorses(id,horseID,isFavorite) values (?,?,?);";
  const sqlUpdateLikes =
    "UPDATE horseinfo SET likeNumbers = (SELECT COUNT(isFavorite)FROM favoritehorses WHERE horseinfo.horseID = favoritehorses.horseID);";
  db.query(sqlInsert, [uid, horseid, 1]),
    (err, result) => {
      console.log(result);
    };
  db.query(sqlUpdateLikes, (err, result) => {
    console.log(result);
    res.send(result);
  });
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
  const horseThumb = req.body.horseThumb;
  const horsePhotos1 = req.body.horsePhotos1;
  const horsePhotos2 = req.body.horsePhotos2;
  const horsePhotos3 = req.body.horsePhotos3;
  const showInfo = req.body.showInfo;

  console.log(horsePhotos1);

  const sqlInsert =
    "INSERT INTO horseinfo(horseName,horseAge,description,breedingMethod,skills,color,gender,breed,price,height,location,ID,thumbnail,photo1,photo2,photo3,likeNumbers,showInfo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?); ";
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
      horseThumb,
      horsePhotos1,
      horsePhotos2,
      horsePhotos3,
      0,
      showInfo,
    ],
    (err, result) => {
      console.log(result);
    }
  );
});

app.post("/api/deletehorse", (req, res) => {
  const id = req.body.id;
  // console.log(id);
  const sqlDelete = "DELETE FROM horseinfo WHERE horseID = ?;";
  db.query(sqlDelete, [id], (er, re) => {
    console.log(re);
  });
});

app.post("/api/forgotpassword", (req, res) => {
  const email = req.body.email;
  const uid = uidgen.generateSync();
  // console.log(uid);

  const sqlFindEmail = "SELECT * FROM userinfo WHERE email = ?;";

  const sqlIncludeToken = "UPDATE userinfo SET token = ? WHERE email = ?;";

  db.query(sqlIncludeToken, [uid, email], (er, re) => {
    // console.log(uid);
    // console.log(email);
  });

  db.query(sqlFindEmail, [email], (er, re) => {
    // console.log(email);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_EMAIL_ACCOUNT,
        pass: process.env.GOOGLE_EMAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: "thegallopapp@gmail.com",
      to: `${email}`,
      subject: "Forgot Password Requested - Gallop",
      text:
        "You are receiving this email because there was a request for resetting the password for your account.\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process.\n\n" +
        `http://localhost:3000/reset-password\n\n` +
        `Please provide the following token to allow you to make changes to your password: ${uid}\n\n` +
        "If you did not request this, please ignore this email and your password remain unchanged.\n\n" +
        "Cheers from Gallop\n\n",
    };

    transporter.sendMail(mailOptions, (er, re) => {
      if (er) {
        console.error("Error: ", er);
      } else {
        console.log("Response: ", re);
        res.status(200).json("Recovery email sent");
      }
    });
  });
});

app.post("/api/reset", (req, res) => {
  const token = req.body.token;
  // console.log(token);
  const password = req.body.userPassword;
  // console.log(password);
  const sqlReset = "UPDATE userinfo SET userPassword = ?  WHERE token = ?";
  db.query(sqlReset, [password, token], (err, result) => {
    console.log(err);
  });
});

app.get("/api/auth", async (req, res) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  const googleUrl = "https://www.googleapis.com/oauth2/v3/userinfo";

  try {
    const response = await axios.get(googleUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userInfo = response.data;
    console.log(userInfo);
  } catch (error) {
    console.log(error.message);
  }
});

// app.post("/api/updatebackground", (req, res) => {
//   const backgroundPhoto = req.body.backgroundPhoto;
//   const id = req.body.id;
//   const sqlBackground = "UPDATE userinfo SET backgroundPhoto = ? WHERE ID = ?;"
//   db.query(sqlBackground, [
//     backgroundPhoto,
//     id
//   ], (err, result) => {
//     console.log(result);
//   });
// });

app.listen(3002, () => {
  console.log("running on port 3002");
});
