import { StyleSheet } from "react-native";

export const COLORS = {
  primary: "#245C3A",
  primaryDark: "#173E28",
  secondary: "#8AAE62",
  background: "#F5F7F2",
  card: "#FFFFFF",
  text: "#1E2A22",
  muted: "#66736A",
  border: "#DCE4DD",
  danger: "#B42318",
  warning: "#B7791F",
  success: "#18794E"
};

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.text
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.muted
  },
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
  label: {
    marginBottom: 7,
    fontWeight: "700",
    color: COLORS.text
  },
  section: {
    marginTop: 18
  }
});