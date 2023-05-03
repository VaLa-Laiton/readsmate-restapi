import { pool } from "../db.js";
import jwt from 'jsonwebtoken'
import {SECRET} from '../config.js'

export let user_Id

export const isAdmin = async (req, res) => {
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

    user_Id = checkToken[0][0].userId

    if (checkToken[0][0].role === "admin") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal :(" })
  }
};
