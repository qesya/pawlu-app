import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import Checkbox from "../Checkbox";

jest.mock("@/src/hooks", () => ({
  useColors: () => ({
    gray300: "#e0e0e0",
    gray700: "#333333",
    secondaryColor500: "#6200ea",
    secondaryColor50: "#ede7f6",
    white: "#ffffff",
  }),
  useResponsiveFontSize: (size: number) => size,
}));

describe("Checkbox", () => {
  it("renders with the given label", () => {
    const { getByText } = render(
      <Checkbox label="Accept Terms" checked={false} onPress={() => {}} />,
    );
    expect(getByText("Accept Terms")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByRole } = render(
      <Checkbox label="Click Me" checked={false} onPress={onPressMock} />,
    );

    fireEvent.press(getByRole("checkbox"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("renders inner box when checked", () => {
    const { getByTestId } = render(
      <Checkbox label="Checked Box" checked={true} onPress={() => {}} />,
    );
    expect(getByTestId("inner-box")).toBeTruthy();
  });

  it("does not render inner box when unchecked", () => {
    const { queryByTestId } = render(
      <Checkbox label="Unchecked Box" checked={false} onPress={() => {}} />,
    );
    expect(queryByTestId("inner-box")).toBeNull();
  });

  it("applies correct accessibility props", () => {
    const { getByRole } = render(
      <Checkbox label="Accessible Box" checked={true} onPress={() => {}} />,
    );

    const checkbox = getByRole("checkbox");
    expect(checkbox.props.accessibilityState).toEqual({ checked: true });
  });
});
