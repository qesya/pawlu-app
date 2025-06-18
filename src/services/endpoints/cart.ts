export type CartEndpoints = {
  createCart: () => string;
  getCart: (cartId: string) => string;
  addCartItem: (cartId: string) => string;
  updateCartItem: (cartId: string, itemId: string) => string;
  getCartShippingOptions: (cartId: string, locationCode?: string) => string;
  createOrderFromCart: (cartId: string) => string;
};

const cartEndpoints: CartEndpoints = {
  // POST /carts
  createCart: (): string => `/carts`,

  // GET /carts/:cartId
  getCart: (cartId: string): string => `/carts/${cartId}`,

  // POST /carts/:cartId/items
  addCartItem: (cartId: string): string => `/carts/${cartId}/items`,

  // PUT /carts/:cartId/items/:itemId
  updateCartItem: (cartId: string, itemId: string): string =>
    `/carts/${cartId}/items/${itemId}`,

  // GET /carts/:cartId/shipping-options?location_code=MT
  getCartShippingOptions: (cartId: string, locationCode?: string): string =>
    `/carts/${cartId}/shipping-options${locationCode ? `?location_code=${locationCode}` : ""}`,

  // POST /carts/:cartId/order
  createOrderFromCart: (cartId: string): string => `/carts/${cartId}/order`,
};

export default cartEndpoints;
