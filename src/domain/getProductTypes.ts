export type GetProductsParams = {
  page?: number;
  per_page?: number;
  sort?: string;
  "filter[class]"?: string;
  "filter[minPrice]"?: number;
  "filter[maxPrice]"?: number;
  "filter[taxons]"?: string[];
};

export type ProductInfo = {
  id: number;
  title: string;
  slug: string;
  square_image?: string;
  price: {
    amount: number;
    formatted: string;
  };
};

export interface IGetProductResponse {
  data: Datum[];
  links: Link[];
  meta: Meta;
}

interface Meta {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

interface Link {
  url: null | string;
  label: string;
  active: boolean;
}

interface Datum {
  id: number;
  title: string;
  slug: string;
  description: null | string;
  product_class: null;
  product_type: string;
  created_at: string;
  updated_at: string;
  featured: boolean;
  brand: null;
  media: (Media | Media2)[];
  product_variants: Productvariant[];
  meta_fields: Metafield[];
}

interface Metafield {
  key: string;
  value: string;
}

interface Productvariant {
  id: number;
  created_at: string;
  updated_at: string;
  type: string;
  pricing_type: string;
  pricing_unit: Pricingunit;
  price: Price;
  vat_rate: Vatrate;
  variant_type_options: Varianttypeoption[];
  media: Media3[][];
  inventory_items: (Inventoryitem | Inventoryitem)[];
  can_order_out_of_stock_items: boolean;
}

interface Inventoryitem {
  id: string;
  location: Location;
  available_quantity: number;
}

interface Location {
  id: string;
  name: string;
}

interface Media3 {
  uuid: string;
  name: string;
  file_name: string;
  url: string;
  order: number;
  custom_properties: any[];
  type: string;
  extension: string;
  size: number;
  mime_type: string;
  responsive_images: Responsiveimage;
  conversions: Conversions;
  date: string;
  id: number;
  square_image: Responsiveimage | Responsiveimage | null;
}

interface Varianttypeoption {
  id: number;
  value: string;
  variant_type: Pricingunit;
}

interface Vatrate {
  id: number;
  name: string;
  code: string;
  value: number;
}

interface Price {
  currency: string;
  amount: number;
  formatted: string;
  scale: number;
}

interface Pricingunit {
  id: number;
  name: string;
}

interface Media2 {
  uuid: string;
  name: string;
  file_name: string;
  url: string;
  order: number;
  custom_properties: any[];
  type: string;
  extension: string;
  size: number;
  mime_type: string;
  responsive_images: null;
  conversions: Conversions;
  date: string;
  id: number;
  square_image: Responsiveimage;
}

interface Media {
  uuid: string;
  name: string;
  file_name: string;
  url: string;
  order: number;
  custom_properties: any[];
  type: string;
  extension: string;
  size: number;
  mime_type: string;
  responsive_images: Responsiveimage | null;
  conversions: Conversions;
  date: string;
  id: number;
  square_image: Responsiveimage;
}

interface Conversions {
  "medium-square": string;
}

interface Responsiveimage {
  src_set: string;
  src: string;
  width: number;
  height: number;
}
