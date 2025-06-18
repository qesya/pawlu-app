import {
  Button,
  CartSummaryCard,
  Checkbox,
  DropdownField,
  Footer,
  RadioButtonGroup,
  TextInputField,
  Typography,
} from "@/src/components";
import { DropdownOption } from "@/src/components/molecules/DropdownField/DropdownField";
import { RadioOption } from "@/src/components/molecules/RadioButtonGroup/RadioButtonGroup";
import { CheckoutFormData } from "@/src/domain";
import { useColors } from "@/src/hooks";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type CheckoutViewProps = CheckoutViewPropsBase<CheckoutFormData>;

type CheckoutViewPropsBase<T> = {
  isSummaryMode?: boolean;
  onCheckout: () => void;
  shipping: string;
  subtotal: string;
  tax: string;
  total: string;

  firstName: string;
  lastName: string;
  company: string;
  vatNumber: string;
  phoneNumber: string;
  country: DropdownOption;
  countries: DropdownOption[];
  address1: string;
  address2: string;
  city: string;
  state: DropdownOption;
  states: DropdownOption[];
  zipCode: string;
  selectedShippingOption: number | null;
  shipToDifferentAddress: boolean;

  onFieldChange: <K extends keyof T>(field: K, value: T[K]) => void;
  onCountrySelect: (option: DropdownOption) => void;
  onStateSelect: (option: DropdownOption) => void;
  onToggleShipping: () => void;
  shippingOptions: RadioOption[];
  isCreateOrderLoading: boolean;
};

export default function CheckoutView({
  isSummaryMode,
  onCheckout,
  shipping,
  subtotal,
  tax,
  total,
  firstName,
  lastName,
  company,
  vatNumber,
  phoneNumber,
  country,
  countries,
  address1,
  address2,
  city,
  state,
  states,
  zipCode,
  shipToDifferentAddress,
  onFieldChange,
  onCountrySelect,
  onStateSelect,
  onToggleShipping,
  shippingOptions,
  selectedShippingOption,
  isCreateOrderLoading,
}: Readonly<CheckoutViewProps>) {
  const { primaryColor400, gray200, gray700 } = useColors();
  const { bottom } = useSafeAreaInsets();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innterContainer}>
        <CartSummaryCard
          isSummaryMode={isSummaryMode}
          onCheckout={onCheckout}
          shipping={shipping}
          subtotal={subtotal}
          tax={tax}
          total={total}
          style={styles.summaryWrapper}
        />

        <View style={[styles.billingDetailsWrapper, { borderColor: gray200 }]}>
          <Typography size="textXL" weight="semiBold" style={styles.txtTitle}>
            Billing Details
          </Typography>
        </View>

        <View style={[styles.formWrapper, { borderBottomColor: gray200 }]}>
          <TextInputField
            title="First name"
            placeholder="Enter your first name"
            value={firstName}
            onChangeText={(val) => onFieldChange("firstName", val)}
          />

          <TextInputField
            title="Last name"
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={(val) => onFieldChange("lastName", val)}
          />

          <TextInputField
            title="Company"
            placeholder="Enter your company name"
            value={company}
            onChangeText={(val) => onFieldChange("company", val)}
          />

          <TextInputField
            title="VAT number"
            placeholder="Enter your VAT number"
            value={vatNumber}
            onChangeText={(val) => onFieldChange("vatNumber", val)}
          />

          <TextInputField
            title="Phone number"
            placeholder="012334455"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={(val) => onFieldChange("phoneNumber", val)}
          />

          <DropdownField
            label="Country"
            onSelect={onCountrySelect}
            options={countries}
            selected={country}
            placeholder="Select country"
          />

          <TextInputField
            title="Address line 1"
            placeholder="House number and street name"
            value={address1}
            onChangeText={(val) => onFieldChange("address1", val)}
          />

          <TextInputField
            title="Address line 2"
            placeholder="House number and street name"
            value={address2}
            onChangeText={(val) => onFieldChange("address2", val)}
          />

          <TextInputField
            title="City"
            placeholder="City"
            value={city}
            onChangeText={(val) => onFieldChange("city", val)}
          />

          <DropdownField
            label="State"
            onSelect={onStateSelect}
            options={states}
            selected={state}
            placeholder="Select state"
          />

          <TextInputField
            title="Zip Code"
            placeholder="Zip code"
            value={zipCode}
            onChangeText={(val) => onFieldChange("zipCode", val)}
          />
        </View>

        <View>
          <Typography size="textBase" weight="semiBold" color={gray700}>
            Delivery
          </Typography>

          {shippingOptions.length > 0 ? (
            <View style={[styles.shipOptions, { borderColor: gray200 }]}>
              <RadioButtonGroup
                options={shippingOptions}
                selectedValue={selectedShippingOption ?? ""}
                onChange={(val) =>
                  onFieldChange("selectedShippingOption", Number(val))
                }
              />
            </View>
          ) : (
            <View style={styles.shipOptionsNotAvailable}>
              <Typography
                size="textSM"
                color={gray700}
                style={{ marginTop: 16 }}
              >
                Shipping options are currently unavailable for this location.
              </Typography>
            </View>
          )}
        </View>

        <View style={styles.checkboxWrapper}>
          <Checkbox
            checked={shipToDifferentAddress}
            label="Ship to a different address?"
            onPress={onToggleShipping}
          />
        </View>

        <View>
          <Button
            title="Pay now"
            type="primary"
            onPress={onCheckout}
            isLoading={isCreateOrderLoading}
            isDisabled={isCreateOrderLoading}
          />
        </View>

        <View style={styles.footerWrapper}>
          <Footer />
          <View
            style={{ paddingBottom: bottom, backgroundColor: primaryColor400 }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  txtTitle: {
    marginBottom: 30,
  },
  summaryWrapper: {
    marginTop: 40,
  },
  innterContainer: {
    paddingHorizontal: 16,
  },
  footerWrapper: {
    marginTop: 40,
    marginHorizontal: -16,
  },
  billingDetailsWrapper: {
    borderTopWidth: 1,
    paddingTop: 40,
    marginTop: 40,
    marginBottom: 28,
  },
  formWrapper: {
    marginBottom: 40,
    gap: 24,
    paddingBottom: 40,
    borderBottomWidth: 1,
  },
  shipOptions: {
    marginTop: 40,
    marginBottom: 60,
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  shipOptionsNotAvailable: {
    marginTop: 20,
    marginBottom: 42,
  },
  checkboxWrapper: {
    marginBottom: 60,
  },
});
