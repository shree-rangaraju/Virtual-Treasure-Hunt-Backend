const levelResponses = {
  4: "John, a humble worker, found gold in a dark mine.",
  5: "A mysterious old book on the dusty shelf.",
  6: "XArchenon",
  8: "5111605",
};

const passCodeController = (req, res) => {
  const { level } = req.body;
  const response = levelResponses[level] || "";
  res.status(200).send(response);
};

module.exports = passCodeController;
