import { RadioButton } from "@/src/components";
import { useColors } from "@/src/hooks";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

export type RadioOption = {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
};

export type RadioButtonGroupProps = {
  options: RadioOption[];
  selectedValue: string | number;
  onChange: (value: string | number) => void;
  style?: StyleProp<ViewStyle>;
};

const RadioButtonGroup: React.FC<Readonly<RadioButtonGroupProps>> = ({
  options,
  selectedValue,
  onChange,
  style,
}) => {
  const { gray200 } = useColors();

  return (
    <View style={[styles.container, style]}>
      {options.map((option, index) => (
        <View key={option.value}>
          <View style={styles.optionRow}>
            <RadioButton
              label={option.label}
              selected={option.value === selectedValue}
              onPress={() => onChange(option.value)}
              style={styles.radio}
            />
            {option.icon && (
              <View style={styles.iconWrapper}>{option.icon}</View>
            )}
          </View>
          {index < options.length - 1 && (
            <View style={[styles.divider, { backgroundColor: gray200 }]} />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 0,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  radio: {
    flex: 1,
  },
  iconWrapper: {
    marginLeft: 12,
  },
  divider: {
    height: 1,
    width: "100%",
    marginVertical: 20,
  },
});

export default React.memo(RadioButtonGroup);
