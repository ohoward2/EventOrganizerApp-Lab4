import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { updateEvent } from "../../services/dbService";
import styles from "./styles";

const EditEventScreen = ({ route, navigation }) => {
  const { event } = route.params;

  // consts  for fields with initial state from event
  const [title, setTitle] = useState(event.title);
  const [location, setLocation] = useState(event.location);
  const [date, setDate] = useState(event.date);
  const [organizer, setOrganizer] = useState(event.organizer);
  const [ticketPrice, setTicketPrice] = useState(event.ticketPrice.toString());

  // Function to handle user pressing "save changes" button
  const handleUpdate = async () => {
    // Check that all fields are filled out
    if (!title || !location || !date || !organizer || !ticketPrice) {
      return Alert.alert("Missing fields", "Please fill in all fields.");
    }

    // Check that date is in date format
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(date)) {
      return Alert.alert("Invalid Date", "Date must be in YYYY-MM-DD format.");
    }

    // Check that ticket price is a number
    const priceNumber = parseFloat(ticketPrice);
    if (isNaN(priceNumber)) {
      return Alert.alert("Invalid Price", "Ticket price must be a number.");
    }

    const updatedEventData = {
      title,
      location,
      date,
      organizer,
      ticketPrice: priceNumber,
    };

    // update event in firestore, then navigate back
    try {
      await updateEvent(event.id, updatedEventData);
      navigation.goBack();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>Edit Event</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Event Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />

        <Text style={styles.label}>Location</Text>
        <TextInput style={styles.input} value={location} onChangeText={setLocation} />

        <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
        />

        <Text style={styles.label}>Organizer Name</Text>
        <TextInput style={styles.input} value={organizer} onChangeText={setOrganizer} />

        <Text style={styles.label}>Ticket Price</Text>
        <TextInput
          style={styles.input}
          value={ticketPrice}
          onChangeText={setTicketPrice}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditEventScreen;
