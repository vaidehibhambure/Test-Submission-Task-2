const express = require("express");
const server = express();
const app = require("./app.js")
server.use(express.json());
server.get(express.json()); // to handle json
app.listen(3000, function () {
  console.log("started listeing on localhost:3000 ");
});
