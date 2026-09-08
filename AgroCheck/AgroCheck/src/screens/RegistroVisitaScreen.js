import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import BotaoCustomizado from "../components/BotaoCustomizado";
import { capturarFotoEvidencia } from "../services/cameraService";
import { obterLocalizacaoAtual } from "../services/locationService";
import useAcelerometro from "../hooks/useAcelerometro";
import { COLORS } from "../styles/globalStyles";

export default function RegistroVisitaScreen({ navigation }) {
  const [produtor, setProdutor] = useState("");
  const [propriedade, setPropriedade] = useState("");
  const [cultura, setCultura] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [foto, setFoto] = useState(null);
  const [localizacao, setLocalizacao] = useState(null);
  const [carregandoLocalizacao, setCarregandoLocalizacao] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const { accelerationG, peakG, resetPeak } = useAcelerometro();

  async function handleFoto() {
    const uri = await capturarFotoEvidencia();
    if (uri) setFoto(uri);
  }

  async function handleLocalizacao() {
    try {
      setCarregandoLocalizacao(true);
      const location = await obterLocalizacaoAtual();
      setLocalizacao(location);
      Alert.alert("Localização registrada", "O ponto da visita foi capturado com sucesso.");
    } catch (error) {
      Alert.alert("Erro de localização", error.message);
    } finally {
      setCarregandoLocalizacao(false);
    }
  }

  async function finalizarAuditoria() {
    if (!produtor.trim() || !propriedade.trim()) {
      Alert.alert("Dados incompletos", "Informe pelo menos o produtor e a propriedade antes de finalizar.");
      return;
    }

    setEnviando(true);

    // Acelerômetro do Expo trabalha em g.
    // O requisito do projeto bloqueia acima de 2.0g.
    const currentMagnitude = accelerationG;
    const observedPeak = Math.max(peakG, currentMagnitude);

    if (observedPeak > 2.0) {
      setEnviando(false);
      Alert.alert(
        "Instabilidade Física Detectada",
        "A auditoria não pode ser enviada porque foi detectada uma aceleração superior a 2.0g. Mantenha o dispositivo estável e tente novamente."
      );
      resetPeak();
      return;
    }

    const visita = {
      id: Date.now().toString(),
      produtor: produtor.trim(),
      propriedade: propriedade.trim(),
      cultura: cultura.trim(),
      observacoes: observacoes.trim(),
      foto,
      localizacao,
      data: new Date().toISOString()
    };

    setEnviando(false);
    resetPeak();

    navigation.navigate("Visitas", { novaVisita: visita });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Dados da visita</Text>
        <Text style={styles.subtitle}>
          Preencha os dados técnicos e registre as evidências antes de assinar a auditoria.
        </Text>

        <View style={styles.section}>
          <Text style={styles.label}>Produtor *</Text>
          <TextInput style={styles.input} value={produtor} onChangeText={setProdutor} placeholder="Nome do produtor" />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Propriedade *</Text>
          <TextInput style={styles.input} value={propriedade} onChangeText={setPropriedade} placeholder="Nome ou identificação da propriedade" />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Cultura</Text>
          <TextInput style={styles.input} value={cultura} onChangeText={setCultura} placeholder="Ex.: café, milho, soja" />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Observações</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            value={observacoes}
            onChangeText={setObservacoes}
            placeholder="Anotações da visita"
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Evidência fotográfica</Text>
          <BotaoCustomizado
            title={foto ? "Refazer fotografia" : "Capturar fotografia"}
            onPress={handleFoto}
            variant="secondary"
            icon={<Ionicons name="camera-outline" size={21} color={COLORS.primaryDark} />}
          />
          {foto && <Image source={{ uri: foto }} style={styles.photo} />}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Localização</Text>
          <BotaoCustomizado
            title={carregandoLocalizacao ? "Obtendo localização..." : localizacao ? "Atualizar localização" : "Registrar localização"}
            onPress={handleLocalizacao}
            disabled={carregandoLocalizacao}
            variant="secondary"
            icon={<Ionicons name="location-outline" size={21} color={COLORS.primaryDark} />}
          />
          {localizacao && (
            <Text style={styles.locationText}>
              {localizacao.latitude.toFixed(6)}, {localizacao.longitude.toFixed(6)}
            </Text>
          )}
        </View>

        <View style={styles.telemetry}>
          <View style={styles.telemetryHeader}>
            <Ionicons name="speedometer-outline" size={21} color={COLORS.primary} />
            <Text style={styles.telemetryTitle}>Telemetria de segurança</Text>
          </View>
          <Text style={styles.telemetryText}>
            Aceleração atual: {accelerationG.toFixed(2)}g
          </Text>
          <Text style={styles.telemetryText}>
            Pico observado: {peakG.toFixed(2)}g
          </Text>
          <Text style={styles.telemetryHint}>
            Acima de 2.0g, o envio da auditoria é bloqueado.
          </Text>
        </View>

        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <BotaoCustomizado
            title={enviando ? "Validando..." : "Finalizar e Assinar Auditoria"}
            onPress={finalizarAuditoria}
            disabled={enviando}
            icon={<Ionicons name="checkmark-circle-outline" size={21} color="#FFFFFF" />}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 27, fontWeight: "900", color: COLORS.text },
  subtitle: { color: COLORS.muted, lineHeight: 21, marginTop: 6 },
  section: { marginTop: 18 },
  label: { color: COLORS.text, fontWeight: "800", marginBottom: 7 },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.text
  },
  multiline: { minHeight: 105 },
  photo: { width: "100%", height: 220, borderRadius: 14, marginTop: 10 },
  locationText: { color: COLORS.success, fontWeight: "700", marginTop: 8 },
  telemetry: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  telemetryHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  telemetryTitle: { fontWeight: "900", color: COLORS.text, fontSize: 16 },
  telemetryText: { color: COLORS.text, marginTop: 8 },
  telemetryHint: { color: COLORS.muted, marginTop: 8, lineHeight: 19 }
});