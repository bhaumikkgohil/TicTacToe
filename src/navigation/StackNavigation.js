import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import GameBoardScreen from "../screens/GameBoardScreen";
import HomeScreen from "../screens/HomeScreen";
import ModeSelectionScreen from "../screens/ModeSelectionScreen";
import PlayerInputScreen from "../screens/PlayerInputScreen";
import ResultScreen from "../screens/ResultScreen";

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ModeSelection" component={ModeSelectionScreen} />
      <Stack.Screen name="PlayerInput" component={PlayerInputScreen} />
      <Stack.Screen name="GameBoard" component={GameBoardScreen} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
    </Stack.Navigator>
  );
}
