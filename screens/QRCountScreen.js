// screens/QRCountScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function QRCountScreen() {
  const [scanCount, setScanCount] = useState(0);

  useEffect(() => {
    // Load scan count from storage or increment on each scan
    // For now, we’ll just assume we can fetch it
    // setScanCount(fetchedScanCount);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>QR Codes Scanned: {scanCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 24 },
});
