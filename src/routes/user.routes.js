import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import checkRoleAdmin from '../middlewares/checkRoleAdmin.js'
import checkRoleUsers from "../middlewares/checkRoleUsers.js";
import checkRoleUserUpdate from '../middlewares/checkRoleUserUpdate.js'
import {
  getUsers,
  getUserById,
  logInUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = Router();

//
router.get("/user", verifyToken, checkRoleAdmin, getUsers);

//
router.get("/user/:userId", verifyToken, checkRoleUsers, getUserById);

//
router.post("/user/log-in", logInUser);

//
router.post("/user/sign-up", createUser);

//
router.patch("/user/:userId", verifyToken, checkRoleUserUpdate, updateUser);

//
router.delete("/user/:userId", verifyToken, checkRoleUsers, deleteUser);

export default router;
