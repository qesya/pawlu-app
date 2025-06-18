import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import ColorCircle from "../ColorCircle";

describe("ColorCircle", () => {
  it("renders inner circle with the given color", () => {
    const { getByTestId } = render(
      <ColorCircle color="#FF0000" isSelected={false} onPress={() => {}} />,
    );
    const innerCircle = getByTestId("inner-circle");
    expect(innerCircle.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ backgroundColor: "#FF0000" }),
      ]),
    );
  });

  it("applies selected border when isSelected is true", () => {
    const { getByTestId } = render(
      <ColorCircle color="#00FF00" isSelected={true} onPress={() => {}} />,
    );
    const outerCircle = getByTestId("outer-circle");

    const flattenedStyle = Array.isArray(outerCircle.props.style)
      ? Object.assign({}, ...outerCircle.props.style)
      : outerCircle.props.style;

    expect(flattenedStyle.borderColor).toBe("hsla(0, 0%, 0%, 1)");
  });

  it("does not apply selected border when isSelected is false", () => {
    const { getByTestId } = render(
      <ColorCircle color="#00FF00" isSelected={false} onPress={() => {}} />,
    );
    const outerCircle = getByTestId("outer-circle");

    const flattenedStyle = Array.isArray(outerCircle.props.style)
      ? Object.assign({}, ...outerCircle.props.style)
      : outerCircle.props.style;

    expect(flattenedStyle.borderColor).toBe("transparent");
  });

  it("calls onPress when tapped", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <ColorCircle color="#0000FF" isSelected={false} onPress={onPressMock} />,
    );

    fireEvent.press(getByTestId("outer-circle"));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
