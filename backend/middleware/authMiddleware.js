const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Grab the token from the cookies
    const { token } = req.cookies;

    if (!token) {
      return res.status(403).json({ error: "Please login!" });
    }

    // Verify the token and attach the decoded payload to `req.user`
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Session expired. Please re-login." });
    }
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
