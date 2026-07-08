import { apiClient } from "../../shared/api/client";

export function getCarsApi() {
  return apiClient("/cars");
}

export function createCarApi(car) {
  return apiClient("/cars", {
    method: "POST",
    body: car,
  });
}

export function updateCarApi(id, car) {
  return apiClient(`/cars/${id}`, {
    method: "PUT",
    body: car,
  });
}

export function deleteCarApi(id) {
  return apiClient(`/cars/${id}`, {
    method: "DELETE",
  });
}
