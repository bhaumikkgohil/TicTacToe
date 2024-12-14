import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { addPlayer } from "../services/playerService";

export default function PlayerInputScreen({ navigation, route }) {
  const { isBotGame } = route.params;
  const [player1Name, setPlayer1Name] = useState("");
  const [player2Name, setPlayer2Name] = useState("");

  const handleSubmit = async () => {
    if (!player1Name) {
      alert("Please enter Player 1 name.");
      return;
    }

    // Add Player 1 to the database
    const player1 = await addPlayer(player1Name);

    // If PvP, add Player 2 as well
    let player2 = null;
    if (!isBotGame) {
      if (!player2Name) {
        alert("Please enter Player 2 name.");
        return;
      }
      player2 = await addPlayer(player2Name);
    }

    // Navigate to GameBoard with player details
    navigation.navigate("GameBoard", {
      isBotGame,
      player1,
      player2,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Player Names</Text>
      <Text style={styles.subtitle}>(Player 1 will be X)</Text>
      <TextInput
        style={styles.input}
        placeholder="Player 1 Name"
        placeholderTextColor="#FFD700"
        value={player1Name}
        onChangeText={setPlayer1Name}
      />
      {!isBotGame && (
        <TextInput
          style={styles.input}
          placeholder="Player 2 Name"
          placeholderTextColor="#FFD700"
          value={player2Name}
          onChangeText={setPlayer2Name}
        />
      )}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>START GAME</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF3D00",
  },
  title: {
    fontSize: 28,
    fontFamily: "Knewave",
    color: "#FFD700",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "Knewave",
    color: "#FFD700",
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 50,
    borderColor: "#FFD700",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 20,
    color: "#FFD700",
    backgroundColor: "#FF3D00",
  },
  submitButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  submitText: {
    fontSize: 20,
    fontFamily: "Knewave",
    color: "#FF3D00",
  },
});
