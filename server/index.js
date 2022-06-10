const express = require("express");

const app = express();

app.use(express.static("./dist"));

app.listen(3300, () => {
  console.log("http://localhost:3300/ start");
});
