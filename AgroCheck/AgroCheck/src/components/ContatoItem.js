import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../styles/globalStyles";

function ContatoItem({ item }) {
  const phone = item.phones?.[0]?.number || "Telefone não informado";
  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {(item.name || "?").trim().charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name || "Sem nome"}</Text>
        <Text style={styles.phone}>{phone}</Text>
      </View>
    </View>
  );
}

export default memo(ContatoItem);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 13,
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#DCEBDD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },
  avatarText: {
    color: COLORS.primary,
    fontWeight: "800"
  },
  name: {
    color: COLORS.text,
    fontWeight: "800",
    fontSize: 15
  },
  phone: {
    color: COLORS.muted,
    marginTop: 3
  }
});