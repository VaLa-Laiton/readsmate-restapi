import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "2123";
export const DB_DATABASE = process.env.DB_DATABASE || "readsmate";
export const DB_PORT = process.env.DB_PORT || 3306;
export const SECRET = process.env.SECRET || "readsmate-best-blog"
export const ORIGIN_ONE = process.env.ORIGIN_ONE || "http://localhost:5173/"
export const ORIGIN_TWO = process.env.ORIGIN_TWO || "http://InserteURL-XD/"