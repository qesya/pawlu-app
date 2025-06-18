import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import CartSummaryCard from "../CartSummaryCard";

jest.mock("@/src/hooks", () => ({
  useColors: () => ({
    gray50: "#f9f9f9",
    gray700: "#333333",
    gray200: "#cccccc",
    gray500: "#999999",
  }),
}));

jest.mock("@/src/components", () => {
  const { Text, TouchableOpacity } = require("react-native");
  return {
    Typography: ({ children }: any) => <Text>{children}</Text>,
    Button: ({ title, onPress }: any) => (
      <TouchableOpacity onPress={onPress} testID="checkout-button">
        <Text>{title}</Text>
      </TouchableOpacity>
    ),
  };
});

describe("CartSummaryCard", () => {
  const defaultProps = {
    subtotal: "£100",
    shipping: "£10",
    tax: "£5",
    total: "£115",
    onCheckout: jest.fn(),
  };

  it("renders subtotal, shipping, tax, and total", () => {
    const { getByText } = render(<CartSummaryCard {...defaultProps} />);

    expect(getByText("Subtotal")).toBeTruthy();
    expect(getByText("£100")).toBeTruthy();

    expect(getByText("Shipping estimate")).toBeTruthy();
    expect(getByText("£10")).toBeTruthy();

    expect(getByText("Tax estimate")).toBeTruthy();
    expect(getByText("£5")).toBeTruthy();

    expect(getByText("Total")).toBeTruthy();
    expect(getByText("£115")).toBeTruthy();
  });

  it("renders the Checkout button and handles press", () => {
    const { getByTestId } = render(<CartSummaryCard {...defaultProps} />);
    const checkoutButton = getByTestId("checkout-button");

    fireEvent.press(checkoutButton);
    expect(defaultProps.onCheckout).toHaveBeenCalledTimes(1);
  });

  it("does not render title or button in summary mode", () => {
    const { queryByText, queryByTestId } = render(
      <CartSummaryCard {...defaultProps} isSummaryMode />,
    );

    expect(queryByText("Summary")).toBeNull();
    expect(queryByTestId("checkout-button")).toBeNull();
  });
});
