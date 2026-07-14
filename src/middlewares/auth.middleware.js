const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorised" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res.status(403).json({ message: "Ypu dont have access" });
    }

    req.user = decoded;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorised" });
  }
}

async function authUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Unauthorised" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "user") {
      return res.status(403).json({ message: "You dot hace access" });
    }
    req.user = decoded;
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorised" });
  }
}

module.exports = { authArtist, authUser };
