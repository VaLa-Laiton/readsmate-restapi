import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import doesUserExist from "../libs/doesUserExist.js";
import { SECRET } from "../config.js";

// Consult all registered users
export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM user");
    res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal :(" });
  }
};

// Check if a specific user exists
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

// - - - // - - - //

// Log in (Sign in)
export const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query("SELECT * FROM user WHERE email = ?", [
      email,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const checkPassword = await bcrypt.compare(password, rows[0].password);

    if (checkPassword) {
      const payload = { userId: rows[0].userId, email };
      const token = jwt.sign({ payload }, SECRET, { expiresIn: "24h" });
      return res.status(202).json({ userId: rows[0].userId, nickname: rows[0].nickname, email, token });
    }

    res.status(401).json({ message: "Constraseña incorrecta" });
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal :(" });
  }
};

// Sign up || Create a user
export const createUser = async (req, res) => {
  try {
    if (await doesUserExist(req)) {
      return res.status(200).json({ message: "El usuario ya existe" });
    }

    const { nickname, email, password, role } = req.body;
    const encryptedPassword = async (unencryptedPassword) => {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(unencryptedPassword, salt);
      return hash;
    };
    const newPassword = await encryptedPassword(password);
    const [rows] = await pool.query(
      "INSERT INTO user (nickname, email, password, role) VALUES (?, ?, ?, IFNULL(?, role))",
      [nickname, email, newPassword, role]
    );
    const payload = { userId: rows.insertId, email };
    const token = jwt.sign({ payload }, SECRET, { expiresIn: "72h" });
    res.status(201).json({ userId: rows.insertId, nickname, email, token });
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal :(" });
  }
};

// - - - // - - - //

// Update user
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { nickname, email, password } = req.body;
    const encryptedPassword = async (unencryptedPassword) => {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(unencryptedPassword, salt);
      return hash;
    };
    let newPassword; 

    if (password) {
      newPassword = await encryptedPassword(password);
    }

    const [result] = await pool.query(
      "UPDATE user SET nickname = IFNULL(?, nickname), email = IFNULL(?, email), password = IFNULL(?, password) WHERE userId = ?",
      [nickname, email, newPassword, userId]
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

// Delete user
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
    return res.status(500).json({ message: "Algo salio mal :(" });
  }
};
