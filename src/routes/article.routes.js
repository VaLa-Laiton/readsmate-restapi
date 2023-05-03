import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import checkRoleArticles from '../middlewares/checkRoleArticles.js';
import checkRoleArticleUpdate from '../middlewares/checkRoleArticleUpdate.js'
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
router.post("/article", verifyToken, createArticle);

//
router.patch("/article/:articleId", verifyToken, checkRoleArticleUpdate, updateArticle);

//
router.delete("/article/:articleId", verifyToken, checkRoleArticles, deleteArticle);

export default router;
