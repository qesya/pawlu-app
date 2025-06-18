import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import CartItemCard from "../CartItemCard";

jest.mock("@/src/hooks", () => ({
  useColors: () => ({
    gray500: "#888888",
    gray600: "#666666",
    primaryColor400: "#0000ff",
  }),
  useResponsiveFontSize: (size: number) => size,
}));

jest.mock("@/src/components/atoms/IconButton", () => {
  const { TouchableOpacity, Text } = require("react-native");
  return ({ icon, onPress, testID }: any) => (
    <TouchableOpacity testID={testID ?? icon} onPress={onPress}>
      <Text>{`Icon: ${icon}`}</Text>
    </TouchableOpacity>
  );
});

jest.mock("@/src/components/molecules/DropdownField", () => {
  const { TouchableOpacity, Text } = require("react-native");
  return {
    __esModule: true,
    default: ({ selected, onSelect, testID = "dropdown" }: any) => (
      <TouchableOpacity
        testID={testID}
        onPress={() => onSelect({ label: "2", value: 2 })}
      >
        <Text>{`Selected: ${selected?.label}`}</Text>
      </TouchableOpacity>
    ),
  };
});

describe("CartItemCard", () => {
  const props = {
    title: "Test Product",
    price: "$20",
    selectedQuantity: { label: "1", value: 1 },
    quantityOptions: [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
    ],
    onQuantityChange: jest.fn(),
    onDelete: jest.fn(),
    variantLabel: "Blue, Medium",
    totalPrice: "$40",
  };

  it("renders title, price, variantLabel, and totalPrice", () => {
    const { getByText } = render(<CartItemCard {...props} />);
    expect(getByText("Test Product")).toBeTruthy();
    expect(getByText("$20")).toBeTruthy();
    expect(getByText("Blue, Medium")).toBeTruthy();
    expect(getByText("$40")).toBeTruthy();
  });

  it("calls onDelete when delete icon is pressed", () => {
    const { getByTestId } = render(<CartItemCard {...props} />);
    fireEvent.press(getByTestId("x-icon"));
    expect(props.onDelete).toHaveBeenCalledTimes(1);
  });

  it("calls onQuantityChange with selected value", () => {
    const { getByTestId } = render(<CartItemCard {...props} />);
    fireEvent.press(getByTestId("dropdown"));
    expect(props.onQuantityChange).toHaveBeenCalledWith(2);
  });

  it("renders default image when image is not provided", () => {
    const { UNSAFE_getAllByType } = render(<CartItemCard {...props} />);
    const images = UNSAFE_getAllByType(require("react-native").Image);
    expect(images.length).toBeGreaterThan(0);
    expect(images[0].props.source).toBeDefined();
  });
});
