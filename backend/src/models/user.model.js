const pool = require("../config/db");

async function findUserByUsername(username) {
  const result = await pool.query(
    `
      SELECT id, username, password_hash
      FROM users
      WHERE username = $1
    `,
    [username],
  );

  return result.rows[0] ?? null;
}

module.exports = {
  findUserByUsername,
};
