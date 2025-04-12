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

const SignUpScreen = ({ navigation }) => {
  const { signUp } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Function to handle user pressing the "Create Account" button
  const handleSignUp = async () => {
    // Check that email and password fields are filled out
    if (!email || !password || !confirmPassword) {
      return Alert.alert("Missing fields", "Please fill out all fields.");
    }

    // Check that the password and confirm password fields match
    if (password !== confirmPassword) {
      return Alert.alert("Password mismatch", "Passwords do not match.");
    }

    try {
      // Sign up using firebase auth
      await signUp(email, password);
    } catch (err) {
      Alert.alert("Sign Up Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Event Organizer</Text>
      <Text style={styles.title}>Sign Up</Text>
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
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text style={styles.linkText}>
          Already have an account? Sign in here.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
