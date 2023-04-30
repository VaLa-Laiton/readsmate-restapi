import { Router } from "express";
import {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller.js";

const router = Router();

//
router.get("/article", getArticles);

//
router.get("/article/:articleId", getArticleById);

//
router.post("/article", createArticle);

//
router.patch("/article/:articleId", updateArticle);

//
router.delete("/article/:articleId", deleteArticle);

export default router;
