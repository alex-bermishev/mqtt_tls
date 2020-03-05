"use strict"

const express = require("express");
const https = require("https");
const fs = require("fs");
const port = 3000;

var cert = fs.readFileSync("cert/parsec.cert");
var key = fs.readFileSync("cert/parsec.key");

var options = {
    host: "0.0.0.0",
    cert: cert,
    key: key
};

var app = express()
app.use(express.static("cert"))
app.use(express.static("client"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

var server = https.createServer(options, app);

server.listen(port, () => {
    console.log("server starting on port : " + port)
});