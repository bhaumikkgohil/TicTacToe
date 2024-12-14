import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <View style={styles.symbolContainer}>
        <View style={styles.symbolBox}>
          <Text style={styles.symbol}>X</Text>
        </View>
        <Text style={styles.symbolO}>O</Text>
      </View>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate("ModeSelection")}
      >
        <Text style={styles.startText}>START</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#FF3D00",
  },
  title: {
    fontSize: 36,
    fontFamily: "Knewave",
    color: "#FFD700",
    textAlign: "center",
  },
  symbolContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  symbolBox: {
    width: 170,
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFD700",
    borderRadius: 20,
    marginBottom: 20,
  },
  symbol: {
    fontSize: 110,
    fontFamily: "Knewave",
    color: "#FF3D00",
  },
  symbolO: {
    fontSize: 110,
    fontFamily: "Knewave",
    color: "#FFD700",
  },
  startButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
  },
  startText: {
    fontSize: 24,
    fontFamily: "Knewave",
    color: "#FF3D00",
    textAlign: "center",
  },
});
