const BASE_URL = "https://fakestoreapi.com";

export async function fetchProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error("Error fetching products");
  }
  return response.json();
}

export async function fetchProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error("Error fetching product details");
  }
  return response.json();
}

export async function login(loginData) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return response; // Return the response to handle it in the Login component
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}
