import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AuthNavigator from "./AuthNavigator";
import MainTabNavigator from "./MainTabNavigator";

export default function RootNavigator() {
  const { user } = useContext(AuthContext);

  return user ? <MainTabNavigator /> : <AuthNavigator />;
}
