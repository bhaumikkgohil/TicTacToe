import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ModeSelection({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate("PlayerInput", { isBotGame: false })}
      >
        <FontAwesome5 name="user" size={40} color="#FF3D00" />
        <View style={styles.textContainer}>
          <Text style={styles.playText}>PLAY VS.</Text>
          <Text style={styles.modeText}>FRIEND</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate("PlayerInput", { isBotGame: true })}
      >
        <FontAwesome5 name="robot" size={40} color="#FF3D00" />
        <View style={styles.textContainer}>
          <Text style={styles.playText}>PLAY VS.</Text>
          <Text style={styles.modeText}>BOT</Text>
        </View>
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
    fontSize: 40,
    fontFamily: "Knewave",
    color: "#FFD700",
    marginBottom: 50,
    textAlign: "center",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FFD700",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: 300,
    marginBottom: 20,
  },
  textContainer: {
    marginLeft: 20,
  },
  playText: {
    fontSize: 18,
    fontFamily: "Knewave",
    color: "#FF3D00",
  },
  modeText: {
    fontSize: 26,
    fontFamily: "Knewave",
    color: "#FF3D00",
  },
  startButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 30,
  },
  startText: {
    fontSize: 24,
    fontFamily: "Knewave",
    color: "#FF3D00",
    textAlign: "center",
  },
});
