const jwt = require("jsonwebtoken");

function isAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Authorization header is missing.");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.userType !== "Admin") {
      return res.status(403).send("Permission denied. Admins only.");
    }
    req.user = decoded; // Attach user info to the request object
    next();
  } catch (err) {
    return res.status(401).send("Invalid or expired token.");
  }
}

module.exports = isAdmin; // Ensure you export the function
