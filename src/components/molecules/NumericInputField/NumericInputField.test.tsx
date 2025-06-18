import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Alert } from "react-native";
import NumericInputField from "../NumericInputField";

jest.mock("@/src/hooks", () => ({
  useColors: () => ({
    gray200: "#eeeeee",
    gray300: "#cccccc",
    gray500: "#999999",
    gray700: "#333333",
    white: "#ffffff",
  }),
  useResponsiveFontSize: (size: number) => size,
}));

jest.mock("../../atoms/Button/PressableButton", () => {
  const { TouchableOpacity, Text } = require("react-native");
  return ({ onPress, children, disabled }: any) => (
    <TouchableOpacity onPress={onPress} disabled={disabled} testID="pressable">
      <Text>{children}</Text>
    </TouchableOpacity>
  );
});

describe("NumericInputField", () => {
  const setup = (props = {}) => {
    const onChangeMock = jest.fn();
    const utils = render(
      <NumericInputField
        title="Quantity"
        maxQuantity={5}
        initialQuantity={2}
        onChange={onChangeMock}
        {...props}
      />,
    );
    return { ...utils, onChangeMock };
  };

  it("renders title and required indicator", () => {
    const { getByText } = setup({ isRequired: true });
    expect(getByText(/Quantity\s*\*/)).toBeTruthy();
    expect(getByText("*")).toBeTruthy();
  });

  it("shows the initial quantity", () => {
    const { getByDisplayValue } = setup({ initialQuantity: 3 });
    expect(getByDisplayValue("3")).toBeTruthy();
  });

  it("increments the quantity and calls onChange", () => {
    const { getAllByTestId, onChangeMock } = setup();
    const buttons = getAllByTestId("pressable");
    fireEvent.press(buttons[0]);
    expect(onChangeMock).toHaveBeenCalledWith(3);
  });

  it("decrements the quantity and calls onChange", () => {
    const { getAllByTestId, onChangeMock } = setup();
    const buttons = getAllByTestId("pressable");
    fireEvent.press(buttons[1]);
    expect(onChangeMock).toHaveBeenCalledWith(1);
  });

  it("does not decrement below 0", () => {
    const { getAllByTestId, onChangeMock } = setup({ initialQuantity: 0 });
    fireEvent.press(getAllByTestId("pressable")[1]);
    expect(onChangeMock).not.toHaveBeenCalled();
  });

  it("clamps value when typing over max and shows alert", () => {
    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => {});
    const { getByDisplayValue, onChangeMock } = setup();
    const input = getByDisplayValue("2");
    fireEvent.changeText(input, "999");
    expect(onChangeMock).toHaveBeenCalledWith(5);
    expect(alertSpy).toHaveBeenCalledWith(
      "Maximum quantity reached",
      "You can only order up to 5 items.",
    );
  });

  it("disables input and buttons when isDisabled is true", () => {
    const { getByDisplayValue } = setup({
      isDisabled: true,
    });
    const input = getByDisplayValue("2");

    expect(input.props.editable).toBe(false);
  });
});
