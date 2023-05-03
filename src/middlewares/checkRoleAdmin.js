import { pool } from "../db.js";
import { user_Id, isAdmin } from "../libs/isAdmin.js";

const checkRole = async (req, res, next) => {
  try {
    if ((await isAdmin(req, res)) === true) {
      next();
    } else {
      return res.status(401).json({ message: "Usuario no autorizada/o" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal :(" });
  }
};

export default checkRole;
