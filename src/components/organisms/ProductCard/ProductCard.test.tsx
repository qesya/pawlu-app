import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import ProductCard from "./ProductCard";

jest.mock("@/src/hooks", () => ({
  useColors: () => ({
    gray700: "#333333",
    primaryColor400: "#0070f3",
  }),
}));

jest.mock("@/src/components", () => {
  const { Text, TouchableOpacity } = require("react-native");
  return {
    Typography: ({ children }: any) => <Text>{children}</Text>,
    PressableButton: ({ onPress, children, testID = "product-card" }: any) => (
      <TouchableOpacity onPress={onPress} testID={testID}>
        {children}
      </TouchableOpacity>
    ),
  };
});

describe("ProductCard", () => {
  const props: any = {
    imageSource: { uri: "https://example.com/product.jpg" },
    title: "Sample Product",
    price: "£99.99",
    onPress: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders product title and price", () => {
    const { getByText } = render(<ProductCard {...props} />);
    expect(getByText("Sample Product")).toBeTruthy();
    expect(getByText("£99.99")).toBeTruthy();
  });

  it("calls onPress when card is pressed", () => {
    const { getByTestId } = render(<ProductCard {...props} />);
    fireEvent.press(getByTestId("product-card"));
    expect(props.onPress).toHaveBeenCalledTimes(1);
  });

  it("renders image with correct source", () => {
    const { UNSAFE_getAllByType } = render(<ProductCard {...props} />);
    const images = UNSAFE_getAllByType(require("react-native").Image);
    expect(images.length).toBeGreaterThan(0);
    expect(images[0].props.source).toEqual(props.imageSource);
  });
});
