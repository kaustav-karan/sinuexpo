// AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen"; // Adjust the path if necessary
import HomeScreen from "./screens/HomeScreen"; // Create this component
import QRScannerScreen from "./screens/QRScannerScreen"; // Adjust the path if necessary
import QRCountScreen from "./screens/QRCountScreen"; // Adjust the path if necessary

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }} // Hides the header and back button
        />
              <Stack.Screen name="QRScanner" component={QRScannerScreen} options={{
                  headerStyle: {
                        backgroundColor: "#000",
                  },
                  headerTintColor: "#fff",
                    title: "Attendee QR Scanner",
              }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
