import { Alert, Linking } from "react-native";
import * as ImagePicker from "expo-image-picker";

export async function capturarFotoEvidencia() {
  const permission = await ImagePicker.requestCameraPermissionsAsync();

  if (!permission.granted) {
    if (permission.canAskAgain === false) {
      Alert.alert(
        "Permissão de câmera bloqueada",
        "O acesso à câmera foi bloqueado para o AgroCheck. Abra as configurações do aplicativo no sistema e ative manualmente a permissão de câmera.",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Abrir configurações", onPress: () => Linking.openSettings() }
        ]
      );
    } else {
      Alert.alert(
        "Permissão necessária",
        "A câmera é necessária para registrar a evidência fotográfica da visita técnica."
      );
    }
    return null;
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.8
  });

  if (result.canceled) return null;

  return result.assets?.[0]?.uri ?? null;
}