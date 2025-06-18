export interface AddCartItemPayload {
  id: number;
  quantity: number;
  type: string;
}

export interface IAddCartItemResponse {
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
  vat_breakdown: Vatbreakdown[];
  cart_items: Cartitem[];
  vat_number: null;
  parked_at: null;
  created_at: string;
  updated_at: string;
}

interface Cartitem {
  id: number;
  quantity: number;
  is_refund: boolean;
  product_variant: Productvariant;
  fees: any[];
  sub_total: Subtotal;
  unit_price: Subtotal;
  total_price: Subtotal;
}

interface Productvariant {
  id: number;
  vat_rate: Vatrate2;
  variant_type_options: any[];
  product: Product;
  media: any[];
}

interface Product {
  id: number;
  title: string;
  media: any[];
}

interface Vatrate2 {
  value: number;
}

interface Vatbreakdown {
  vat_rate: Vatrate;
  total: Total;
}

interface Total {
  currency: string;
  amount: number;
  formatted: string;
  scale: number;
}

interface Vatrate {
  id: number;
  code: string;
  name: string;
  value: number;
  rate: number;
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
