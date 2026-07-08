const authService = require("../services/auth.service");

async function login(req, res, next) {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
};
