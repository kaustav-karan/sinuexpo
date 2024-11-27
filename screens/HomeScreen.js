// screens/HomeScreen.js
import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
  Image, // Import the Image component
} from "react-native";
import { getAuth, signOut } from "firebase/auth";
import Icon from "react-native-vector-icons/Ionicons"; // Import the icon library

const backgroundImage = require("../assets/defaultBackgroundImage.jpg"); // Adjust the path to your image
const logo = require("../assets/retroLogoBanner.png"); // Adjust the path to your logo image

export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigation.navigate("Login"); // Navigate to the Login screen after logout
    } catch (error) {
      console.error("Error signing out: ", error);
      // Optionally, show an error message to the user
    }
  };

  const [showOptions, setShowOptions] = React.useState(false);

  const handleButtonPress = () => {
    setShowOptions(!showOptions);
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        {/* Logo Image */}
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        {/* Added resizeMode */}
        {/* Logout Button with Icon and Text Side by Side */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <View style={styles.logoutContent}>
            <Icon name="log-out-outline" size={24} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
            {/* Ensure text is wrapped in <Text> */}
          </View>
        </TouchableOpacity>
        {/* Main Buttons */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("QRScanner")}
        >
          <Text style={styles.buttonText}>QR Scanner</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("QRCount")}
        >
          <Text style={styles.buttonText}>QR Count</Text>
        </TouchableOpacity> */}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "80%", // Set the width to a percentage of the container
    height: undefined, // Let the height adjust automatically
    aspectRatio: 1, // Maintain the aspect ratio of the logo
    marginBottom: 0, // Space between logo and logout button
  },
  logoutButton: {
    position: "absolute",
    top: 40,
    left: -20, // Adjusted for better placement
    backgroundColor: "transparent", // Transparent background for the button
    padding: 10, // Add padding for touch area
  },
  logoutContent: {
    flexDirection: "row", // Align icon and text side by side
    alignItems: "center", // Center vertically
  },
  logoutText: {
    color: "#fff", // Text color
    marginLeft: 5, // Space between icon and text
    fontSize: 18, // Font size for the text
  },
  button: {
    backgroundColor: "#007bff", // Button color
    padding: 15,
    borderRadius: 5,
    marginBottom: 20, // Space between buttons
    width: 150, // Set to a specific width
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2, // For Android shadow effect
  },
  buttonText: {
    color: "#fff", // Text color
    fontSize: 18,
    fontWeight: "bold",
  },
});
