export async function fetchCarouselProducts() {
  return fetch("https://fakestoreapi.com/products?limit=3")
    .then((res) => res.json())
    .then((json) => {
      console.log("products:", json);
      return json;
    });
}

export async function fetchCategories() {
  return fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((json) => {
      console.log("categories:", json);
      return json.splice(1);
    });
}

export async function fetchTrendingProducts() {
  return fetch("https://fakestoreapi.com/products?limit=8")
    .then((res) => res.json())
    .then((json) => {
      console.log("trending:", json);
      return json;
    });
}

export async function fetchAllProducts() {
  return fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => {
      console.log("all products:", json);
      return json;
    });
}
