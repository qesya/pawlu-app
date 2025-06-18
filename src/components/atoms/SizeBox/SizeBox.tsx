import { PressableButton, Typography } from "@/src/components";
import { useColors } from "@/src/hooks";
import React from "react";
import { StyleSheet } from "react-native";

type SizeBoxProps = {
  size: string;
  isSelected: boolean;
  onPress: () => void;
};

const SizeBox: React.FC<SizeBoxProps> = ({ size, isSelected, onPress }) => {
  const { secondaryColor400, white, gray200, primaryColor500, gray700 } =
    useColors();

  return (
    <PressableButton
      onPress={onPress}
      style={[
        styles.box,
        {
          backgroundColor: isSelected ? secondaryColor400 : white,
          borderColor: gray200,
        },
      ]}
    >
      <Typography
        size="textBase"
        weight="medium"
        color={isSelected ? primaryColor500 : gray700}
        centerText
      >
        {size}
      </Typography>
    </PressableButton>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 48,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    marginBottom: 8,
  },
});

export default React.memo(SizeBox);
