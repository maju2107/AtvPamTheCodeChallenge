import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import CardMenu from "../components/CardMenu";
import { COLORS } from "../styles/globalStyles";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={{ backgroundColor: COLORS.background }} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.kicker}>REGISTRO DE VISITAS</Text>
          <Text style={styles.title}>AgroCheck</Text>
          <Text style={styles.subtitle}>
            Registro e auditoria de visitas técnicas agrícolas.
          </Text>
        </View>
        <Ionicons name="leaf" size={52} color="#DCEBDD" />
      </View>

      <Text style={styles.sectionTitle}>Ações rápidas</Text>

      <CardMenu
        icon={<Ionicons name="add-circle-outline" size={27} color={COLORS.primary} />}
        title="Nova visita técnica"
        description="Registre produtor, propriedade, cultura, localização e evidência."
        onPress={() => navigation.navigate("Registro")}
      />

      <CardMenu
        icon={<Ionicons name="people-outline" size={27} color={COLORS.primary} />}
        title="Contatos"
        description="Consulte os contatos do aparelho com busca e carregamento por páginas."
        onPress={() => navigation.navigate("Contatos")}
      />

      <CardMenu
        icon={<Ionicons name="clipboard-outline" size={27} color={COLORS.primary} />}
        title="Visitas registradas"
        description="Visualize as auditorias concluídas nesta execução do aplicativo."
        onPress={() => navigation.navigate("Visitas")}
      />

      <View style={styles.seniorBox}>
        <Text style={styles.seniorTitle}>Nível Sênior</Text>
        <Text style={styles.seniorText}>
          Câmera com tratamento avançado de permissão, telemetria de movimento e consulta de contatos com paginação e filtro nativo.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 35 },
  header: {
    backgroundColor: COLORS.primary,
    borderRadius: 22,
    padding: 22,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  kicker: { color: "#CDE4D2", fontSize: 11, fontWeight: "800", letterSpacing: 1 },
  title: { color: "#FFFFFF", fontSize: 34, fontWeight: "900", marginTop: 5 },
  subtitle: { color: "#E4F1E7", marginTop: 7, maxWidth: 270, lineHeight: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "900", color: COLORS.text, marginBottom: 12 },
  seniorBox: {
    marginTop: 10,
    backgroundColor: "#EEF4EE",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D5E3D6"
  },
  seniorTitle: { color: COLORS.primary, fontWeight: "900", fontSize: 16 },
  seniorText: { color: COLORS.muted, marginTop: 5, lineHeight: 20 }
});