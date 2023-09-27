const BASE_URL = "https://fakestoreapi.com";

export async function fetchProducts(
  sortOption,
  filterOption,
  minPrice,
  maxPrice
) {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error("Error fetching products");
    }
    const data = await response.json();

    // Apply sorting
    if (sortOption === "price_asc") {
      data.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price_desc") {
      data.sort((a, b) => b.price - a.price);
    } else if (sortOption === "alphabetical_asc") {
      data.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "alphabetical_desc") {
      data.sort((a, b) => b.title.localeCompare(a.title));
    }

    // Apply filtering
    let filteredData = data;
    if (filterOption !== "") {
      filteredData = data.filter((product) =>
        product.category.toLowerCase().includes(filterOption.toLowerCase())
      );
    }

    // Apply price range filtering
    filteredData = filteredData.filter(
      (product) =>
        (minPrice === "" || product.price >= parseFloat(minPrice)) &&
        (maxPrice === "" || product.price <= parseFloat(maxPrice))
    );

    return filteredData;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
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
