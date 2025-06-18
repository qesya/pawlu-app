import { ColorCircle, Typography } from "@/src/components";
import { ProductOption } from "@/src/domain";
import { useColors } from "@/src/hooks";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export type ColorSelectorProps = {
  colors: ProductOption[];
  title: string;
  onColorSelect: (color: string) => void;
  selectedColor?: string | null;
};

const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  title,
  onColorSelect,
  selectedColor,
}) => {
  const { gray500 } = useColors();
  const [internalSelectedColor, setInternalSelectedColor] = useState<
    string | null
  >(null);

  const isControlled = selectedColor !== undefined;
  const currentSelectedColor = isControlled
    ? selectedColor
    : internalSelectedColor;

  const handleSelect = (colorValue: string) => {
    if (!isControlled) {
      setInternalSelectedColor(colorValue);
    }
    onColorSelect(colorValue);
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
      <FlatList
        horizontal
        data={colors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ColorCircle
            color={item.value.toLocaleLowerCase()}
            isSelected={currentSelectedColor === item.value}
            onPress={() => handleSelect(item.value)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
      />
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
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default React.memo(ColorSelector);
