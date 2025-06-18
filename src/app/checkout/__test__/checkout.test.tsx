import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { Alert } from "react-native";
import CheckoutScreen from "../index";

const mockHandleChange = jest.fn();
const mockUseForm = jest.fn();

jest.mock("@/src/hooks/useForm", () => ({
  useForm: () => mockUseForm(),
}));

jest.mock("@/src/hooks", () => ({
  useColors: () => ({
    gray200: "#ccc",
    gray700: "#333",
    gray50: "#f9f9f9",
    primaryColor400: "#0044ff",
    secondaryColor300: "#00ddaa",
  }),
}));

jest.mock("@/src/components", () => {
  const { Text, TouchableOpacity } = require("react-native");
  return {
    Typography: ({ children }: any) => <Text>{children}</Text>,
    Button: ({ title, onPress }: any) => (
      <TouchableOpacity onPress={onPress} testID={title}>
        <Text>{title}</Text>
      </TouchableOpacity>
    ),
    CartSummaryCard: ({ onCheckout }: any) => (
      <TouchableOpacity onPress={onCheckout}>
        <Text>Summary</Text>
      </TouchableOpacity>
    ),
    Checkbox: ({ onPress }: any) => (
      <TouchableOpacity onPress={onPress}>
        <Text>Checkbox</Text>
      </TouchableOpacity>
    ),
    DropdownField: () => <Text>Country Dropdown</Text>,
    Footer: () => <Text>Footer</Text>,
    RadioButtonGroup: () => <Text>Radio Buttons</Text>,
    TextInputField: () => <Text>TextInput</Text>,
    Icon: () => <Text>Icon</Text>,
  };
});

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 0 }),
}));

jest.mock("@/src/services", () => ({
  useGetCartAPI: () => ({
    data: {
      subtotal: "€100.00",
      tax: "€20.00",
      shipping: "€5.00",
    },
  }),
  useGetShippingOptionsAPI: () => ({
    data: {
      available_options: [
        {
          id: 1,
          name: "Standard",
          amount: { formatted: "€5.00", amount: 500 },
        },
      ],
    },
  }),
  useCreateOrderFromCartMutationAPI: () => ({
    onCreateOrderFromCartMutationAPI: {
      mutateAsync: jest.fn().mockResolvedValue({}),
      isPending: false,
    },
  }),
}));

jest.mock("@/src/store", () => ({
  useCartStore: () => ({
    cartId: "cart_123",
    resetCart: jest.fn(),
  }),
}));

jest.mock("@/src/utils", () => ({
  extractSummaryTotal: () => ({
    subtotal: "€100.00",
    tax: "€20.00",
    shipping: "€5.00",
  }),
}));

jest.spyOn(Alert, "alert").mockImplementation(() => {});

describe("CheckoutScreen", () => {
  beforeEach(() => {
    mockUseForm.mockReturnValue({
      values: {
        firstName: "John",
        lastName: "Doe",
        company: "",
        vatNumber: "",
        phoneNumber: "123456789",
        address1: "123 Street",
        address2: "",
        city: "City",
        zipCode: "12345",
        country: { label: "Malta", value: "MT" },
        state: { label: "", value: "" },
        shipToDifferentAddress: false,
        selectedShippingOption: 1,
      },
      handleChange: mockHandleChange,
    });
  });

  it("renders Pay now button and triggers checkout flow", async () => {
    const { getByTestId } = render(<CheckoutScreen />);
    fireEvent.press(getByTestId("Pay now"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Success",
        "Order has been created successfully.",
      );
    });
  });

  it("shows error alert if shipping option is missing", async () => {
    mockUseForm.mockReturnValueOnce({
      values: {
        firstName: "John",
        lastName: "Doe",
        company: "",
        vatNumber: "",
        phoneNumber: "123456789",
        address1: "123 Street",
        address2: "",
        city: "City",
        zipCode: "12345",
        country: { label: "Malta", value: "MT" },
        state: { label: "", value: "" },
        shipToDifferentAddress: false,
        selectedShippingOption: null,
      },
      handleChange: mockHandleChange,
    });

    const { getByText } = render(<CheckoutScreen />);
    fireEvent.press(getByText("Pay now"));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "Missing cart ID or shipping option.",
      );
    });
  });
});
