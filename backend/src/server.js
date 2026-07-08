require("dotenv").config();

const app = require("./app");
const pool = require("./config/db");

const PORT = process.env.PORT ?? 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}
