import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { getFavoriteEvents } from "../../services/dbService";
import { AuthContext } from "../../context/AuthContext";
import { useIsFocused } from "@react-navigation/native";
import styles from "./styles";

const FavoritesScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const isFocused = useIsFocused();

  // Load user's favorite events from firestore
  useEffect(() => {
    const loadFavorites = async () => {
      const favs = await getFavoriteEvents(user.uid);
      setFavorites(favs);
    };
    if (isFocused) loadFavorites();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favourite Events</Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.event}
            onPress={() =>
              navigation.navigate("EventDetails", { eventId: item.id })
            }
          >
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventLocation}>{item.location}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FavoritesScreen;
