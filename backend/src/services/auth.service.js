import { pool } from "../config/db.js";

export const createUser = async (email, password) => {
  const result = await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
    [email, password]
  );
  return result.rows[0];
};

export const findUser = async (email, password) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1 AND password=$2",
    [email, password]
  );
  return result.rows[0];
};
