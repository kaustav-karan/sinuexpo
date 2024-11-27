// LoginScreen.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { auth } from "../firebaseConfig"; // Adjust the path if necessary
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate("Home"); // Navigate to Home screen
    } catch (error) {
      Alert.alert("Login failed", error.message);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/defaultBackgroundImage.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={require("../assets/retroLogoBanner.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button title="Login" onPress={handleLogin} style={styles.button} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "80%", // Adjust width to fit the screen proportionally
    height: undefined,
    aspectRatio: 1, // Keeps the logo square by aspect ratio
    marginBottom: 0,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
});

export default LoginScreen;
