const User = require("../models/userProfile");

const adminController = async (req, res) => {
  try {
    const data = await User.find().sort({ totalDuration: 1 }).exec();
    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = adminController;
