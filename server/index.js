const express = require("express");
const writeData = require("./getData.js");

const app = express();

writeData();

app.use(express.static("./dist"));

app.listen(3300, () => {
  console.log("http://localhost:3300/ start");
});
