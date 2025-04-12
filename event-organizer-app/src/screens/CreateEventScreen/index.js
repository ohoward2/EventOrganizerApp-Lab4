import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { createEvent } from "../../services/dbService";
import { AuthContext } from "../../context/AuthContext";
import styles from "./styles";

const CreateEventScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  // Set initial fields' states to ""
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");

  // Function to handle user pressing create event button
  const handleSubmit = async () => {
    // Check that all fields are filled out
    if (!title || !location || !date || !organizer || !ticketPrice) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    // Check that date is in date format
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(date)) {
      Alert.alert("Invalid Date", "Date must be in YYYY-MM-DD format.");
      return;
    }

    // check that price is a number
    const priceNumber = parseFloat(ticketPrice);
    if (isNaN(priceNumber)) {
      Alert.alert("Invalid Price", "Ticket price must be a number.");
      return;
    }

    const eventData = {
      title,
      location,
      date,
      organizer,
      ticketPrice: priceNumber,
      createdBy: user.uid,
    };

    // Create event in firebase firestore then go back to dashboard
    try {
      await createEvent(eventData);
      navigation.goBack();
    } catch (err) {
      Alert.alert("Error", "Could not create event.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>Create a New Event</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Event Title</Text>
        <TextInput
          placeholder="e.g. Hack-A-Thon 2025"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Location</Text>
        <TextInput
          placeholder="e.g. Fanshawe College"
          style={styles.input}
          value={location}
          onChangeText={setLocation}
        />

        <Text style={styles.label}>Event Date (YYYY-MM-DD)</Text>
        <TextInput
          placeholder="e.g. 2025-11-15"
          style={styles.input}
          value={date}
          onChangeText={setDate}
        />

        <Text style={styles.label}>Organizer Name</Text>
        <TextInput
          placeholder="e.g. School of IT"
          style={styles.input}
          value={organizer}
          onChangeText={setOrganizer}
        />

        <Text style={styles.label}>Ticket Price ($)</Text>
        <TextInput
          placeholder="e.g. 35"
          style={styles.input}
          value={ticketPrice}
          onChangeText={setTicketPrice}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.createButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateEventScreen;
