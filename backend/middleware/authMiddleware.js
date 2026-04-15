import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    let token;

    // Token 
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach 
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

////role check admine hai ke nahi
export const adminOnly = (req, res, next) => {
  if (req.user?.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Admin only access" });
  }
};