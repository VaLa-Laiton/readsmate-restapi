import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM user");
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal :(" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await pool.query("SELECT * FROM user WHERE userId = ?", [
      userId,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal :(" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { nickname, email, password } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO user (nickname, email, password) VALUES (?, ?, ?)",
      [nickname, email, password]
    );
    res.status(201).json({ userId: rows.insertId, nickname, email, password });
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal :(" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { nickname, email, password } = req.body;

    const [result] = await pool.query(
      "UPDATE user SET nickname = IFNULL(?, nickname), email = IFNULL(?, email), password = IFNULL(?, password) WHERE userId = ?",
      [nickname, email, password, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const [rows] = await pool.query("SELECT * FROM user WHERE userId = ?", [
      userId,
    ]);

    res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal :(" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await pool.query("DELETE FROM user WHERE userId = ?", [
      userId,
    ]);

    if (rows.affectedRows === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const [result] = await pool.query(
      'SELECT "El usuario ha sido eliminado" AS message'
    );
    res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Algo salio mal :(" });
  }
};
