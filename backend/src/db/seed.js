const bcrypt = require("bcryptjs");
const pool = require("../config/db");

const adminUser = {
  username: "admin",
  password: "admin12345",
};

async function seed() {
  const passwordHash = await bcrypt.hash(adminUser.password, 10);

  await pool.query(
    `
      INSERT INTO users (username, password_hash)
      VALUES ($1, $2)
      ON CONFLICT (username)
      DO UPDATE SET
        password_hash = EXCLUDED.password_hash,
        updated_at = NOW()
    `,
    [adminUser.username, passwordHash],
  );

  console.log("Admin user seeded");
}

seed()
  .catch((error) => {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
