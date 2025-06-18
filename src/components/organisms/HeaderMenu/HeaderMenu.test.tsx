import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Image } from "react-native";
import HeaderMenu from "../HeaderMenu";

jest.mock("@/src/components", () => {
  const { Text, TouchableOpacity } = require("react-native");
  return {
    IconButton: ({ icon, onPress, badgeCount }: any) => (
      <TouchableOpacity onPress={onPress} testID={`icon-${icon}`}>
        <Text>{icon}</Text>
        {badgeCount !== undefined && (
          <Text testID="badge-count">{badgeCount}</Text>
        )}
      </TouchableOpacity>
    ),
  };
});

describe("HeaderMenu", () => {
  const defaultProps = {
    onCartPress: jest.fn(),
    badgeCount: 3,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders logo and shopping cart icon", () => {
    const { getByTestId, getByText } = render(<HeaderMenu {...defaultProps} />);

    expect(getByTestId("icon-shopping-bag-icon")).toBeTruthy();
    expect(getByText("shopping-bag-icon")).toBeTruthy();
    expect(getByTestId("badge-count").props.children).toBe(3);
  });

  it("calls onCartPress when cart icon is pressed", () => {
    const { getByTestId } = render(<HeaderMenu {...defaultProps} />);
    fireEvent.press(getByTestId("icon-shopping-bag-icon"));
    expect(defaultProps.onCartPress).toHaveBeenCalledTimes(1);
  });

  it("renders back button when onPressBack is provided", () => {
    const onPressBackMock = jest.fn();
    const { getByTestId } = render(
      <HeaderMenu {...defaultProps} onPressBack={onPressBackMock} />,
    );

    const backButton = getByTestId("icon-chevron-left-icon");
    expect(backButton).toBeTruthy();
    fireEvent.press(backButton);
    expect(onPressBackMock).toHaveBeenCalledTimes(1);
  });

  it("renders custom image source when provided", () => {
    const customSource = { uri: "https://example.com/logo.png" };
    const { UNSAFE_getAllByType } = render(
      <HeaderMenu {...defaultProps} imageSource={customSource} />,
    );

    const images = UNSAFE_getAllByType(Image);
    expect(images.length).toBeGreaterThan(0);
    expect(images[0].props.source).toEqual(customSource);
  });
});
