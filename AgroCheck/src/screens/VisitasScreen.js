import React, { useCallback, useState } from "react";
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import VisitaCard from "../components/VisitaCard";
import { buscarVisitas } from "../services/storageService";
import { COLORS } from "../styles/globalStyles";

export default function VisitasScreen() {
  const [visitas, setVisitas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const carregarVisitas = async () => {
    try {
      setCarregando(true);

      const dados = await buscarVisitas();

      setVisitas(dados);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);

      Alert.alert(
        "Erro",
        "Não foi possível carregar o histórico de auditorias."
      );
    } finally {
      setCarregando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarVisitas();
    }, [])
  );

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>
        Visitas registradas
      </Text>

      <Text style={styles.subtitle}>
        Histórico das auditorias salvas no dispositivo.
      </Text>

      {carregando ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />

          <Text style={styles.loadingText}>
            Carregando histórico...
          </Text>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={visitas}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <VisitaCard item={item} />
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>
              Nenhuma auditoria registrada ainda.
            </Text>
          }
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 18
  },

  title: {
    fontSize: 27,
    fontWeight: "900",
    color: COLORS.text
  },

  subtitle: {
    color: COLORS.muted,
    lineHeight: 20,
    marginTop: 5
  },

  list: {
    marginTop: 15
  },

  listContent: {
    paddingBottom: 25
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  loadingText: {
    color: COLORS.muted,
    marginTop: 10
  },

  empty: {
    textAlign: "center",
    color: COLORS.muted,
    marginTop: 50
  }
});