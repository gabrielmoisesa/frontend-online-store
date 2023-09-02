export async function getCategories() {
  const API_URL = 'https://api.mercadolibre.com/sites/MLB/categories';
  return fetch(API_URL).then((response) => response.json());
}

export async function getProductsFromCategoryAndQuery(
  query: string,
  categoryId?: string,
) {
  if (categoryId) {
    const API_URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
    return fetch(API_URL).then((response) => response.json());
  }
  const API_URL = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  return fetch(API_URL).then((response) => response.json());
}

export async function getProductsFromCategory(categoryId: string) {
  const API_URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  return fetch(API_URL).then((response) => response.json());
}

export async function getProductById(productId: string | undefined) {
  const API_URL = `https://api.mercadolibre.com/items/${productId}`;
  return fetch(API_URL).then((response) => response.json());
}
