const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  let token = req.heder("Authorization");
  if (!token) return res.status(401).send("Access denied! No token!");
  //Bearer 123456
  else token = token.split(" ")[1].trim();
  const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

  //not decoded => undefind
  if (!decoded) return res.status(400).send("Invalied token!");
  req.user = decoded;
  next();
};
