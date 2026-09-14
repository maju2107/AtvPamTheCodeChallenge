import AsyncStorage from "@react-native-async-storage/async-storage";

const VISITAS_KEY = "@agrocheck:visitas";

export const salvarVisita = async (visita) => {
  try {
    const visitasSalvas = await AsyncStorage.getItem(VISITAS_KEY);

    const visitas = visitasSalvas
      ? JSON.parse(visitasSalvas)
      : [];

    const novaVisita = {
      ...visita,
      id: visita.id || Date.now().toString()
    };

    const novasVisitas = [novaVisita, ...visitas];

    await AsyncStorage.setItem(
      VISITAS_KEY,
      JSON.stringify(novasVisitas)
    );

    return novaVisita;
  } catch (error) {
    console.error("Erro ao salvar visita:", error);

    throw new Error(
      "Não foi possível salvar a visita no dispositivo."
    );
  }
};

export const buscarVisitas = async () => {
  try {
    const visitasSalvas = await AsyncStorage.getItem(VISITAS_KEY);

    if (!visitasSalvas) {
      return [];
    }

    return JSON.parse(visitasSalvas);
  } catch (error) {
    console.error("Erro ao buscar visitas:", error);

    throw new Error(
      "Não foi possível carregar o histórico de visitas."
    );
  }
};

export const limparVisitas = async () => {
  try {
    await AsyncStorage.removeItem(VISITAS_KEY);
  } catch (error) {
    console.error("Erro ao limpar visitas:", error);
  }
};