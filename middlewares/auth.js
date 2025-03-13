const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  let token = req.headers["x-auth-token"];
  // console.log(token);
  if (!token) {
    return res.status(401).json(["Unauthorized"]);
  }
  try {
    let decoded = jwt.verify(token, process.env.JWTKEY);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (ex) {
    return res.status(400).json(["Invalid token"]);
  }
}

module.exports = authenticate;
