const mongoose = require("../utils/connection");

const generateLevelFields = () => {
  const levels = {};
  for (let i = 1; i <= 8; i++) {
    levels[`level${i}`] = Boolean;
  }
  return levels;
};

const generateDurationFields = () => {
  const durations = {};
  for (let i = 1; i <= 8; i++) {
    durations[`level${i}`] = Date;
  }
  return durations;
};

const userProfileSchema = new mongoose.Schema({
  name: String,
  rollno: String,
  levels: generateLevelFields(),
  duration: generateDurationFields(),
  start: Date,
  end: Date,
  totalDuration: Date,
});

const User = mongoose.model("User", userProfileSchema);

module.exports = User;
