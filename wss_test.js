"use strict"

var path = require("path")
var fs = require("fs")
var mqtt = require("mqtt")
var Url = require("url")

var HOSTNAME = "wss://10.238.100.170/mqtt"
var PORT = 8084
var CLIENT_ID = "wss_test"

var USERNAME = "root"
var PASSWORD = "12345"

var CERT = fs.readFileSync("client.cert")
var KEY = fs.readFileSync("client-key.pem")

var url = Url.parse(HOSTNAME)

var options = {
    servername: url.hostname,
    username: USERNAME,
    password: PASSWORD,
    clientId: CLIENT_ID,
    port: PORT,
    cert: CERT,
    key: KEY,
    resubscribe: false,
    rejectUnauthorized: false
}


var client = mqtt.connect(url, options)

client.on("connect", function (packet) {
    console.log("connected")
})

client.on('error', function (err) {
    console.log(err)
})

client.on("message", function (topic, message) {
    console.log(message)
})

client.subscribe("messages")
client.publish("messages", "Current time is: " + new Date())


setTimeout(function () {
    console.log('Blah blah blah blah extra-blah');
}, 30000)
