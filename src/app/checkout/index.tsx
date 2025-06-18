import { Icon } from "@/src/components";
import { CheckoutFormData, CreateOrderFromCartPayload } from "@/src/domain";
import { useForm } from "@/src/hooks/useForm";
import {
  useCreateOrderFromCartMutationAPI,
  useGetCartAPI,
  useGetShippingOptionsAPI,
} from "@/src/services";
import { useCartStore } from "@/src/store";
import { extractSummaryTotal } from "@/src/utils";
import React, { useMemo } from "react";
import { Alert } from "react-native";
import { COUNTRY_OPTIONS, STATE_OPTIONS } from "./checkout-data";
import CheckoutView from "./checkout-view";

export default function CheckoutScreen() {
  // STORE
  const { cartId, resetCart } = useCartStore();

  const { values, handleChange } = useForm<CheckoutFormData>({
    firstName: "",
    lastName: "",
    company: "",
    vatNumber: "",
    phoneNumber: "",
    address1: "",
    address2: "",
    city: "",
    zipCode: "",
    country: { label: "", value: "" },
    state: { label: "", value: "" },
    shipToDifferentAddress: false,
    selectedShippingOption: null,
  });

  const countryCode =
    typeof values.country.value === "string"
      ? values.country.value
      : String(values.country.value);

  // API
  const { data: cartData } = useGetCartAPI(cartId);
  const { data: shippingOptions } = useGetShippingOptionsAPI(
    cartId ?? "",
    countryCode,
  );
  const { onCreateOrderFromCartMutationAPI } =
    useCreateOrderFromCartMutationAPI();

  const summary = useMemo(() => extractSummaryTotal(cartData), [cartData]);

  const availableStates = useMemo(() => {
    return STATE_OPTIONS[countryCode] ?? [];
  }, [countryCode]);

  const shippingRadioOptions = useMemo(() => {
    return (
      shippingOptions?.available_options?.map((option) => {
        const isPickup =
          option.name === "Pickup" && option.amount?.amount === 0;

        return {
          label: `${option.name} (${option.amount.formatted})`,
          value: option.id,
          icon: isPickup ? (
            <Icon icon="pickup-icon" width={24} height={24} />
          ) : (
            <Icon icon="deliver-icon" width={24} height={24} />
          ),
        };
      }) ?? []
    );
  }, [shippingOptions]);

  const selectedShipping = useMemo(() => {
    return shippingOptions?.available_options?.find(
      (option) => option.id === values.selectedShippingOption,
    );
  }, [shippingOptions, values.selectedShippingOption]);

  const shippingFormatted =
    selectedShipping?.amount?.formatted ?? summary.shipping;
  const shippingRawAmount = selectedShipping?.amount?.amount ?? 0;

  const totalFormatted = useMemo(() => {
    const subtotal =
      parseFloat(summary.subtotal.replace(/[^0-9.-]+/g, "")) || 0;
    const tax = parseFloat(summary.tax.replace(/[^0-9.-]+/g, "")) || 0;
    const shipping = shippingRawAmount / 100;
    const total = subtotal + tax + shipping;
    return `€${total.toFixed(2)}`;
  }, [summary.subtotal, summary.tax, shippingRawAmount]);

  const onHandleCheckout = async () => {
    if (!cartId || values.selectedShippingOption === null) {
      Alert.alert("Error", "Missing cart ID or shipping option.");
      return;
    }

    const billingAddress = {
      first_name: values.firstName,
      last_name: values.lastName,
      contact_number: values.phoneNumber,
      line1: values.address1,
      line2: values.address2 || "",
      city: values.city,
      sub_division: "",
      country: String(values.country.value),
      postal_code: values.zipCode,
    };

    const payload: CreateOrderFromCartPayload = {
      email: "johndoe@twine.com",
      billing_address: billingAddress,
      shipping_address: billingAddress,
      shipping_address_id: null,
      billing_address_id: null,
      shipping_option_id: String(values.selectedShippingOption),
    };

    try {
      await onCreateOrderFromCartMutationAPI.mutateAsync({ cartId, payload });
      resetCart();
      Alert.alert("Success", "Order has been created successfully.");
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <CheckoutView
      {...values}
      onFieldChange={handleChange}
      onCountrySelect={(opt) => handleChange("country", opt)}
      onStateSelect={(opt) => handleChange("state", opt)}
      onToggleShipping={() =>
        handleChange("shipToDifferentAddress", !values.shipToDifferentAddress)
      }
      onCheckout={onHandleCheckout}
      isSummaryMode
      subtotal={summary.subtotal}
      tax={summary.tax}
      shipping={shippingFormatted}
      total={totalFormatted}
      countries={COUNTRY_OPTIONS}
      states={availableStates}
      shippingOptions={shippingRadioOptions}
      isCreateOrderLoading={onCreateOrderFromCartMutationAPI.isPending}
    />
  );
}
