import { Typography } from "@/src/components";
import { useColors } from "@/src/hooks";
import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

export type CheckboxProps = {
  label: string;
  checked: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const Checkbox: React.FC<Readonly<CheckboxProps>> = ({
  label,
  checked,
  onPress,
  style,
}) => {
  const { gray300, gray700, secondaryColor500, secondaryColor50, white } =
    useColors();

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={onPress}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
    >
      <View
        style={[
          styles.box,
          {
            backgroundColor: checked ? secondaryColor50 : white,
            borderColor: checked ? secondaryColor500 : gray300,
          },
        ]}
      >
        {checked && (
          <View
            testID="inner-box"
            style={[styles.innerBox, { backgroundColor: secondaryColor500 }]}
          />
        )}
      </View>

      <Typography
        size="textBase"
        color={gray700}
        weight="semiBold"
        style={styles.label}
      >
        {label}
      </Typography>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  box: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  innerBox: {
    width: 8,
    height: 8,
    borderRadius: 2,
  },
  label: {},
});

export default React.memo(Checkbox);
