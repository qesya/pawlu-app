import { useColors } from "@/src/hooks";
import React, { useState } from "react";
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
} from "react-native";

type InputProps = TextInputProps & {
  underlineInput?: boolean;
  isCenterText?: boolean;
  style?: StyleProp<TextStyle>;
  fixedHeightOnMultiline?: boolean;
  customMultilineHeight?: number;
  isDisabled?: boolean;
};

const InputField: React.FC<InputProps> = ({
  underlineInput,
  isCenterText,
  style,
  fixedHeightOnMultiline,
  customMultilineHeight,
  multiline,
  isDisabled = false,
  ...restProps
}) => {
  const {
    gray200,
    gray300,
    gray500,
    gray700,
    secondaryColor300,
    white,
    black,
  } = useColors();

  const [isFocused, setIsFocused] = useState(false);

  const isFilled = !!(
    restProps.value ??
    restProps.defaultValue ??
    ""
  ).toString().length;

  const shadowStyle = {
    shadowColor: "rgba(18, 23, 33, 1)",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
  };

  const getBorderColor = () => {
    if (isDisabled) return gray300;
    if (isFocused) return secondaryColor300;
    return gray300;
  };

  const getBackgroundColor = () => {
    if (isDisabled) return gray200;
    return white;
  };

  const getFontColor = () => {
    if (isFilled) return gray700;
    return black;
  };

  const shouldApplyShadow =
    (isFilled && !isDisabled && !isFocused) || (isDisabled && !isFocused);

  const combinedStyles = [
    styles.input,
    multiline && !fixedHeightOnMultiline && styles.autoHeightMultiline,
    multiline && fixedHeightOnMultiline && styles.inputMultiline,
    multiline &&
      typeof customMultilineHeight === "number" && {
        height: customMultilineHeight,
      },
    {
      backgroundColor: getBackgroundColor(),
      borderColor: getBorderColor(),
      color: getFontColor(),
      fontFamily: "InterRegular",
      fontSize: 16,
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 8,
      ...(shouldApplyShadow && shadowStyle),
    },
    underlineInput && styles.underline,
    isCenterText && styles.centerText,
    style,
  ];

  const CommonProps = {
    style: combinedStyles,
    placeholderTextColor: gray500,
    multiline,
    editable: !isDisabled,
    onFocus: (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      restProps?.onFocus?.(e);
    },
    onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      restProps?.onBlur?.(e);
    },
    ...restProps,
  };

  return <TextInput {...CommonProps} defaultValue={CommonProps.value} />;
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    minHeight: 44,
  },
  autoHeightMultiline: {
    height: "auto",
    minHeight: 52,
    paddingVertical: 16,
  },
  inputMultiline: {
    borderWidth: 0.5,
    paddingVertical: 16,
    textAlignVertical: "top",
  },
  underline: {
    borderWidth: 0,
    borderBottomWidth: 0.5,
  },
  centerText: {
    textAlign: "center",
  },
});

export default React.memo(InputField);
