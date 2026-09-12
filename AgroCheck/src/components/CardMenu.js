import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../styles/globalStyles";

export default function CardMenu({ icon, title, description, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.icon}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#E8F1E9",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: COLORS.text,
    fontWeight: "800",
    fontSize: 16
  },
  description: {
    color: COLORS.muted,
    marginTop: 3,
    lineHeight: 19
  },
  arrow: {
    color: COLORS.primary,
    fontSize: 30
  }
});