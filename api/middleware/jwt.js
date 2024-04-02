import jwt from "jsonwebtoken";
import createError from "../utils/CreateError.js";
export const verifyToken = async (req, res, next) => {
  const token = await req.cookies.accessToken;
  if (!token) return next(createError(401, "You are not authenticated"));

  jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
    if (error) return next(createError(403, "Token is not valid"));
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};
