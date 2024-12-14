import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/configure";

// Function to add a new player
export const addPlayer = async (name) => {
  try {
    // Query to check if player with the same name already exists
    const playerQuery = query(
      collection(db, "players"),
      where("name", "==", name)
    );
    const querySnapshot = await getDocs(playerQuery);

    if (!querySnapshot.empty) {
      // Player exists, return existing player data
      const existingPlayer = querySnapshot.docs[0];
      return { id: existingPlayer.id, ...existingPlayer.data() };
    } else {
      // Player doesn't exist, create a new one
      const code = Math.floor(10000 + Math.random() * 90000).toString(); // Generate 5-digit unique code
      const player = { name, code, score: 0 };
      const docRef = await addDoc(collection(db, "players"), player);
      return { id: docRef.id, ...player };
    }
  } catch (error) {
    console.error("Error adding or fetching player:", error);
    return null;
  }
};

// Function to update a player's score
export const updatePlayerScore = async (playerId, newScore) => {
  try {
    const playerRef = doc(db, "players", playerId);
    await updateDoc(playerRef, { score: newScore });
    return true;
  } catch (error) {
    console.error("Error updating player score:", error);
    return false;
  }
};

// Function to fetch the top 5 players for the leaderboard
export const getLeaderboard = async () => {
  try {
    const leaderboardQuery = query(
      collection(db, "players"),
      orderBy("score", "desc"),
      limit(5) // Limit results to top 5 players
    );
    const querySnapshot = await getDocs(leaderboardQuery);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
};
