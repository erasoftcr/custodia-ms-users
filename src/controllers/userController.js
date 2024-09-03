import { failure } from "../config/failure.response.js";
import * as userModel from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, password, userType } = req.body;

    const existUser = await userModel.exitstByUsernameOrEmail(username, email);

    if (existUser) {
      return failure(res, 3);
    }

    const user = await userModel.create(username, email, password, userType);
    return res.status(200).json(user);
  } catch (error) {
    return failure(res, 4);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return failure(res, 5);
    }
    return res.json(user);
  } catch (error) {
    return failure(res, 5);
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await userModel.update(req.params.id, req.body);
    if (!user) {
      return failure(res, 5);
    }
    return res.json(user);
  } catch (error) {
    return failure(res, 6);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await userModel.remove(req.params.id);
    if (!user) {
      return failure(res, 5);
    }
    return res.json({ message: "User deleted successfully" });
  } catch (error) {
    return failure(res, 7);
  }
};

export const listUsers = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    const users = await userModel.list(limit, offset);
    return res.json(users);
  } catch (error) {
    return failure(res, 0);
  }
};
