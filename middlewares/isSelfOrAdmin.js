const jwt = require("jsonwebtoken");

function isSelfOrAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Authorization header is missing.");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Allow if the user is Admin or accessing their own data
    if (decoded.userType === "Admin" || decoded.userId === Number(req.params.userId)) {
      req.user = decoded; // Attach user info to the request object
      return next();
    }

    return res.status(403).send("Permission denied.");
  } catch (err) {
    return res.status(401).send("Invalid or expired token.");
  }
}

module.exports = isSelfOrAdmin;
