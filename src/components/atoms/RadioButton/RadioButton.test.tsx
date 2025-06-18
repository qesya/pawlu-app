import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import RadioButton from "../RadioButton";

jest.mock("@/src/hooks", () => ({
  useColors: () => ({
    gray300: "#cccccc",
    gray700: "#333333",
    secondaryColor500: "#6200ee",
    secondaryColor50: "#ede7f6",
    white: "#ffffff",
  }),
  useResponsiveFontSize: (size: number) => size,
}));

describe("RadioButton", () => {
  it("renders label text", () => {
    const { getByText } = render(
      <RadioButton label="Option A" selected={false} onPress={() => {}} />,
    );
    expect(getByText("Option A")).toBeTruthy();
  });

  it("triggers onPress when tapped", () => {
    const onPressMock = jest.fn();
    const { getByRole } = render(
      <RadioButton label="Option B" selected={false} onPress={onPressMock} />,
    );

    fireEvent.press(getByRole("radio"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("renders inner circle when selected", () => {
    const { getByTestId } = render(
      <RadioButton label="Selected" selected={true} onPress={() => {}} />,
    );

    expect(getByTestId("inner-circle")).toBeTruthy();
  });

  it("does not render inner circle when not selected", () => {
    const { queryByTestId } = render(
      <RadioButton label="Unselected" selected={false} onPress={() => {}} />,
    );

    expect(queryByTestId("inner-circle")).toBeNull();
  });

  it("sets correct accessibility props", () => {
    const { getByRole } = render(
      <RadioButton label="Accessible" selected={true} onPress={() => {}} />,
    );

    const radio = getByRole("radio");
    expect(radio.props.accessibilityState).toEqual({ selected: true });
  });
});
