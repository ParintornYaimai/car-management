const cors = require("cors");
const express = require("express");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode ?? 500;

  res.status(statusCode).json({
    message: err.message ?? "Internal server error",
  });
});

module.exports = app;
