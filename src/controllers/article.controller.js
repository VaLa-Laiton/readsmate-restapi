import { pool } from "../db.js";
import { user_Id, isAdmin } from "../libs/isAdmin.js";

//  Consult all articles
export const getArticles = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM article");
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal :(" });
  }
};

// Consult a specific article
export const getArticleById = async (req, res) => {
  try {
    const { articleId } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM article WHERE articleId = ?",
      [articleId]
    );

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Articulo no encontrado" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal :(" });
  }
};

// Create article
export const createArticle = async (req, res) => {
  try {
    await isAdmin(req, res);

    const { title, urlFile } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO article (userId, title, urlFile) VALUES (?, ?, ?)",
      [user_Id, title, urlFile]
    );
    res.status(201).json({ articleId: rows.insertId, user_Id, title, urlFile });
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal :(" });
  }
};

// Update article
export const updateArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const { userId, title, urlFile } = req.body;

    const [result] = await pool.query(
      "UPDATE article SET userId = IFNULL(?, userId), title = IFNULL(?, title), urlFile = IFNULL(?, urlFile) WHERE articleId = ?",
      [userId, title, urlFile, articleId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Articulo no encontrado" });
    }

    const [rows] = await pool.query(
      "SELECT * FROM article WHERE articleId = ?",
      [articleId]
    );

    res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal :(" });
  }
};

// Delete article
export const deleteArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const [rows] = await pool.query("DELETE FROM article WHERE articleId = ?", [
      articleId,
    ]);

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Articulo no encontrado" });
    }

    const [result] = await pool.query(
      'SELECT "El articulo ha sido eliminado" AS message'
    );
    res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal :(" });
  }
};
