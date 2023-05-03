import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";

const verifyToken = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(407).json({ message: "Se requiere autenticación" });
    }

    const decodedToken = jwt.verify(token, SECRET);
    const checkToken = await pool.query("SELECT * FROM user WHERE email = ?", [
      decodedToken.payload.email,
    ]);
    if (!checkToken) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Usuario no autorizada/o" });
  }
};

export default verifyToken;
