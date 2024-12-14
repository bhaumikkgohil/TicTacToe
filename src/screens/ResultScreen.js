import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getLeaderboard } from "../services/playerService";

export default function ResultScreen({ navigation, route }) {
  const { winner } = route.params;
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = await getLeaderboard();
      setLeaderboard(data);
    };

    fetchLeaderboard();
  }, []);

  const renderPlayer = ({ item }) => (
    <View style={styles.leaderboardRow}>
      <Text style={styles.leaderboardText}>{item.name}</Text>
      <Text style={styles.leaderboardText}>{item.code}</Text>
      <Text style={styles.leaderboardText}>{item.score}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Winner: {winner}</Text>
      <Text style={styles.subtitle}>Leaderboard</Text>
      <View style={styles.leaderboardHeader}>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Code</Text>
        <Text style={styles.headerText}>Score</Text>
      </View>
      <FlatList
        data={leaderboard}
        keyExtractor={(item) => item.id}
        renderItem={renderPlayer}
        style={styles.leaderboardList}
      />
      <TouchableOpacity
        style={styles.restartButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.restartText}>Back to Home</Text>
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
    marginTop: 150,
    fontSize: 36,
    fontFamily: "Knewave",
    color: "#FFD700",
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 24,
    fontFamily: "Knewave",
    color: "#FFD700",
    marginBottom: 10,
  },
  leaderboardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 15,
  },
  headerText: {
    fontSize: 18,
    color: "#FFD700",
    textAlign: "center",
    flex: 1,
    fontFamily: "Knewave",
  },
  leaderboardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
    marginBottom: 5,
    marginLeft: 10,
  },
  leaderboardText: {
    fontSize: 18,
    color: "#FFD700",
    textAlign: "center",
    flex: 1,
    fontFamily: "Knewave",
  },
  restartButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 200,
  },
  restartText: {
    fontSize: 24,
    fontFamily: "Knewave",
    color: "#FF3D00",
  },
});
