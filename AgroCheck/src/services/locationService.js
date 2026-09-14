import * as Location from "expo-location";

export async function obterLocalizacaoAtual() {
  try {
    const permission = await Location.requestForegroundPermissionsAsync();

    if (permission.status !== "granted") {
      throw new Error(
        "Permissão de localização não concedida. Ative a permissão nas configurações do aparelho."
      );
    }

    const servicosAtivos = await Location.hasServicesEnabledAsync();

    if (!servicosAtivos) {
      throw new Error(
        "O GPS está desativado. Ative a localização do aparelho e tente novamente."
      );
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      altitude: location.coords.altitude,
      accuracy: location.coords.accuracy
    };
  } catch (error) {
    console.error("Erro ao obter localização:", error);

    throw new Error(
      error.message ||
      "Não foi possível obter a localização. Verifique o GPS do aparelho."
    );
  }
}