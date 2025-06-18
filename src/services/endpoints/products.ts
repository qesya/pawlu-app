export type ProductEndpoints = {
  getProducts: () => string;
  getProductsShow: (slug: string) => string;
};

const productsEndpoints: ProductEndpoints = {
  // GET /products
  getProducts: (): string => `/products`,

  // GET /products/:slug
  getProductsShow: (slug) => `/products/${slug}`,
};

export default productsEndpoints;
