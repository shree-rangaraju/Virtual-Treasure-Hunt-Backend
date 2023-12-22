const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const routes = require("./routes/router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
