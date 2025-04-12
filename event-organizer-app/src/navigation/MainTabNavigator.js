import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import AppNavigator from "./AppNavigator";
import FavoritesNavigator from "./FavoritesNavigator";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#ff8600",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "DashboardTab") {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "FavoritesTab") {
            return (
              <FontAwesome5
                name={focused ? "star" : "star"}
                size={size}
                color={color}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen
        name="DashboardTab"
        component={AppNavigator}
        options={{ title: "Dashboard" }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesNavigator}
        options={{ title: "Favorites" }}
      />
    </Tab.Navigator>
  );
}
