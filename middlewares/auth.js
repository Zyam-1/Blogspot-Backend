function authenticate(req, res, next) {
  let token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    let decoded = jwt.verify(token, process.env.JWTKEY);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (ex) {
    return res.status(400).json({ message: "Invalid token" });
  }
}

module.exports = authenticate;
