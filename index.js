const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { start } = require("repl");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(cors());
app.set("views", path.join(__dirname, "/views"));

mongoose
  .connect(
    "mongodb+srv://XArchenon:rmQysps59bNiQbrf@treasurehunt.lik4hzz.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to database successfully!"))
  .catch((err) => console.log(`Error: ${err}`));

const userProfile = new mongoose.Schema({
  name: String,
  rollno: String,
  levels: {
    level1: Boolean,
    level2: Boolean,
    level3: Boolean,
    level4: Boolean,
    level5: Boolean,
    level6: Boolean,
    level7: Boolean,
    level8: Boolean,
  },
  duration: {
    level1: Date,
    level2: Date,
    level3: Date,
    level4: Date,
    level5: Date,
    level6: Date,
    level7: Date,
    level8: Date,
  },
  start: Date,
  end: Date,
  totalDuration: Date,
});

const user = mongoose.model("user", userProfile);

app.get("/", (req, res) => {
  res.status(200).send("Acknowledged");
});

app.post("/register", async (req, res) => {
  const { userName, rollNumber } = req.body;
  levels = ["E7a3", "E6e3", "E2622", "E463", "E24a2", "E25e2", "E523", "E163"];
  const userProfile = { name: userName, rollno: rollNumber };
  try {
    const data = await user.find(userProfile).exec();
    if (data.length > 0) {
      const levelDetails = data[0].levels;
      let levelURL = "";
      for (let i = 1; i <= 8; i++) {
        if (levelDetails[`level${i}`] == false) {
          levelURL = levels[i - 1];
          break;
        } else {
          levelURL = "E163";
        }
      }
      res.status(200).send(levelURL);
    } else {
      const userRegister = new user({
        name: userName,
        rollno: rollNumber,
        levels: {
          level1: false,
          level2: false,
          level3: false,
          level4: false,
          level5: false,
          level6: false,
          level7: false,
          level8: false,
        },
        duration: {
          level1: null,
          level2: null,
          level3: null,
          level4: null,
          level5: null,
          level6: null,
          level7: null,
          level8: null,
        },
        start: new Date(),
        end: null,
        totalDuration: null,
      });
      await userRegister.save();
      console.log(`${userName} Registered Successfully!`);
      res.status(200).send("E7a3");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/admin", async (req, res) => {
  try {
    const data = await user.find().sort({ totalDuration: 1 }).exec();
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/passCode", (req, res) => {
  const { level } = req.body;
  let response = "";
  switch (level) {
    case 4:
      response = "John, a humble worker, found gold in a dark mine.";
      break;
    case 5:
      response = "A mysterious old book on the dusty shelf.";
      break;
    case 6:
      response = "XArchenon";
      break;
    case 8:
      response = "5111605";
      break;
  }
  res.status(200).send(response);
});

app.post("/updateLevel", async (req, res) => {
  const { level, userName, rollNumber } = req.body;
  const update = {
    $set: {
      [`levels.level${level}`]: true,
      [`duration.level${level}`]: new Date(),
    },
  };
  const userProfile = {
    name: userName,
    rollno: rollNumber,
  };
  try {
    await user.findOneAndUpdate(userProfile, update).exec();
    res.status(200).send("Acknowledged");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/endGame", async (req, res) => {
  const { userName, rollNumber } = req.body;
  const userProfile = {
    name: userName,
    rollno: rollNumber,
  };
  try {
    const startTime = await user.findOne(userProfile);
    const endTime = new Date();
    const totalDuration = new Date(endTime - startTime.start);
    const update = {
      $set: {
        end: new Date(),
        totalDuration: new Date(totalDuration),
      },
    };
    await user.findOneAndUpdate(userProfile, update).exec();
    res.status(200).send("Acknowledged");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
