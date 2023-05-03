import { pool } from "../db.js";
import { user_Id, isAdmin } from "../libs/isAdmin.js";

const checkRole = async (req, res, next) => {
  try {
    if ((await isAdmin(req, res)) === true) {
      next();
    } else {
      const { commentId } = req.params;
      const [rows] = await pool.query(
        "SELECT * FROM comment WHERE commentId = ?",
        [commentId]
      );
      if (rows.length <= 0) {
        return res.status(404).json({ message: "Articulo no encontrado" });
      }

      if (user_Id !== rows[0].userId) {
        return res.status(401).json({ message: "Usuario no autorizada/o" });
      }

      next()
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal :(" });
  }
};

export default checkRole;
