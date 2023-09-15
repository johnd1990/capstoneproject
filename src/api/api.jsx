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
    // Login API call here
}