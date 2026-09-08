import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../styles/globalStyles";

function VisitaCard({ item }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.produtor || "Produtor não informado"}</Text>
      <Text style={styles.line}>Propriedade: {item.propriedade || "-"}</Text>
      <Text style={styles.line}>Cultura: {item.cultura || "-"}</Text>
      <Text style={styles.line}>
        Localização: {item.localizacao ? `${item.localizacao.latitude.toFixed(5)}, ${item.localizacao.longitude.toFixed(5)}` : "não registrada"}
      </Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Auditoria registrada</Text>
      </View>
    </View>
  );
}

export default memo(VisitaCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  title: {
    color: COLORS.text,
    fontWeight: "800",
    fontSize: 17,
    marginBottom: 8
  },
  line: {
    color: COLORS.muted,
    marginTop: 3
  },
  badge: {
    alignSelf: "flex-start",
    marginTop: 12,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 99,
    backgroundColor: "#E3F3EA"
  },
  badgeText: {
    color: COLORS.success,
    fontWeight: "700",
    fontSize: 12
  }
});