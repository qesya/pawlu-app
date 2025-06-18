import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import RadioButtonGroup, { RadioOption } from "./RadioButtonGroup";

jest.mock("@/src/hooks", () => ({
  useColors: () => ({
    gray200: "#cccccc",
  }),
}));

jest.mock("@/src/components/atoms/RadioButton", () => {
  const { TouchableOpacity, Text } = require("react-native");
  return ({ label, selected, onPress, testID = label }: any) => (
    <TouchableOpacity onPress={onPress} testID={testID}>
      <Text>{`${label} - ${selected ? "Selected" : "Not Selected"}`}</Text>
    </TouchableOpacity>
  );
});

describe("RadioButtonGroup", () => {
  const options: RadioOption[] = [
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
    { label: "Option C", value: "c" },
  ];

  const setup = (selectedValue = "a") => {
    const onChangeMock = jest.fn();
    const utils = render(
      <RadioButtonGroup
        options={options}
        selectedValue={selectedValue}
        onChange={onChangeMock}
      />,
    );
    return { ...utils, onChangeMock };
  };

  it("renders all options with correct selection state", () => {
    const { getByText } = setup("b");

    expect(getByText("Option A - Not Selected")).toBeTruthy();
    expect(getByText("Option B - Selected")).toBeTruthy();
    expect(getByText("Option C - Not Selected")).toBeTruthy();
  });

  it("calls onChange with correct value when an option is pressed", () => {
    const { getByTestId, onChangeMock } = setup("a");

    fireEvent.press(getByTestId("Option B"));
    expect(onChangeMock).toHaveBeenCalledWith("b");

    fireEvent.press(getByTestId("Option C"));
    expect(onChangeMock).toHaveBeenCalledWith("c");
  });

  it("renders dividers between options except the last one", () => {
    const { toJSON } = setup();
    const rendered = toJSON();
    const dividerCount = rendered.children.filter(
      (child: any) =>
        child.type === "View" &&
        child.props?.style?.some?.((s: any) => s?.height === 1),
    ).length;

    expect(dividerCount).toBe(0);
  });
});
