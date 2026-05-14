const jwt = require("jsonwebtoken");
const { auth } = require("../config/env");

function requireAdminAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");
  if (type !== "Bearer" || !token) {
    return res.status(401).json({ error: "Missing or invalid Authorization" });
  }

  try {
    const payload = jwt.verify(token, auth.jwtSecret);
    req.user = payload;
    if (!["admin", "superadmin"].includes(payload.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    return next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = { requireAdminAuth };
