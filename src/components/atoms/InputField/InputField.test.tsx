import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import InputField from "../InputField";

jest.mock("@/src/hooks", () => ({
  useColors: () => ({
    gray200: "#eeeeee",
    gray300: "#cccccc",
    gray500: "#999999",
    gray700: "#444444",
    secondaryColor300: "#00aaff",
    white: "#ffffff",
    black: "#000000",
  }),
  useResponsiveFontSize: (size: number) => size,
}));

describe("InputField", () => {
  it("renders with default props", () => {
    const { getByPlaceholderText } = render(
      <InputField placeholder="Enter text" />,
    );
    expect(getByPlaceholderText("Enter text")).toBeTruthy();
  });

  it("calls onFocus and onBlur correctly", () => {
    const onFocusMock = jest.fn();
    const onBlurMock = jest.fn();

    const { getByPlaceholderText } = render(
      <InputField
        placeholder="Focus Test"
        onFocus={onFocusMock}
        onBlur={onBlurMock}
      />,
    );

    const input = getByPlaceholderText("Focus Test");

    fireEvent(input, "focus");
    expect(onFocusMock).toHaveBeenCalled();

    fireEvent(input, "blur");
    expect(onBlurMock).toHaveBeenCalled();
  });

  it("disables input when isDisabled is true", () => {
    const { getByPlaceholderText } = render(
      <InputField placeholder="Disabled" isDisabled />,
    );
    const input = getByPlaceholderText("Disabled");
    expect(input.props.editable).toBe(false);
  });

  it("renders as multiline with default height", () => {
    const { getByPlaceholderText } = render(
      <InputField placeholder="Multiline" multiline />,
    );
    const input = getByPlaceholderText("Multiline");
    expect(input.props.multiline).toBe(true);
  });

  it("renders custom height when customMultilineHeight is set", () => {
    const { getByPlaceholderText } = render(
      <InputField
        placeholder="Custom Height"
        multiline
        customMultilineHeight={120}
      />,
    );
    const input = getByPlaceholderText("Custom Height");
    const style = Array.isArray(input.props.style)
      ? Object.assign({}, ...input.props.style)
      : input.props.style;

    expect(style.height).toBe(120);
  });

  it("applies underline style when underlineInput is true", () => {
    const { getByPlaceholderText } = render(
      <InputField placeholder="Underline" underlineInput />,
    );
    const input = getByPlaceholderText("Underline");

    const style = Array.isArray(input.props.style)
      ? Object.assign({}, ...input.props.style)
      : input.props.style;

    expect(style.borderBottomWidth).toBe(0.5);
    expect(style.borderWidth).toBe(0);
  });

  it("applies center text alignment when isCenterText is true", () => {
    const { getByPlaceholderText } = render(
      <InputField placeholder="Center Text" isCenterText />,
    );
    const input = getByPlaceholderText("Center Text");

    const style = Array.isArray(input.props.style)
      ? Object.assign({}, ...input.props.style)
      : input.props.style;

    expect(style.textAlign).toBe("center");
  });
});
