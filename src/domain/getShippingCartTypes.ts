export interface IGetShippingCartResponse {
  shipping_region_options: Shippingregionoption[];
  available_options: Availableoption[];
}

interface Availableoption {
  id: number;
  shipping_zone_id: number;
  name: string;
  rate_type: string;
  help_text: null;
  amount: Amount;
  min_amount: null;
  max_amount: null;
  apply_before_discount: boolean;
}

interface Shippingregionoption {
  id: number;
  shipping_zone_id: number;
  name: string;
  rate_type: string;
  help_text: null;
  amount: Amount;
  min_amount: Amount | null;
  max_amount: null;
  apply_before_discount: boolean;
}

interface Amount {
  currency: string;
  amount: number;
  formatted: string;
  scale: number;
}
