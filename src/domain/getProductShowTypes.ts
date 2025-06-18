export interface IGetProductShowResponse {
  id: number;
  title: string;
  slug: string;
  description: null;
  product_class: null;
  product_type: string;
  created_at: string;
  updated_at: string;
  featured: boolean;
  brand: null;
  media: Media[];
  product_variants: Productvariant[];
  meta_fields: Metafield[];
}

export type ProductOption = {
  id: number;
  value: string;
};

export type ProductDetails = {
  id: number;
  slug: string;
  name: string;
  title: string;
  description: string | null;
  formattedPrice: string;
  availableColors: ProductOption[];
  availableSizes: ProductOption[];
  maxQuantity: number;
};

export type GetProductsShowParams = {
  sort?: string;
  "filter[minPrice]"?: number;
  "filter[maxPrice]"?: number;
  "filter[taxons]"?: string[];
};

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
  media: (Media2 | Media22)[];
  inventory_items: Inventoryitem[];
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

interface Media22 {
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
  square_image: Responsiveimage | null;
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
  responsive_images: Responsiveimage;
  conversions: Conversions;
  date: string;
  id: number;
  square_image: Responsiveimage;
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
