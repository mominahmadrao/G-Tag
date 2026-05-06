import { User } from "../models/users.models.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async function (req, res, next) {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized access");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedToken?._id) {
      throw new ApiError(401, "Invalid token payload");
    }

    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    );

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid access token");
  }
});

const validateUserRole = (roles = []) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, "Unauthorized request");
    }

    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "Forbidden: You don't have permission");
    }

    next();
  });
};

export { verifyJWT, validateUserRole };