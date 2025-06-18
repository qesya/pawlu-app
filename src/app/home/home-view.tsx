import {
  Footer,
  Pagination,
  ProductCard,
  ProductCardSkeleton,
  Typography,
} from "@/src/components";
import { ProductInfo } from "@/src/domain";
import { useColors } from "@/src/hooks";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { Dimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

type HomeViewProps = {
  products: ProductInfo[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  listRef: React.RefObject<FlashList<ProductInfo>>;
  onPressProductDetails: (slug: string) => void;
  isLoading: boolean;
};

export default function HomeView({
  products,
  totalPages,
  currentPage,
  onPageChange,
  listRef,
  onPressProductDetails,
  isLoading,
}: Readonly<HomeViewProps>) {
  const { primaryColor400 } = useColors();
  const inset = useSafeAreaInsets();

  const displayData = isLoading ? Array.from({ length: 12 }) : products;

  return (
    <View style={{ flex: 1 }}>
      <FlashList<ProductInfo>
        ref={listRef}
        data={displayData as ProductInfo[]}
        estimatedItemSize={200}
        numColumns={2}
        ListHeaderComponent={() => (
          <Typography
            size="textXL"
            weight="semiBold"
            centerText
            style={{ marginVertical: 42 }}
          >
            Products
          </Typography>
        )}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item, index }) =>
          isLoading ? (
            <ProductCardSkeleton key={`skeleton-${index}`} />
          ) : (
            <ProductCard
              cardStyle={{ width: (width - 48) / 2 }}
              style={{ marginBottom: 27 }}
              title={item.title}
              imageSource={
                item.square_image
                  ? { uri: item.square_image }
                  : require("../../assets/images/no-image.png")
              }
              onItemPress={() => {}}
              onPress={() => onPressProductDetails(item.slug)}
              price={item.price.formatted}
            />
          )
        }
        keyExtractor={(_, index) =>
          isLoading ? `skeleton-${index}` : products[index].id.toString()
        }
        ListFooterComponent={() => (
          <View style={{ marginHorizontal: -16 }}>
            <View
              style={{
                alignSelf: "flex-end",
                paddingHorizontal: 16,
                marginVertical: 54,
              }}
            >
              <Pagination
                currentPage={currentPage}
                onPageChange={onPageChange}
                totalPages={totalPages}
                maxVisiblePages={2}
              />
            </View>
            <Footer />
            <View
              style={{
                paddingBottom: inset.bottom,
                backgroundColor: primaryColor400,
              }}
            />
          </View>
        )}
      />
    </View>
  );
}
