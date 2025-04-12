import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FavoritesScreen from "../screens/FavoritesScreen";
import EditEventScreen from "../screens/EditEventScreen";
import EventDetailsScreen from "../screens/EventDetailsScreen";
const Stack = createStackNavigator();

export default function FavoritesNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen
        name="EditEvent"
        component={EditEventScreen}
        options={{ title: "Edit Event" }}
      />
      <Stack.Screen 
        name="EventDetails" 
        component={EventDetailsScreen} 
      />
    </Stack.Navigator>
  );
}
