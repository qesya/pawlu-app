import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import Dropdown from "./DropdownField";

jest.mock("@/src/hooks", () => ({
  useColors: () => ({
    gray300: "#cccccc",
    gray500: "#999999",
    gray700: "#333333",
    white: "#ffffff",
  }),
  useResponsiveFontSize: (size: number) => size,
}));

jest.mock("@/src/components/atoms/IconButton", () => {
  const { TouchableOpacity, Text } = require("react-native");
  return ({ icon, onPress, testID = "icon-button" }: any) => (
    <TouchableOpacity onPress={onPress} testID={testID}>
      <Text>{icon}</Text>
    </TouchableOpacity>
  );
});

describe("Dropdown", () => {
  const options = [
    { label: "Option A", value: "A" },
    { label: "Option B", value: "B" },
  ];

  it("renders label and placeholder", () => {
    const { getByText } = render(
      <Dropdown label="Choose One" options={options} onSelect={() => {}} />,
    );
    expect(getByText("Choose One")).toBeTruthy();
    expect(getByText("Select")).toBeTruthy();
  });

  it("renders selected label when provided", () => {
    const { getByText } = render(
      <Dropdown
        options={options}
        onSelect={() => {}}
        selected={{ label: "Option A", value: "A" }}
      />,
    );
    expect(getByText("Option A")).toBeTruthy();
  });

  it("opens modal when pressed and shows options", async () => {
    const { getByText } = render(
      <Dropdown options={options} onSelect={() => {}} />,
    );

    fireEvent.press(getByText("Select"));
    await waitFor(() => {
      expect(getByText("Option A")).toBeTruthy();
      expect(getByText("Option B")).toBeTruthy();
    });
  });

  it("calls onSelect with selected option and closes modal", async () => {
    const onSelectMock = jest.fn();
    const { getByText, queryByText } = render(
      <Dropdown options={options} onSelect={onSelectMock} />,
    );

    fireEvent.press(getByText("Select"));
    fireEvent.press(getByText("Option B"));

    await waitFor(() => {
      expect(onSelectMock).toHaveBeenCalledWith({
        label: "Option B",
        value: "B",
      });
      expect(queryByText("Option B")).toBeNull();
    });
  });

  it("does not open modal when disabled", () => {
    const { getByText, queryByText } = render(
      <Dropdown options={options} onSelect={() => {}} disabled />,
    );

    fireEvent.press(getByText("Select"));
    expect(queryByText("Option A")).toBeNull();
  });
});
