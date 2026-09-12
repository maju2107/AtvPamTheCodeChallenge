import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { COLORS } from "../styles/globalStyles";

export default function BotaoCustomizado({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  icon
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        variant === "secondary" && styles.secondary,
        variant === "danger" && styles.danger,
        disabled && styles.disabled
      ]}
    >
      {icon}
      <Text style={[styles.text, variant !== "primary" && styles.darkText]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 50,
    borderRadius: 13,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16
  },
  secondary: {
    backgroundColor: "#E7EFE8"
  },
  danger: {
    backgroundColor: "#FDE8E7"
  },
  disabled: {
    opacity: 0.5
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 15
  },
  darkText: {
    color: COLORS.primaryDark
  }
});