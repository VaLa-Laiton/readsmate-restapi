import { pool } from "../db.js";
import { user_Id, isAdmin } from "../libs/isAdmin.js";

export const getComments = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM comment");
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal :(" });
  }
};

export const getCommentById = async (req, res) => {
  try {
    const { commentId } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM comment WHERE commentId = ?",
      [commentId]
    );

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal :(" });
  }
};

export const createComment = async (req, res) => {
  try {
    await isAdmin(req, res);

    const { articleId, content } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO comment (articleId, userId, content) VALUES (?, ?, ?)",
      [articleId, user_Id, content]
    );
    res
      .status(201)
      .json({ commentId: rows.insertId, articleId, user_Id, content });
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal :(" });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { articleId, userId, content } = req.body;

    const [result] = await pool.query(
      "UPDATE comment SET articleId = IFNULL(?, articleId), userId = IFNULL(?, userId), content = IFNULL(?, content) WHERE commentId = ?",
      [articleId, userId, content, commentId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    const [rows] = await pool.query(
      "SELECT * FROM comment WHERE commentId = ?",
      [commentId]
    );

    res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal :(" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const [rows] = await pool.query("DELETE FROM comment WHERE commentId = ?", [
      commentId,
    ]);

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    const [result] = await pool.query(
      'SELECT "El comentario ha sido eliminado" AS message'
    );
    res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal :(" });
  }
};
