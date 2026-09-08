import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import HomeScreen from "./src/screens/HomeScreen";
import RegistroVisitaScreen from "./src/screens/RegistroVisitaScreen";
import ContatosScreen from "./src/screens/ContatosScreen";
import VisitasScreen from "./src/screens/VisitasScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#245C3A" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "700" },
          contentStyle: { backgroundColor: "#F5F7F2" }
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Registro" component={RegistroVisitaScreen} options={{ title: "Nova visita" }} />
        <Stack.Screen name="Contatos" component={ContatosScreen} options={{ title: "Contatos" }} />
        <Stack.Screen name="Visitas" component={VisitasScreen} options={{ title: "Visitas registradas" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}