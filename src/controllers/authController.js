import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { failure } from "../config/failure.response.js";
import * as userModel from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, userType } = req.body;

    const isUserDeleted = await userModel.isUserDeleted(username, email);

    if (isUserDeleted) {
      return failure(res, 8);
    }

    const existUser = await userModel.existsByUsernameOrEmail(username, email);

    if (existUser) {
      return failure(res, 3);
    }

    const user = await userModel.create(username, email, password, userType);

    return res.json(user);
  } catch (error) {
    return failure(res, 1);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findByUsername(username);

    if (!user) {
      return failure(res, 2);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return failure(res, 2);
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE_IN }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        userType: user.user_type,
      },
    });
  } catch (error) {
    return failure(res, 0);
  }
};
