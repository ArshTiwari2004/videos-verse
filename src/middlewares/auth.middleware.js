import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        let token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        // Verify and decode the token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        console.log("Decoded Token:", decodedToken); // Log decoded token for debugging

        // Retrieve user details using the decoded token
        const user = await User.findById(decodedToken.id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        // Attach user details to the request object for subsequent middleware
        req.user = user;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error); // Log JWT verification error for debugging

        // Handle different types of errors
        if (error.name === "JsonWebTokenError") {
            throw new ApiError(401, "Invalid access token");
        } else if (error.name === "TokenExpiredError") {
            throw new ApiError(401, "Token has expired");
        } else {
            throw new ApiError(401, error.message || "Invalid access token");
        }
    }
});
