const jsonwebtoken = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    const token = authHeader.split(" ")[1];
    const verified = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    if (verified) {
      next();
    } else {
      return res.status(401).json({
        message: "Authorization faild!",
      });
    }
  } catch (e) {
    return res.status(401).json({
      message: "Authorization faild!",
    });
  }
};
