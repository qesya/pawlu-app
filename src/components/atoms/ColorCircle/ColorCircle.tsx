import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type ColorCircleProps = {
  color: string;
  isSelected: boolean;
  onPress: () => void;
};

const ColorCircle: React.FC<ColorCircleProps> = ({
  color,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      testID="outer-circle"
      style={[styles.outerCircle, isSelected && styles.selectedBorder]}
    >
      <View
        testID="inner-circle"
        style={[styles.innerCircle, { backgroundColor: color }]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outerCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  selectedBorder: {
    borderColor: "hsla(0, 0%, 0%, 1)",
  },
  innerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});

export default React.memo(ColorCircle);
