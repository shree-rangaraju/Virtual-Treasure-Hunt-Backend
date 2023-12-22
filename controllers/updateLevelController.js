const User = require("../models/userProfile");

const updateLevelController = async (req, res) => {
  try {
    const { level, userName, rollNumber } = req.body;

    const userProfile = {
      name: userName,
      rollno: rollNumber,
    };

    const update = {
      $set: {
        [`levels.level${level}`]: true,
        [`duration.level${level}`]: new Date(),
      },
    };

    await User.findOneAndUpdate(userProfile, update).exec();

    res.status(200).send("Acknowledged");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = updateLevelController;
