import { fireEvent, render } from "@testing-library/react-native";
import { router } from "expo-router";
import React from "react";
import HomeScreen from "../index";

const mockNavigate = jest.fn();

jest.mock("expo-router", () => ({
  router: {
    navigate: jest.fn(),
  },
}));

jest.mock("@/src/services", () => ({
  useGetProductsAPI: () => ({
    data: {
      data: [
        { id: 1, slug: "test-slug", title: "Test Product", price: "€20.00" },
      ],
      meta: {
        pagination: {
          total: 1,
          count: 1,
          per_page: 20,
          current_page: 1,
          total_pages: 3,
        },
      },
    },
    isFetching: false,
    isLoading: false,
  }),
}));

jest.mock("@/src/utils", () => ({
  extractProductList: (data: any) => data.data,
  extractPaginationInfo: (data: any) => ({
    currentPage: 1,
    totalPages: 3,
  }),
}));

jest.mock("../home-view", () => {
  const { View, Text, TouchableOpacity } = require("react-native");
  return {
    __esModule: true,
    default: ({ products, onPageChange, onPressProductDetails }: any) => (
      <View>
        <Text>HomeView</Text>
        {products.map((p: any) => (
          <TouchableOpacity
            key={p.id}
            testID={`product-${p.id}`}
            onPress={() => onPressProductDetails(p.slug)}
          >
            <Text>{p.title}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity testID="next-page" onPress={() => onPageChange(2)}>
          <Text>Next Page</Text>
        </TouchableOpacity>
      </View>
    ),
  };
});

describe("HomeScreen", () => {
  it("renders HomeView and product title", () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText("HomeView")).toBeTruthy();
    expect(getByText("Test Product")).toBeTruthy();
  });

  it("navigates to product details on press", () => {
    const { getByTestId } = render(<HomeScreen />);
    fireEvent.press(getByTestId("product-1"));
    expect(router.navigate).toHaveBeenCalledWith({
      pathname: "/product-details",
      params: { slug: "test-slug" },
    });
  });

  it("triggers pagination change", () => {
    const { getByTestId } = render(<HomeScreen />);
    fireEvent.press(getByTestId("next-page"));
  });
});
