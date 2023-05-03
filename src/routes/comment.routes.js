import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import checkRoleComments from '../middlewares/checkRoleComments.js'
import checkRoleCommentUpdate from '../middlewares/checkRoleCommentUpdate.js'
import {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller.js";

const router = Router();

//
router.get("/comment", getComments);

//
router.get("/comment/:commentId", getCommentById);

//
router.post("/comment", verifyToken, createComment);

//
router.patch("/comment/:commentId", verifyToken, checkRoleCommentUpdate, updateComment);

//
router.delete("/comment/:commentId", verifyToken, checkRoleComments, deleteComment);

export default router;
