const pool = require("../config/db");

function mapCar(row) {
  return {
    id: row.id,
    licensePlate: row.license_plate,
    brand: row.brand,
    model: row.model,
    note: row.note,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function findAllCars() {
  const result = await pool.query(
    `
      SELECT id, license_plate, brand, model, note, created_at, updated_at
      FROM cars
      ORDER BY id DESC
    `,
  );

  return result.rows.map(mapCar);
}

async function findCarById(id) {
  const result = await pool.query(
    `
      SELECT id, license_plate, brand, model, note, created_at, updated_at
      FROM cars
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0] ? mapCar(result.rows[0]) : null;
}

async function createCar({ licensePlate, brand, model, note }) {
  const result = await pool.query(
    `
      INSERT INTO cars (license_plate, brand, model, note)
      VALUES ($1, $2, $3, $4)
      RETURNING id, license_plate, brand, model, note, created_at, updated_at
    `,
    [licensePlate, brand, model, note || null],
  );

  return mapCar(result.rows[0]);
}

async function updateCar(id, { licensePlate, brand, model, note }) {
  const result = await pool.query(
    `
      UPDATE cars
      SET
        license_plate = $1,
        brand = $2,
        model = $3,
        note = $4,
        updated_at = NOW()
      WHERE id = $5
      RETURNING id, license_plate, brand, model, note, created_at, updated_at
    `,
    [licensePlate, brand, model, note || null, id],
  );

  return result.rows[0] ? mapCar(result.rows[0]) : null;
}

async function deleteCar(id) {
  const result = await pool.query("DELETE FROM cars WHERE id = $1", [id]);
  return result.rowCount > 0;
}

module.exports = {
  findAllCars,
  findCarById,
  createCar,
  updateCar,
  deleteCar,
};
