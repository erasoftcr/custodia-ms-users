import { pool } from "../config/db.js";
import bcrypt from "bcrypt";

export const create = async (
  username,
  email,
  password,
  userType = "individual"
) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const query = `
      INSERT INTO users (username, email, password_hash, salt, user_type)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, username, email, user_type, created_at
    `;

  const values = [username, email, passwordHash, salt, userType];

  const result = await pool.query(query, values);
  return result.rows[0];
};

export const findById = async (id) => {
  const query =
    "SELECT id, username, email, user_type, created_at FROM users WHERE id = $1";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const existsByUsernameOrEmail = async (username, email) => {
  const query = `
    SELECT 1
    FROM users
    WHERE (username = $1 OR email = $2)
    LIMIT 1
  `;
  const result = await pool.query(query, [username, email]);
  return result.rowCount > 0;
};

export const isUserDeleted = async (username, email) => {
  const query = `
    SELECT 1
    FROM users
    WHERE (username = $1 OR email = $2)
    AND deleted_at IS NOT NULL
    LIMIT 1
  `;
  const result = await pool.query(query, [username, email]);
  return result.rowCount > 0;
};

export const findByUsername = async (username) => {
  const query = "SELECT * FROM users WHERE username = $1 ";
  const result = await pool.query(query, [username]);
  return result.rows[0];
};

export const update = async (id, updates) => {
  const allowedUpdates = ["username", "email"];
  const updateFields = Object.keys(updates).filter((key) =>
    allowedUpdates.includes(key)
  );

  if (updateFields.length === 0) {
    throw new Error("No valid update fields provided");
  }

  const setClause = updateFields
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");
  const query = `
      UPDATE users
      SET ${setClause}
      WHERE id = $1
      RETURNING id, username, email, user_type, created_at
    `;

  const values = [id, ...updateFields.map((field) => updates[field])];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const remove = async (id) => {
  const query = "UPDATE users SET deleted_at = NOW() WHERE id = $1";
  const result = await pool.query(query, [id]);
  return result.rowCount > 0;
};

export const list = async (limit = 10, offset = 0) => {
  const query = `
      SELECT id, username, email, user_type, created_at
      FROM users
      WHERE deleted_at IS NULL
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;
  const result = await pool.query(query, [limit, offset]);
  return result.rows;
};
