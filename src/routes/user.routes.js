import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = Router();

//
router.get("/user", getUsers);

//
router.get("/user/:userId", getUserById);

//
router.post("/user", createUser);

//
router.patch("/user/:userId", updateUser);

//
router.delete("/user/:userId", deleteUser);

export default router;
