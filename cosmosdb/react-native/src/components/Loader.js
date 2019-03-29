import React from "react";
import { StyleSheet } from "react-native";
import { View, Spinner, Text } from "native-base";

export default function Loader({ showText }) {
  return (
    <View style={styles.loader}>
      <Spinner color="tomato" />
      {showText && <Text style={styles.loadingText}>Loading Todos...</Text>}
    </View>
  );
}
Loader.defaultProps = {
  showText: false
};
const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { fontSize: 14, color: "#ccc" }
});
