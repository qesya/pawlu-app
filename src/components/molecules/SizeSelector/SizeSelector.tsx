import { SizeBox, Typography } from "@/src/components";
import { ProductOption } from "@/src/domain";
import { useColors } from "@/src/hooks";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

export type SizeSelectorProps = {
  sizes: ProductOption[];
  title: string;
  onSizeSelect: (size: string) => void;
  selectedSize?: string | null;
};

const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  title,
  onSizeSelect,
  selectedSize,
}) => {
  const { gray500 } = useColors();

  const [internalSelectedSize, setInternalSelectedSize] = useState<
    string | null
  >(null);

  const isControlled = selectedSize !== undefined;
  const currentSelectedSize = isControlled
    ? selectedSize
    : internalSelectedSize;

  const handleSelect = (sizeValue: string) => {
    if (!isControlled) {
      setInternalSelectedSize(sizeValue);
    }
    onSizeSelect(sizeValue);
  };

  return (
    <View style={styles.container}>
      <Typography
        size="textBase"
        weight="medium"
        color={gray500}
        style={styles.title}
      >
        {title}
      </Typography>

      <View style={styles.sizesContainer}>
        {sizes.map((size) => (
          <SizeBox
            key={size.id}
            size={size.value}
            isSelected={currentSelectedSize === size.value}
            onPress={() => handleSelect(size.value)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    marginBottom: 8,
  },
  sizesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default React.memo(SizeSelector);
