const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret-change-me";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "1h";

function createUnauthorizedError() {
  const error = new Error("Invalid username or password");
  error.statusCode = 401;
  return error;
}

async function login({ username, password }) {
  if (!username || !password) {
    const error = new Error("Username and password are required");
    error.statusCode = 400;
    throw error;
  }

  const user = await userModel.findUserByUsername(username);

  if (!user) {
    throw createUnauthorizedError();
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    throw createUnauthorizedError();
  }

  const accessToken = jwt.sign(
    {
      userId: user.id,
      username: user.username,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN },
  );

  return {
    accessToken,
    user: {
      id: user.id,
      username: user.username,
    },
  };
}

module.exports = {
  login,
};
