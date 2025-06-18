import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { Alert } from "react-native";
import ProductDetailsScreen from "../index";

jest.mock("expo-router", () => ({
  useLocalSearchParams: () => ({ slug: "test-product" }),
}));

jest.mock("@/src/services", () => ({
  useGetProductsShowAPI: () => ({
    data: {
      id: 1,
      title: "Test Product",
      description: "Test description",
      media: [],
      price: { formatted: "€99.99" },
      variants: [
        { id: 123, options: [], price: { amount: 9999, formatted: "€99.99" } },
      ],
      options: [],
      max_quantity: 5,
    },
    isLoading: false,
  }),
  useCreateCartMutationAPI: () => ({
    onCreateCartMutationAPI: {
      mutateAsync: jest.fn().mockResolvedValue({ id: "new_cart_123" }),
    },
  }),
  useAddCartItemMutationAPI: () => ({
    onAddCartItemMutationAPI: {
      mutateAsync: jest.fn().mockResolvedValue({}),
      isPending: false,
    },
  }),
}));

jest.mock("@/src/store", () => ({
  useLocationStore: () => ({
    location: { id: "location_123" },
  }),
  useCartStore: () => ({
    cartId: null,
    setCartId: jest.fn(),
  }),
}));

jest.mock("@/src/utils", () => ({
  extractProductDetails: () => ({
    id: 123,
    title: "Test Product",
    description: "Product description",
    formattedPrice: "€99.99",
    availableColors: [],
    availableSizes: [],
    maxQuantity: 3,
  }),
}));

jest.mock("@/src/utils/media", () => ({
  mapProductMedia: () => [],
}));

jest.mock("@/src/components", () => {
  const { Text, View, TouchableOpacity } = require("react-native");
  return {
    ProductDetailsView: ({
      title,
      onAddToBag,
      onFavoritePress,
      onQuantityChange,
    }: any) => (
      <View>
        <Text>{title}</Text>
        <TouchableOpacity testID="add-to-bag" onPress={onAddToBag}>
          <Text>Add to Bag</Text>
        </TouchableOpacity>
        <TouchableOpacity testID="add-to-fav" onPress={onFavoritePress}>
          <Text>Add to Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="qty-increase"
          onPress={() => onQuantityChange(2)}
        >
          <Text>Set Qty to 2</Text>
        </TouchableOpacity>
      </View>
    ),
  };
});

jest.spyOn(Alert, "alert").mockImplementation(() => {});

jest.mock("../product-details-view", () => {
  const { Text, View, TouchableOpacity } = require("react-native");

  return {
    __esModule: true,
    default: ({
      title,
      onAddToBag,
      onFavoritePress,
      onQuantityChange,
    }: any) => (
      <View>
        <Text>{title}</Text>
        <TouchableOpacity testID="add-to-bag" onPress={onAddToBag}>
          <Text>Add to Bag</Text>
        </TouchableOpacity>
        <TouchableOpacity testID="add-to-fav" onPress={onFavoritePress}>
          <Text>Add to Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="qty-increase"
          onPress={() => onQuantityChange(2)}
        >
          <Text>Set Qty to 2</Text>
        </TouchableOpacity>
      </View>
    ),
  };
});

describe("ProductDetailsScreen", () => {
  it("renders product details", () => {
    const { getByText } = render(<ProductDetailsScreen />);
    expect(getByText("Test Product")).toBeTruthy();
  });

  it("adds item to bag and shows success alert", async () => {
    const { getByTestId } = render(<ProductDetailsScreen />);

    fireEvent.press(getByTestId("qty-increase"));
    fireEvent.press(getByTestId("add-to-bag"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Success",
        "Item added to cart.",
      );
    });
  });

  it("shows alert when adding to favorites", () => {
    const { getByTestId } = render(<ProductDetailsScreen />);
    fireEvent.press(getByTestId("add-to-fav"));

    expect(Alert.alert).toHaveBeenCalledWith(
      "Not Available",
      expect.stringContaining("not implemented"),
    );
  });
});
