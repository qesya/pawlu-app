import { IconButton, Typography } from "@/src/components";
import { useColors } from "@/src/hooks";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export type DropdownOption = {
  label: string;
  value: string | number;
};

type DropdownProps = {
  label?: string;
  options: DropdownOption[];
  onSelect: (value: DropdownOption) => void;
  selected?: DropdownOption;
  placeholder?: string;
  disabled?: boolean;
};

function Dropdown({
  label,
  options,
  onSelect,
  selected,
  placeholder = "Select",
  disabled = false,
}: Readonly<DropdownProps>) {
  const { gray300, gray500, white, gray700 } = useColors();

  const [visible, setVisible] = useState(false);

  const handleSelect = (option: DropdownOption) => {
    onSelect(option);
    setVisible(false);
  };

  return (
    <View>
      {label && (
        <Typography
          size="textSM"
          weight="medium"
          color={gray700}
          style={styles.label}
        >
          {label}
        </Typography>
      )}

      <TouchableOpacity
        style={[
          styles.dropdown,
          {
            backgroundColor: white,
            borderColor: gray300,
          },
        ]}
        onPress={() => !disabled && setVisible(true)}
        activeOpacity={0.8}
        disabled={disabled}
      >
        <Typography
          size="textBase"
          weight="regular"
          color={selected ? "black" : gray500}
        >
          {selected ? selected.label : placeholder}
        </Typography>

        <IconButton
          icon="chevron-down-icon"
          size={16}
          style={{ padding: 0 }}
          onPress={() => !disabled && setVisible(true)}
        />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <Pressable style={styles.backdrop} onPress={() => setVisible(false)}>
          <View style={[styles.modal, { backgroundColor: white }]}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                >
                  <Typography>{item.label}</Typography>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 44,
    paddingHorizontal: 14,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  modal: {
    marginHorizontal: 32,
    borderRadius: 12,
    maxHeight: 300,
    paddingVertical: 12,
    alignSelf: "stretch",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default React.memo(Dropdown);
