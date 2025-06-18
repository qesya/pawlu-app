import { DropdownOption } from "../components/molecules/DropdownField/DropdownField";

export type CheckoutFormData = {
  firstName: string;
  lastName: string;
  company: string;
  vatNumber: string;
  phoneNumber: string;
  address1: string;
  address2: string;
  city: string;
  zipCode: string;
  country: DropdownOption;
  state: DropdownOption;
  shipToDifferentAddress: boolean;
  selectedShippingOption: number | null;
};
