import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import styles from "./styles";

const SignInScreen = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle the user pressing the "Login" button
  const handleSignIn = async () => {
    // Check that the email and password fields are filled out
    if (!email || !password)
      return Alert.alert("Missing fields", "Please enter email and password");

    try {
      // Sign-in using firebase auth with email and password
      await signIn(email, password);
    } catch (err) {
      Alert.alert("Login failed", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Event Organizer</Text>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSignIn} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.linkText}>
          Don't have an account? Sign up here.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;
