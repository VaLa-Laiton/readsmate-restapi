import { Router } from "express";
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
router.post("/comment", createComment);

//
router.patch("/comment/:commentId", updateComment);

//
router.delete("/comment/:commentId", deleteComment);

export default router;
