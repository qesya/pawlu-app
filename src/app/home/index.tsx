import { ProductInfo } from "@/src/domain";
import { useGetProductsAPI } from "@/src/services";
import { extractPaginationInfo, extractProductList } from "@/src/utils";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
import HomeView from "./home-view";

export default function HomeScreen() {
  const [currentPage, setCurrentPage] = useState(1);

  const listRef = useRef<FlashList<ProductInfo>>(null!);

  const { data, isFetching, isLoading } = useGetProductsAPI({
    per_page: 20,
    page: currentPage,
  });

  const products = useMemo(() => {
    return data ? extractProductList(data) : [];
  }, [data]);

  const { totalPages } = useMemo(() => {
    return data
      ? extractPaginationInfo(data)
      : { currentPage: 1, totalPages: 1 };
  }, [data]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const onHandleProductDetails = (slug: string) => {
    router.navigate({ pathname: "/product-details", params: { slug } });
  };

  return (
    <HomeView
      products={products}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      listRef={listRef}
      onPressProductDetails={onHandleProductDetails}
      isLoading={isFetching || isLoading}
    />
  );
}
