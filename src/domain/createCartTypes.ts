export interface CreateCartPayload {
  location_id: string;
}

export interface ICreateCartResponse {
  id: string;
  customer: null;
  location: Location;
  notes: null;
  status: string;
  sub_total: Subtotal;
  vat_total: Subtotal;
  fees_total: Subtotal;
  refund_total: Subtotal;
  discount_total: Subtotal;
  shipping_total: Subtotal;
  total: Subtotal;
  vat_breakdown: any[];
  cart_items: any[];
  vat_number: null;
  parked_at: null;
  created_at: string;
  updated_at: string;
}

interface Subtotal {
  amount: number;
  currency: string;
  formatted: string;
}

interface Location {
  id: string;
  name: string;
}
