import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../styles/globalStyles";

export default function PrecisaoGPS({ accuracy }) {
  if (accuracy == null) {
    return (
      <View style={styles.container}>
        <View style={[styles.indicator, styles.gray]} />

        <Text style={styles.text}>
          Precisão GPS indisponível
        </Text>
      </View>
    );
  }

  let indicatorStyle;
  let status;

  if (accuracy < 10) {
    indicatorStyle = styles.green;
    status = "Alta precisão";
  } else if (accuracy <= 30) {
    indicatorStyle = styles.yellow;
    status = "Média precisão";
  } else {
    indicatorStyle = styles.red;
    status = "Baixa precisão";
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.indicator,
          indicatorStyle
        ]}
      />

      <Text style={styles.text}>
        {status} — ±{accuracy.toFixed(1)} m
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8
  },

  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8
  },

  green: {
    backgroundColor: "green"
  },

  yellow: {
    backgroundColor: "#E6A700"
  },

  red: {
    backgroundColor: "red"
  },

  gray: {
    backgroundColor: "gray"
  },

  text: {
    color: COLORS.text,
    fontWeight: "600"
  }
});