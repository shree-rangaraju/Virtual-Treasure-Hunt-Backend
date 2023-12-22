const User = require("../models/userProfile");

const endGameController = async (req, res) => {
  try {
    const { userName, rollNumber } = req.body;

    const userProfile = {
      name: userName,
      rollno: rollNumber,
    };

    const startTime = await User.findOne(userProfile).select("start");
    const endTime = new Date();
    const totalDuration = new Date(endTime - startTime.start);

    const update = {
      $set: {
        end: endTime,
        totalDuration,
      },
    };

    await User.findOneAndUpdate(userProfile, update).exec();

    res.status(200).send("Acknowledged");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = endGameController;
