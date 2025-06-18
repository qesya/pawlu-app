import { InputField, Typography } from "@/src/components";
import { useColors } from "@/src/hooks";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

type TextInputFieldProps = React.ComponentProps<typeof InputField> & {
  title?: string;
  isRequired?: boolean;
  description?: string;
  errorMessage?: string;
  containerStyle?: ViewStyle;
};

const TextInputField: React.FC<TextInputFieldProps> = ({
  title,
  isRequired = false,
  description,
  errorMessage,
  containerStyle,
  ...restProps
}) => {
  const showError = !!errorMessage;
  const { gray500, gray700 } = useColors();

  const renderBottomText = () => {
    if (showError) {
      return (
        <Typography size="textXS" weight="regular" style={styles.error}>
          {errorMessage}
        </Typography>
      );
    }

    if (description) {
      return (
        <Typography
          size="textXS"
          weight="regular"
          color={gray500}
          style={styles.description}
        >
          {description}
        </Typography>
      );
    }

    return null;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {title && (
        <Typography
          size="textSM"
          weight="medium"
          style={styles.title}
          color={gray700}
        >
          {title}
          {isRequired && (
            <Typography
              size="textSM"
              weight="medium"
              color={gray700}
              style={styles.required}
            >
              {" "}
              *
            </Typography>
          )}
        </Typography>
      )}

      <InputField {...restProps} />

      {renderBottomText()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    marginBottom: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  required: {
    color: "hsla(4, 74%, 49%, 1)",
  },
  description: {
    marginTop: 8,
  },
  error: {
    marginTop: 8,
    color: "hsla(4, 74%, 49%, 1)",
  },
});

export default React.memo(TextInputField);
