const mongoose = require("../utils/connection");
const User = require("../models/userProfile");

const registerUser = async (req, res) => {
  const { userName, rollNumber } = req.body;
  const levels = [
    "E7a3",
    "E6e3",
    "E2622",
    "E463",
    "E24a2",
    "E25e2",
    "E523",
    "E163",
  ];
  const userProfile = { name: userName, rollno: rollNumber };

  try {
    const existingUser = await User.findOne(userProfile).exec();

    if (existingUser) {
      const levelDetails = existingUser.levels;
      const levelURL =
        levels.find((level, i) => !levelDetails[`level${i + 1}`]) || "E163";
      res.status(200).send(levelURL);
    } else {
      const newUser = new User({
        name: userName,
        rollno: rollNumber,
        levels: Object.fromEntries(
          levels.map((_, i) => [`level${i + 1}`, false])
        ),
        duration: Object.fromEntries(
          levels.map((_, i) => [`level${i + 1}`, null])
        ),
        start: new Date(),
      });

      await newUser.save();
      console.log(`${userName} Registered Successfully!`);
      res.status(200).send("E7a3");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = registerUser;
