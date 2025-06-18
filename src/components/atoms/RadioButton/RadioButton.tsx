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

export type RadioButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const RadioButton: React.FC<Readonly<RadioButtonProps>> = ({
  label,
  selected,
  onPress,
  style,
}) => {
  const { gray300, gray700, secondaryColor50, secondaryColor500, white } =
    useColors();

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
    >
      <View
        style={[
          styles.circle,
          {
            backgroundColor: selected ? secondaryColor50 : white,
            borderColor: selected ? secondaryColor500 : gray300,
          },
        ]}
      >
        {selected && (
          <View
            testID="inner-circle"
            style={[styles.innerCircle, { backgroundColor: secondaryColor500 }]}
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
  circle: {
    width: 16,
    height: 16,
    borderRadius: 99,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  innerCircle: {
    width: 6,
    height: 6,
    borderRadius: 99,
  },
  label: {},
});

export default React.memo(RadioButton);
