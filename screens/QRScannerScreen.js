import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Dialog, Portal, Provider } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { Provider as PaperProvider } from "react-native-paper";
import axios from "axios";

export default function QRScannerScreen() {
  const [location, setLocation] = useState();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const OPTIONS = [
    { label: "Infinix Zone / Respawn", value: "infinixZoneRespawn" },
    { label: "Tech Tacular", value: "techTacular" },
    { label: "Hackathon", value: "hiveWeb3Hackathon" },
    { label: "Startup Summit", value: "startupSummit" },
    { label: "Robo Soccer", value: "roboSoccer" },
    { label: "Robo Rush", value: "roboRush" },
    { label: "Argumental", value: "argumental" },
    { label: "Analytical Acumen", value: "analyticalAcumen" },
    { label: "Hallucin8", value: "hallucin8" },
    { label: "Code Jam", value: "codeJam" },
    { label: "Design Dojo", value: "designDojo" },
  ];

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    try {
      const response = await axios.post(
        `https://api.sinusoid.in/idCard/verify`,
        { token: data, venueId: location }
      );

      if (response.data.code === "200") {
        const name = response.data.name;
        const verifiedUser = response.data.message;
        if (name) {
          setApiResponse(`ID Verified: ${name}\n${verifiedUser}`);

        } else {
          setApiResponse(`Verification failed: No name found`);
        }
      } else {
        setApiResponse(`Verification failed: ${response.data.message}`);
      }

      setDialogVisible(true);
    } catch (error) {
      console.error("Error fetching data: ", error);
      Alert.alert("Error", "Could not verify attendee. Please try again.");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const { width, height } = Dimensions.get("window");
  const squareSize = 250;

  return (
    <Provider>
      <PaperProvider>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Dropdown section placed above the camera view */}
          <View style={styles.dropdownContainer}>
            <Dropdown
              label="Location"
              placeholder="Select Location"
              options={OPTIONS}
              value={location}
              onSelect={setLocation}
              style={styles.dropdown}
              visible={showDropdown}
              onDismiss={() => setShowDropdown(false)}
              showDropDown={() => setShowDropdown(true)}
              listProps={{ scrollEnabled: true }}
            />
          </View>

          {/* Camera section */}
          <View style={styles.container}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />

            <View style={styles.overlay}>
              <View
                style={[
                  styles.sideOverlay,
                  { width, height: (height - squareSize) / 2 },
                ]}
              />
              <View style={styles.centerRow}>
                <View
                  style={[
                    styles.sideOverlay,
                    { width: (width - squareSize) / 2, height: squareSize },
                  ]}
                />
                <View
                  style={[
                    styles.focusSquare,
                    { width: squareSize, height: squareSize },
                  ]}
                />
                <View
                  style={[
                    styles.sideOverlay,
                    { width: (width - squareSize) / 2, height: squareSize },
                  ]}
                />
              </View>
              <View
                style={[
                  styles.sideOverlay,
                  { width, height: (height - squareSize) / 2 },
                ]}
              />
            </View>

            {scanned && (
              <Button
                title={"Tap to Scan Again"}
                onPress={() => setScanned(false)}
                style={styles.scanButton}
              />
            )}

            <Portal>
              <Dialog
                visible={dialogVisible}
                onDismiss={() => setDialogVisible(false)}
              >
                <Dialog.Title>ID Verification</Dialog.Title>
                <Dialog.Content>
                  <Text>{apiResponse}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button
                    title="Close"
                    onPress={() => setDialogVisible(false)}
                  />
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
        </ScrollView>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    padding: 16,
    zIndex: 1, // Ensure dropdown stays on top of other components
    backgroundColor: "#ffffff", // Optional: background for better visibility
  },
  dropdown: {
    width: 300, // Set static width for the dropdown
    maxHeight: 200, // Make options scrollable if needed
    backgroundColor: "#f0f0f0",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  centerRow: {
    flexDirection: "row",
  },
  sideOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  focusSquare: {
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 2,
    backgroundColor: "transparent",
  },
  scanButton: {
    marginTop: 10,
  },
});
