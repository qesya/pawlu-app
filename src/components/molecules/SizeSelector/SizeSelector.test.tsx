import { ProductOption } from "@/src/domain";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import SizeSelector from "../SizeSelector";

jest.mock("@/src/hooks", () => ({
  useColors: () => ({
    gray500: "#999999",
  }),
}));

jest.mock("@/src/components/atoms/Typography", () => {
  const { Text } = require("react-native");
  return ({ children }: any) => <Text>{children}</Text>;
});

jest.mock("@/src/components/atoms/SizeBox", () => {
  const { TouchableOpacity, Text } = require("react-native");
  return ({ size, isSelected, onPress }: any) => (
    <TouchableOpacity onPress={onPress} testID={size}>
      <Text>{`${size} - ${isSelected ? "Selected" : "Not Selected"}`}</Text>
    </TouchableOpacity>
  );
});

describe("SizeSelector", () => {
  const mockSizes: ProductOption[] = [
    { id: 1, value: "S" },
    { id: 2, value: "M" },
    { id: 3, value: "L" },
  ];

  it("renders title and all size options", () => {
    const { getByText } = render(
      <SizeSelector
        sizes={mockSizes}
        title="Choose Size"
        onSizeSelect={() => {}}
      />,
    );

    expect(getByText("Choose Size")).toBeTruthy();
    expect(getByText("S - Not Selected")).toBeTruthy();
    expect(getByText("M - Not Selected")).toBeTruthy();
    expect(getByText("L - Not Selected")).toBeTruthy();
  });

  it("calls onSizeSelect and updates internal state when uncontrolled", () => {
    const onSizeSelect = jest.fn();
    const { getByTestId, getByText } = render(
      <SizeSelector
        sizes={mockSizes}
        title="Select Size"
        onSizeSelect={onSizeSelect}
      />,
    );

    fireEvent.press(getByTestId("M"));
    expect(onSizeSelect).toHaveBeenCalledWith("M");
    expect(getByText("M - Selected")).toBeTruthy();
  });

  it("respects controlled selectedSize prop", () => {
    const onSizeSelect = jest.fn();
    const { getByText, rerender } = render(
      <SizeSelector
        sizes={mockSizes}
        title="Controlled"
        onSizeSelect={onSizeSelect}
        selectedSize="S"
      />,
    );

    expect(getByText("S - Selected")).toBeTruthy();
    expect(getByText("M - Not Selected")).toBeTruthy();

    rerender(
      <SizeSelector
        sizes={mockSizes}
        title="Controlled"
        onSizeSelect={onSizeSelect}
        selectedSize="L"
      />,
    );
    expect(getByText("L - Selected")).toBeTruthy();
  });

  it("calls onSizeSelect when controlled", () => {
    const onSizeSelect = jest.fn();
    const { getByTestId } = render(
      <SizeSelector
        sizes={mockSizes}
        title="Controlled"
        onSizeSelect={onSizeSelect}
        selectedSize="S"
      />,
    );

    fireEvent.press(getByTestId("L"));
    expect(onSizeSelect).toHaveBeenCalledWith("L");
  });
});
