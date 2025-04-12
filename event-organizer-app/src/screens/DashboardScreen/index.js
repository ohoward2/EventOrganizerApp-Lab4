import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { getAllEvents } from "../../services/dbService";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./styles";

const DashboardScreen = ({ navigation }) => {
  const { logout, user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const isFocused = useIsFocused();

  // Logout button in top right hand corner
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={logout} style={{ marginRight: 16 }}>
          <Ionicons name="log-out-outline" size={24} color="#ff8600" />
        </TouchableOpacity>
      ),
      title: "Events Dashboard",
    });
  }, [navigation]);

  // Get all events from firestore
  useEffect(() => {
    const loadEvents = async () => {
      const data = await getAllEvents();
      setEvents(data);
    };
    if (isFocused) loadEvents();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome, {user?.email}</Text>
      <Text style={styles.subtitle}>Events List:</Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.eventItem}
            onPress={() =>
              navigation.navigate("EventDetails", { eventId: item.id })
            }
          >
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventLocation}>{item.location}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.addEvent}
        onPress={() => navigation.navigate("CreateEvent")}
      >
        <FontAwesome5 name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default DashboardScreen;


