const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new HttpError("Not authenticated", 401);

    throw error;
  }

  try {
    const token = authHeader.split(" ")[1]; // Authorization: 'Bearer TOKEN'

    if (!token) {
      throw new Error("Authentication failed");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { userId: decodedToken.userId };

    next();
  } catch (err) {
    const error = new HttpError("Authentication failed at server", 401);
    return next(error);
  }
};
