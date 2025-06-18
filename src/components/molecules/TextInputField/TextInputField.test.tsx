import { render } from "@testing-library/react-native";
import React from "react";
import TextInputField from "../TextInputField";

jest.mock("@/src/hooks", () => ({
  useColors: () => ({
    gray500: "#999999",
    gray700: "#333333",
  }),
}));

jest.mock("@/src/components/atoms/Typography", () => {
  const { Text } = require("react-native");
  return ({ children }: any) => <Text>{children}</Text>;
});

jest.mock("@/src/components/atoms/InputField", () => {
  const { TextInput } = require("react-native");
  return (props: any) => <TextInput {...props} testID="input-field" />;
});

describe("TextInputField", () => {
  it("renders title and required marker", () => {
    const { getByText } = render(
      <TextInputField title="Full Name" isRequired />,
    );

    expect(getByText("Full Name *")).toBeTruthy();
  });

  it("renders InputField", () => {
    const { getByTestId } = render(<TextInputField placeholder="Enter name" />);

    expect(getByTestId("input-field").props.placeholder).toBe("Enter name");
  });

  it("renders description when provided", () => {
    const { getByText } = render(
      <TextInputField description="We’ll never share this." />,
    );

    expect(getByText("We’ll never share this.")).toBeTruthy();
  });

  it("renders error message instead of description", () => {
    const { getByText, queryByText } = render(
      <TextInputField
        description="Helpful note"
        errorMessage="This field is required"
      />,
    );

    expect(getByText("This field is required")).toBeTruthy();
    expect(queryByText("Helpful note")).toBeNull();
  });

  it("applies containerStyle", () => {
    const { getByTestId } = render(
      <TextInputField containerStyle={{ backgroundColor: "red" }} />,
    );

    const input = getByTestId("input-field");
    expect(input).toBeTruthy();
  });
});
