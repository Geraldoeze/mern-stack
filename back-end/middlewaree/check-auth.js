const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new HttpError("Not authenticated", 401);
    throw error;
  }
  
  const token = authHeader.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error("Authentication failed");
    }
    let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_KEY);
  } catch (err) {
    const error = new HttpError("Authentication failed at server", 401);
    throw error;
  }
  if(!decodedToken) {
    const error = new HttpError("Not authenticated.", 401)
    throw error;
  }
  req.userData = { userId: decodedToken.userId };
  next();
};
