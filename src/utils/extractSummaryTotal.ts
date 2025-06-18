import { IGetCartResponse } from "@/src/domain";

export function extractSummaryTotal(cart?: IGetCartResponse) {
  return {
    subtotal: cart?.sub_total?.formatted ?? "",
    tax: cart?.vat_total?.formatted ?? "",
    shipping: cart?.shipping_total?.formatted ?? "",
    total: cart?.total?.formatted ?? "",
  };
}
