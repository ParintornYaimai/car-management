const carModel = require("../models/car.model");

function validateCarInput(body) {
  if (!body.licensePlate || !body.brand || !body.model) {
    const error = new Error("License plate, brand, and model are required");
    error.statusCode = 400;
    throw error;
  }

  return {
    licensePlate: body.licensePlate.trim(),
    brand: body.brand.trim(),
    model: body.model.trim(),
    note: body.note?.trim() || null,
  };
}

async function getCars(req, res, next) {
  try {
    const cars = await carModel.findAllCars();
    res.json(cars);
  } catch (error) {
    next(error);
  }
}

async function getCarById(req, res, next) {
  try {
    const car = await carModel.findCarById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json(car);
  } catch (error) {
    next(error);
  }
}

async function createCar(req, res, next) {
  try {
    const input = validateCarInput(req.body);
    const car = await carModel.createCar(input);
    res.status(201).json(car);
  } catch (error) {
    next(error);
  }
}

async function updateCar(req, res, next) {
  try {
    const input = validateCarInput(req.body);
    const car = await carModel.updateCar(req.params.id, input);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json(car);
  } catch (error) {
    next(error);
  }
}

async function deleteCar(req, res, next) {
  try {
    const isDeleted = await carModel.deleteCar(req.params.id);

    if (!isDeleted) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};
