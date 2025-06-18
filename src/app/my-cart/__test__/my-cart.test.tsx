import { fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";
import { Alert } from "react-native";
import MyCartScreen from "../index";

jest.mock("@/src/store", () => ({
  useCartStore: () => ({ cartId: "test_cart_123" }),
}));

jest.mock("@/src/services", () => ({
  useGetCartAPI: () => ({
    data: {
      items: [
        {
          id: "item_1",
          quantity: 1,
          variant: {
            id: "variant_1",
            title: "Test Product",
            product: { title: "Test Product", thumbnail: null },
            price: { formatted: "€10.00", amount: 1000 },
            options: [],
          },
        },
      ],
    },
    isLoading: false,
  }),
  useUpdateCartItemMutationAPI: () => ({
    onUpdateCartItemMutationAPI: {
      mutateAsync: jest.fn().mockResolvedValue({}),
    },
  }),
}));

jest.mock("@/src/utils", () => ({
  extractSummaryTotal: () => ({
    subtotal: "€10.00",
    tax: "€2.00",
    shipping: "€5.00",
    total: "€17.00",
  }),
}));

jest.mock("@/src/utils/extractCartItems", () => ({
  extractCartItems: () => [
    {
      id: "item_1",
      title: "Test Product",
      price: "€10.00",
      totalPrice: "€10.00",
      selectedQuantity: { label: "1", value: 1 },
      quantityOptions: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
      ],
      variantLabel: "Default",
      image: null,
    },
  ],
}));

jest.mock("expo-router", () => ({
  router: {
    navigate: jest.fn(),
  },
}));

jest.mock("@/src/components", () => {
  const { Text, View, TouchableOpacity } = require("react-native");
  return {
    Typography: ({ children }: any) => <Text>{children}</Text>,
    CartItemCard: ({ onQuantityChange, onDelete }: any) => (
      <View>
        <Text>CartItemCard</Text>
        <TouchableOpacity
          testID="increase-qty"
          onPress={() => onQuantityChange(2)}
        >
          <Text>Increase Qty</Text>
        </TouchableOpacity>
        <TouchableOpacity testID="delete-item" onPress={onDelete}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    ),
    CartSummaryCard: ({ onCheckout }: any) => (
      <TouchableOpacity testID="checkout-btn" onPress={onCheckout}>
        <Text>Checkout</Text>
      </TouchableOpacity>
    ),
  };
});

jest.mock("../my-cart-view", () => {
  const { View, Text, TouchableOpacity } = require("react-native");

  return {
    __esModule: true,
    default: ({ productList, onQtyChange, onDelete, onCheckout }: any) => (
      <View>
        <Text>MyCartView</Text>

        <TouchableOpacity
          testID="qty-btn"
          onPress={() => onQtyChange("item_1", 2)}
        >
          <Text>Change Qty</Text>
        </TouchableOpacity>

        <TouchableOpacity
          testID="delete-btn"
          onPress={() => onDelete("item_1")}
        >
          <Text>Delete Item</Text>
        </TouchableOpacity>

        <TouchableOpacity testID="checkout-btn" onPress={onCheckout}>
          <Text>Checkout</Text>
        </TouchableOpacity>
      </View>
    ),
  };
});

jest.spyOn(Alert, "alert").mockImplementation(() => {});

describe("MyCartScreen", () => {
  it("renders cart items and summary", () => {
    const { getByText } = render(<MyCartScreen />);
    expect(getByText("MyCartView")).toBeTruthy();
  });

  it("shows alert when trying to delete item", () => {
    const { getByTestId } = render(<MyCartScreen />);
    fireEvent.press(getByTestId("delete-btn"));
    expect(Alert.alert).toHaveBeenCalledWith(
      "Coming Soon",
      "Delete API isn't available yet.",
    );
  });

  it("navigates to checkout on button press", () => {
    const { getByTestId } = render(<MyCartScreen />);
    fireEvent.press(getByTestId("checkout-btn"));
    expect(router.navigate).toHaveBeenCalledWith("/checkout");
  });
});
