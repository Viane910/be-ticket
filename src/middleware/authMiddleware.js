const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - Token tidak ditemukan",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // simpan user ke request
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized - Token tidak valid",
    });
  }
};
