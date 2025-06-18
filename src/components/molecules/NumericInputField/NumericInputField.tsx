import { Icon, PressableButton, Typography } from "@/src/components";
import { useColors } from "@/src/hooks";
import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";

type NumericInputFieldProps = {
  maxQuantity: number;
  title?: string;
  isRequired?: boolean;
  initialQuantity?: number;
  onChange?: (quantity: number) => void;
  isDisabled?: boolean;
};

const NumericInputField: React.FC<NumericInputFieldProps> = ({
  maxQuantity,
  isRequired,
  title,
  initialQuantity = 0,
  onChange,
  isDisabled = false,
}) => {
  const { gray200, gray300, gray500, gray700, white } = useColors();

  const [quantity, setQuantity] = useState<number>(initialQuantity);
  const [textValue, setTextValue] = useState<string>(
    initialQuantity.toString(),
  );

  const clampQuantity = (value: number, shouldAlert = false) => {
    if (value > maxQuantity) {
      if (shouldAlert) {
        Alert.alert(
          "Maximum quantity reached",
          `You can only order up to ${maxQuantity} items.`,
        );
      }
      return maxQuantity;
    }

    if (value < 0) return 0;
    return value;
  };

  const handleTextChange = (text: string) => {
    setTextValue(text);

    const parsed = parseInt(text, 10);
    if (!isNaN(parsed)) {
      const clamped = clampQuantity(parsed, true);
      setQuantity(clamped);
      setTextValue(clamped.toString());
      onChange?.(clamped);
    }
  };

  const increment = () => {
    const newQuantity = quantity + 1;
    const clamped = clampQuantity(newQuantity, true);

    if (clamped !== quantity) {
      setQuantity(clamped);
      setTextValue(clamped.toString());
      onChange?.(clamped);
    }
  };

  const decrement = () => {
    const newQuantity = clampQuantity(quantity - 1);
    setQuantity(newQuantity);
    setTextValue(newQuantity.toString());
    onChange?.(newQuantity);
  };

  const getBorderColor = () => {
    if (isDisabled) return gray300;
    return gray300;
  };

  const getBackgroundColor = () => {
    if (isDisabled) return gray200;
    return white;
  };

  return (
    <View>
      <Typography
        size="textBase"
        weight="medium"
        style={styles.title}
        color={gray500}
      >
        {title}
        {isRequired && (
          <Typography
            size="textBase"
            weight="medium"
            color={gray500}
            style={styles.required}
          >
            {" "}
            *
          </Typography>
        )}
      </Typography>
      <View
        style={[
          styles.container,
          {
            backgroundColor: getBackgroundColor(),
            borderColor: getBorderColor(),
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              color: isDisabled ? gray500 : gray700,
              backgroundColor: getBackgroundColor(),
            },
          ]}
          value={textValue}
          onChangeText={handleTextChange}
          keyboardType="number-pad"
          editable={!isDisabled}
        />

        <View style={styles.actionWrapper}>
          <View style={styles.actionItemWrapper}>
            <PressableButton
              onPress={increment}
              disabled={isDisabled || quantity >= maxQuantity}
            >
              <Icon icon="chevron-up-icon" width={20} height={20} />
            </PressableButton>
          </View>
          <View style={styles.actionItemWrapper}>
            <PressableButton
              onPress={decrement}
              disabled={isDisabled || quantity <= 0}
            >
              <Icon
                icon="chevron-up-icon"
                width={20}
                height={20}
                style={{ transform: [{ rotate: "180deg" }] }}
              />
            </PressableButton>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderRadius: 8,
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  input: {
    fontFamily: "InterRegular",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 14,
  },
  chevron: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  title: {
    marginBottom: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  required: {
    color: "hsla(4, 74%, 49%, 1)",
  },
  actionWrapper: {
    position: "absolute",
    right: 14,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  actionItemWrapper: {
    height: 18,
  },
});

export default React.memo(NumericInputField);
