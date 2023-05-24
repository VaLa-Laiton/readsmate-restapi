import { pool } from "../db.js";

const doesUserExist = async (req) => {
  const { nickname, email } = req.body;
  const nicknameExist = await pool.query(
    "SELECT * FROM user WHERE nickname = ?",
    [nickname]
  );

  const emailExist = await pool.query("SELECT * FROM user WHERE email = ?", [
    email,
  ]);

  if (nicknameExist[0].length >= 1 || emailExist[0].length >= 1) {
    return true;
  } else {
    return false;
  }
};

export default doesUserExist;
