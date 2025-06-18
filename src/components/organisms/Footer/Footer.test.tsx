import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Linking } from "react-native";
import Footer from "../Footer";

jest.mock("@/src/hooks", () => ({
  useColors: () => ({
    primaryColor400: "#0000ff",
    white: "#ffffff",
  }),
}));

jest.mock("@/src/components", () => {
  const { Text, TouchableOpacity } = require("react-native");
  return {
    Typography: ({ children }: any) => <Text>{children}</Text>,
    PressableButton: ({ onPress, children }: any) => (
      <TouchableOpacity
        onPress={onPress}
        testID={`pressable-${children?.props?.children}`}
      >
        {children}
      </TouchableOpacity>
    ),
    ButtonIconGroup: ({ data, onItemPress }: any) => (
      <>
        {data.map((item: any) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onItemPress(item)}
            testID={`social-icon-${item.id}`}
          >
            <Text>{item.icon}</Text>
          </TouchableOpacity>
        ))}
      </>
    ),
  };
});

jest.spyOn(Linking, "openURL").mockImplementation(() => Promise.resolve());

describe("Footer", () => {
  it("renders contact and link sections", () => {
    const { getByText } = render(<Footer />);

    expect(getByText("Contacts")).toBeTruthy();
    expect(getByText("Email: sales@pawlus.mt")).toBeTruthy();
    expect(getByText("Privacy Policy")).toBeTruthy();
    expect(getByText("Terms of Service")).toBeTruthy();
    expect(getByText("Cookie Policy")).toBeTruthy();
  });

  it("handles social icon presses", () => {
    const { getByTestId } = render(<Footer />);

    fireEvent.press(getByTestId("social-icon-facebook"));
    fireEvent.press(getByTestId("social-icon-instagram"));

    expect(Linking.openURL).toHaveBeenCalledWith(
      "https://www.facebook.com/pawlusironmongery",
    );
    expect(Linking.openURL).toHaveBeenCalledWith(
      "https://www.instagram.com/pawlusironmongery",
    );
  });

  it("handles footer link presses", () => {
    const { getByTestId } = render(<Footer />);

    fireEvent.press(getByTestId("pressable-Privacy Policy"));
    fireEvent.press(getByTestId("pressable-Terms of Service"));
    fireEvent.press(getByTestId("pressable-Cookie Policy"));

    expect(Linking.openURL).toHaveBeenCalledWith(
      "https://pawlus.mt/terms/rental.php",
    );
    expect(Linking.openURL).toHaveBeenCalledWith(
      "https://pawlus.mt/terms/general.php",
    );
  });
});
