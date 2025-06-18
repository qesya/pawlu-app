import { ProductOption } from "@/src/domain";
import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import ColorSelector from "../ColorSelector";

jest.mock("@/src/hooks", () => ({
  useColors: () => ({
    gray500: "#888888",
  }),
  useResponsiveFontSize: (size: number) => size,
}));

jest.mock("@/src/components/atoms/ColorCircle", () => {
  const { TouchableOpacity, Text } = require("react-native");
  return ({ color, onPress, isSelected }: any) => (
    <TouchableOpacity
      testID={`color-${color}`}
      onPress={onPress}
      style={{ opacity: isSelected ? 1 : 0.5 }}
    >
      <Text>{color}</Text>
    </TouchableOpacity>
  );
});

describe("ColorSelector", () => {
  const mockColors: ProductOption[] = [
    { id: 1, value: "Red" },
    { id: 2, value: "Blue" },
    { id: 3, value: "Green" },
  ];

  it("renders the title", () => {
    const { getByText } = render(
      <ColorSelector
        title="Select Color"
        colors={mockColors}
        onColorSelect={jest.fn()}
      />,
    );
    expect(getByText("Select Color")).toBeTruthy();
  });

  it("renders all color options", () => {
    const { getByTestId } = render(
      <ColorSelector
        title="Colors"
        colors={mockColors}
        onColorSelect={jest.fn()}
      />,
    );
    expect(getByTestId("color-red")).toBeTruthy();
    expect(getByTestId("color-blue")).toBeTruthy();
    expect(getByTestId("color-green")).toBeTruthy();
  });

  it("calls onColorSelect with the tapped color", () => {
    const onColorSelectMock = jest.fn();
    const { getByTestId } = render(
      <ColorSelector
        title="Pick"
        colors={mockColors}
        onColorSelect={onColorSelectMock}
      />,
    );

    fireEvent.press(getByTestId("color-red"));
    expect(onColorSelectMock).toHaveBeenCalledWith("Red");

    fireEvent.press(getByTestId("color-green"));
    expect(onColorSelectMock).toHaveBeenCalledWith("Green");
  });

  it("shows selected color in controlled mode", () => {
    const { getByTestId } = render(
      <ColorSelector
        title="Controlled"
        colors={mockColors}
        selectedColor="Green"
        onColorSelect={() => {}}
      />,
    );

    expect(getByTestId("color-green").props.style.opacity).toBe(1);
    expect(getByTestId("color-red").props.style.opacity).toBe(0.5);
  });
});
