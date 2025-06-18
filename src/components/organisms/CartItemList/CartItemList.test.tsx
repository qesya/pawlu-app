import { render } from "@testing-library/react-native";
import React from "react";
import CartItemList from "../CartItemList";

jest.mock("@/src/hooks", () => ({
  useColors: () => ({
    gray500: "#999999",
    gray200: "#dddddd",
  }),
}));

jest.mock("@/src/components", () => {
  const { Text } = require("react-native");
  return {
    Typography: ({ children }: any) => <Text>{children}</Text>,
    CartItemCard: jest.fn(() => null),
  };
});

jest.mock("@shopify/flash-list", () => ({
  FlashList: ({ data, renderItem }: any) => (
    <>{data.map((item: any, index: number) => renderItem({ item, index }))}</>
  ),
}));

describe("CartItemList", () => {
  const mockProductList = [
    {
      id: "1",
      title: "Product A",
      price: "$10",
      totalPrice: "$10",
      selectedQuantity: { label: "1", value: 1 },
      quantityOptions: [{ label: "1", value: 1 }],
      image: undefined,
      variantLabel: "Red, Small",
    },
  ];

  const onQtyChangeMock = jest.fn();
  const onDeleteMock = jest.fn();

  it("renders header and cart items", () => {
    const { getByText } = render(
      <CartItemList
        productList={mockProductList}
        onQtyChange={onQtyChangeMock}
        onDelete={onDeleteMock}
      />,
    );

    expect(getByText("Product").props.children).toBeTruthy();
  });

  it("calls onQtyChange when quantity changes", () => {
    const { CartItemCard } = require("@/src/components");
    CartItemCard.mockImplementation(({ onQuantityChange }: any) => {
      onQuantityChange(3);
      return null;
    });

    render(
      <CartItemList
        productList={mockProductList}
        onQtyChange={onQtyChangeMock}
        onDelete={onDeleteMock}
      />,
    );

    expect(onQtyChangeMock).toHaveBeenCalledWith("1", 3);
  });

  it("calls onDelete when delete is triggered", () => {
    const { CartItemCard } = require("@/src/components");
    CartItemCard.mockImplementation(({ onDelete }: any) => {
      onDelete();
      return null;
    });

    render(
      <CartItemList
        productList={mockProductList}
        onQtyChange={onQtyChangeMock}
        onDelete={onDeleteMock}
      />,
    );

    expect(onDeleteMock).toHaveBeenCalledWith("1");
  });
});
