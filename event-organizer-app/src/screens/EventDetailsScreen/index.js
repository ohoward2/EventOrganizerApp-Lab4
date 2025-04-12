import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {
  getEventDetails,
  toggleFavorite,
  getFavoriteEventIds,
  deleteEvent,
} from "../../services/dbService";
import { AuthContext } from "../../context/AuthContext";
import { useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

const EventDetailsScreen = ({ route, navigation }) => {
  const { eventId } = route.params;
  const { user } = useContext(AuthContext);
  const isFocused = useIsFocused();

  const [event, setEvent] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load event details
  useEffect(() => {
    const loadEventDetails = async () => {
      try {
        const data = await getEventDetails(eventId);
        setEvent(data);

        // Check if this event is favorited by the user
        const favoriteIds = await getFavoriteEventIds(user.uid);
        setIsFavorite(favoriteIds.includes(eventId));
      } catch (err) {
        Alert.alert("Error", "Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };
    if (isFocused) {
      setLoading(true);
      loadEventDetails();
    }
  }, [eventId, isFocused]);

  // Function to handle user pressing "delete event" button
  const handleDeleteEvent = () => {
    // Confirmation alert to check user wants to delete the event
    Alert.alert("Delete Event", "Are you sure you want to delete this event?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteEvent(event.id);
            // Go back after deleting
            navigation.goBack();
          } catch (err) {
            Alert.alert("Error", "Failed to delete event.");
          }
        },
      },
    ]);
  };

  // Function to handle the user adding/un-adding the event to favorites list
  const handleToggleFavorite = async () => {
    try {
      await toggleFavorite(user.uid, eventId, isFavorite);
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  // Indicator for when data is loading
  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  if (!event) return <Text>Event not found.</Text>;

  // Const to check if a user is the creator of the event
  // If user is create "edit event" and "delete event" buttons are available
  // if user is not the creator, only the favorite button is available
  const isEventCreator = user.uid === event.createdBy;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleToggleFavorite}
        >
          <Ionicons
            name={isFavorite ? "star" : "star-outline"}
            size={16}
            color="#fff"
            style={{ marginRight: 5 }}
          />
          <Text style={styles.favoriteText}>
            {isFavorite ? "Unfavorite" : "Add to Favorites"}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{event.title}</Text>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Location:</Text>
        <Text style={styles.detailValue}>{event.location}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Date:</Text>
        <Text style={styles.detailValue}>{event.date}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Organizer:</Text>
        <Text style={styles.detailValue}>{event.organizer}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Ticket Price:</Text>
        <Text style={styles.detailValue}>${event.ticketPrice}</Text>
      </View>

      {isEventCreator && (
        <>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("EditEvent", { event })}
          >
            <Text style={styles.buttonText}>Edit Event</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteEvent}
          >
            <Text style={styles.buttonText}>Delete Event</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default EventDetailsScreen;
