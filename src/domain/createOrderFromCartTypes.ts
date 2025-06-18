export interface CreateOrderFromCartPayload {
  email: string; // This is required if it is a guest checkout
  billing_address: AddressPayload;
  shipping_address: AddressPayload;
  shipping_address_id: null;
  billing_address_id: null;
  shipping_option_id: string; // 3 for Pickup as per Cart Shipping Options
}

interface AddressPayload {
  first_name: string;
  last_name: string;
  contact_number: string;
  line1: string;
  line2: string; //optional
  city: string;
  sub_division: string; //optional
  country: string; //Country should be in ISO alpha 2 format
  postal_code: string;
}

export interface ICreateOrderFromCartResponse {
  id: string;
  type: string;
  sales_channel: string;
  order_items: Orderitem[];
  payment_status: string;
  payment_type: null;
  status: string;
  remaining_amount_to_be_paid: Unitprice;
  vat_total: Unitprice;
  fees_total: Unitprice;
  sub_total: Unitprice;
  shipping: Unitprice;
  total: Unitprice;
  vat_breakdown: any[];
  customer: null;
  loyalty: null;
  notes: null;
  vat_number: null;
  billing_address: Billingaddress;
  shipping_address: Billingaddress;
  created_at: string;
}

interface Billingaddress {
  id: string;
  first_name: string;
  last_name: string;
  contact_number: Contactnumber;
  line1: string;
  line2: null;
  city: string;
  sub_division: null;
  postal_code: string;
  country: Country;
}

interface Country {
  name: string;
  alpha2: string;
  alpha3: string;
}

interface Contactnumber {
  country_code: number;
  national_number: string;
  region: string;
  e164: string;
  rfc3966: string;
  international: string;
}

interface Orderitem {
  id: string;
  quantity: number;
  is_refund: boolean;
  shipping: Shipping;
  unit_price: Unitprice;
  total_price: Unitprice;
}

interface Unitprice {
  amount: number;
  currency: string;
  formatted: string;
}

interface Shipping {
  id: number;
  name: string;
}
