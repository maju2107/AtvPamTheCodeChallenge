import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import VisitaCard from "../components/VisitaCard";
import { COLORS } from "../styles/globalStyles";

export default function VisitasScreen({ route }) {
  const [visitas, setVisitas] = useState([]);

  useEffect(() => {
    const nova = route.params?.novaVisita;
    if (!nova) return;

    setVisitas((old) => {
      if (old.some((item) => item.id === nova.id)) return old;
      return [nova, ...old];
    });
  }, [route.params?.novaVisita]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Visitas registradas</Text>
      <Text style={styles.subtitle}>
        Histórico mantido durante a execução atual do aplicativo.
      </Text>

      <FlatList
        style={{ marginTop: 15 }}
        data={visitas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VisitaCard item={item} />}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Nenhuma auditoria registrada ainda.
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 25 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background, padding: 18 },
  title: { fontSize: 27, fontWeight: "900", color: COLORS.text },
  subtitle: { color: COLORS.muted, lineHeight: 20, marginTop: 5 },
  empty: { textAlign: "center", color: COLORS.muted, marginTop: 50 }
});