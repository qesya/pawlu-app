import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import SizeBox from "../SizeBox";

jest.mock("@/src/hooks", () => ({
  useColors: () => ({
    secondaryColor400: "#ffdd00",
    white: "#ffffff",
    gray200: "#eeeeee",
    primaryColor500: "#3333ff",
    gray700: "#444444",
  }),
  useResponsiveFontSize: (size: number) => size,
}));

describe("SizeBox", () => {
  it("renders the size label", () => {
    const { getByText } = render(
      <SizeBox size="M" isSelected={false} onPress={() => {}} />,
    );
    expect(getByText("M")).toBeTruthy();
  });

  it("triggers onPress when tapped", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <SizeBox size="L" isSelected={false} onPress={onPressMock} />,
    );

    fireEvent.press(getByText("L"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("applies correct color when selected", () => {
    const { getByText } = render(
      <SizeBox size="XL" isSelected={true} onPress={() => {}} />,
    );

    const text = getByText("XL");
    const textStyle = Array.isArray(text.props.style)
      ? Object.assign({}, ...text.props.style)
      : text.props.style;

    expect(textStyle.color).toBe("#3333ff");
  });

  it("applies correct color when not selected", () => {
    const { getByText } = render(
      <SizeBox size="S" isSelected={false} onPress={() => {}} />,
    );

    const text = getByText("S");
    const textStyle = Array.isArray(text.props.style)
      ? Object.assign({}, ...text.props.style)
      : text.props.style;

    expect(textStyle.color).toBe("#444444");
  });
});
