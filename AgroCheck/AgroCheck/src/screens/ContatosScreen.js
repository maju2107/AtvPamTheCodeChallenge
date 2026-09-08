import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ContatoItem from "../components/ContatoItem";
import { buscarContatos } from "../services/contactsService";
import { COLORS } from "../styles/globalStyles";

const PAGE_SIZE = 30;

export default function ContatosScreen() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState("");
  const offsetRef = useRef(0);
  const requestIdRef = useRef(0);

  const loadPage = useCallback(async ({ reset = false, query = search } = {}) => {
    if (reset && loading) return;
    if (!reset && (loadingMore || !hasNextPage)) return;

    const requestId = ++requestIdRef.current;
    if (reset) setLoading(true);
    else setLoadingMore(true);
    setError("");

    try {
      const offset = reset ? 0 : offsetRef.current;
      const result = await buscarContatos({
        pageSize: PAGE_SIZE,
        pageOffset: offset,
        name: query
      });

      // Evita que uma resposta antiga sobrescreva uma busca mais recente.
      if (requestId !== requestIdRef.current) return;

      setContacts((old) => (reset ? result.data : [...old, ...result.data]));
      offsetRef.current = offset + result.data.length;
      setHasNextPage(result.hasNextPage && result.data.length > 0);
    } catch (err) {
      if (requestId === requestIdRef.current) {
        setError(err.message || "Não foi possível carregar os contatos.");
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
        setLoadingMore(false);
      }
    }
  }, [hasNextPage, loading, loadingMore, search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      offsetRef.current = 0;
      setHasNextPage(true);
      loadPage({ reset: true, query: search });
    }, 350);

    return () => clearTimeout(timer);
  }, [search]);

  const renderItem = useCallback(({ item }) => <ContatoItem item={item} />, []);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Contatos</Text>
      <Text style={styles.subtitle}>
        Consulta paginada: apenas uma pequena parte dos registros fica na memória.
      </Text>

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={21} color={COLORS.muted} />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Filtrar pelo nome..."
          placeholderTextColor="#8A948D"
          returnKeyType="search"
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {loading && contacts.length === 0 ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.muted}>Consultando contatos...</Text>
        </View>
      ) : (
        <FlatList
          data={contacts}
          keyExtractor={(item, index) => item.id || `${item.name}-${index}`}
          renderItem={renderItem}
          onEndReached={() => loadPage()}
          onEndReachedThreshold={0.5}
          onRefresh={() => loadPage({ reset: true })}
          refreshing={loading}
          removeClippedSubviews
          initialNumToRender={12}
          maxToRenderPerBatch={10}
          windowSize={7}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator style={{ marginVertical: 18 }} color={COLORS.primary} />
            ) : !hasNextPage && contacts.length > 0 ? (
              <Text style={styles.footer}>Todos os resultados desta consulta foram carregados.</Text>
            ) : null
          }
          ListEmptyComponent={
            !loading ? <Text style={styles.empty}>Nenhum contato encontrado.</Text> : null
          }
          contentContainerStyle={{ paddingBottom: 25 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background, padding: 18 },
  title: { fontSize: 27, fontWeight: "900", color: COLORS.text },
  subtitle: { color: COLORS.muted, lineHeight: 20, marginTop: 5, marginBottom: 13 },
  searchBox: {
    minHeight: 50,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 13,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 16, color: COLORS.text },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  muted: { color: COLORS.muted, marginTop: 9 },
  error: { color: COLORS.danger, marginBottom: 8 },
  empty: { textAlign: "center", color: COLORS.muted, marginTop: 40 },
  footer: { textAlign: "center", color: COLORS.muted, paddingVertical: 15, fontSize: 12 }
});