import { IGetProductResponse, ProductInfo } from "@/src/domain";

export function extractProductList(
  apiResponse: IGetProductResponse,
): ProductInfo[] {
  return (
    apiResponse?.data?.map((product) => {
      const media = product.media?.[0];
      const squareImage =
        media?.square_image?.src ??
        media?.conversions?.["medium-square"] ??
        media?.url ??
        "";

      const price = product.product_variants?.[0]?.price;

      return {
        id: product.id,
        title: product.title,
        slug: product.slug,
        square_image: squareImage,
        price: price
          ? {
              amount: price.amount,
              formatted: price.formatted,
            }
          : {
              amount: 0,
              formatted: "",
            },
      };
    }) ?? []
  );
}

export function extractPaginationInfo(apiResponse: IGetProductResponse) {
  const currentPage = apiResponse.meta?.current_page ?? 1;
  const totalPages = apiResponse.meta?.last_page ?? 1;

  return {
    currentPage,
    totalPages,
  };
}
