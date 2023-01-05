const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({origin: true}));

app.get("/", (req, res) =>{
  return res.status(200).send("hello, it works");
});

app.post("/", (req, res) =>{
  const nameSupplied = req.body.name;
  console.log("nameSupplied is", nameSupplied);
  res.send(nameSupplied);
});

// http request 1

exports.app = functions
    .region("europe-west2")
    .https.onRequest(app);
