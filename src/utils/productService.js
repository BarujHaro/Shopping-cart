const BASE_URL = "https://fakestoreapi.com/products";

export async function getProducts() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error("Error al obtener productos");
  }

  return response.json();
}