import pool from "../config/db.js";

export const createNote = async (req, res) => {
  const { userId, content } = req.body;

  const result = await pool.query(
    "INSERT INTO user_notes (user_id, content) VALUES ($1, $2) RETURNING *",
    [userId, content]
  );

  res.json(result.rows[0]);
};

export const getNotes = async (req, res) => {
  const { userId } = req.params;

  const result = await pool.query(
    "SELECT * FROM user_notes WHERE user_id=$1 ORDER BY created_at DESC",
    [userId]
  );

  res.json(result.rows);
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const result = await pool.query(
    "UPDATE user_notes SET content=$1 WHERE id=$2 RETURNING *",
    [content, id]
  );

  res.json(result.rows[0]);
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM user_notes WHERE id=$1", [id]);
  res.json({ message: "Deleted" });
};
