const express = require("express");
const carController = require("../controllers/car.controller");

const router = express.Router();

router.get("/", carController.getCars);
router.get("/:id", carController.getCarById);
router.post("/", carController.createCar);
router.put("/:id", carController.updateCar);
router.delete("/:id", carController.deleteCar);

module.exports = router;
