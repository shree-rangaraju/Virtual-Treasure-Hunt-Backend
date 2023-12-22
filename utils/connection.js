const mongoose = require("mongoose");
require("dotenv").config();

const { URL } = process.env;

mongoose
  .connect(URL)
  .then(() => console.log("Connected to database successfully!"))
  .catch((err) => console.log(`Error: ${err}`));

module.exports = mongoose;
