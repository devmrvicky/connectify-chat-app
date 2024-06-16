import jwt from "jsonwebtoken";

const generateJWTTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    Credential: true,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set to true in production
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // 'None' for cross-domain requests
  });
};

export { generateJWTTokenAndSetCookie };
