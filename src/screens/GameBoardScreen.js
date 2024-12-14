import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { updatePlayerScore } from "../services/playerService";

export default function GameBoardScreen({ navigation, route }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const { isBotGame, player1, player2 } = route.params || { isBotGame: false };

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Function to check if there's a winner
  const checkWinner = (newBoard) => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }
    return null;
  };

  // Function for bot's move and checking for winner with bot
  const botMove = async (currentBoard) => {
    const availableCells = currentBoard
      .map((cell, index) => (cell === null ? index : null))
      .filter((index) => index !== null);

    if (availableCells.length > 0) {
      const randomIndex =
        availableCells[Math.floor(Math.random() * availableCells.length)];
      const newBoard = [...currentBoard];
      newBoard[randomIndex] = "O"; // Bot always plays 'O'

      setBoard(newBoard);

      const gameWinner = checkWinner(newBoard);
      if (gameWinner) {
        setWinner(gameWinner);

        if (gameWinner === "X") {
          const player1 = route.params.player1;
          if (player1) {
            await updatePlayerScore(player1.id, player1.score + 1);
          }
        }
        navigation.navigate("ResultScreen", { winner: gameWinner });
      } else if (!newBoard.includes(null)) {
        setWinner("Draw");
        const player1 = route.params.player1;
        if (player1) {
          await updatePlayerScore(player1.id, player1.score + 0.5);
        }
        navigation.navigate("ResultScreen", { winner: "Draw" });
      }

      setIsXNext(true);
    }
  };

  // Function to handle player's move and checking for winner with player
  const handlePress = async (index) => {
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);

      if (gameWinner !== "Draw") {
        const winningPlayer =
          gameWinner === "X" ? route.params.player1 : route.params.player2;
        if (winningPlayer) {
          await updatePlayerScore(winningPlayer.id, winningPlayer.score + 1);
        }
      }

      navigation.navigate("ResultScreen", { winner: gameWinner });
    } else if (!newBoard.includes(null)) {
      setWinner("Draw");
      await updatePlayerScore(
        route.params.player1.id,
        route.params.player1.score + 0.5
      );
      await updatePlayerScore(
        route.params.player2.id,
        route.params.player2.score + 0.5
      );
      navigation.navigate("ResultScreen", { winner: "Draw" });
    } else {
      if (isBotGame && isXNext) {
        setIsXNext(false);
        setTimeout(() => botMove(newBoard), 500); // Bot makes a move after a delay
      } else {
        setIsXNext(!isXNext);
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {board.map((cell, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cell}
            onPress={() => handlePress(index)}
          >
            <Text style={styles.cellText}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.exitButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.exitText}>EXIT</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.restartButton} onPress={resetGame}>
        <Text style={styles.restartText}>RESTART</Text>
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
  grid: {
    width: 300,
    height: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    borderColor: "#FFD700",
    borderWidth: 2,
  },
  cell: {
    width: "33.33%",
    height: "33.33%",
    borderColor: "#FFD700",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    fontFamily: "Knewave",

    fontSize: 36,
    fontWeight: "bold",
    color: "#FFD700",
  },
  exitButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 20,
  },
  exitText: {
    fontFamily: "Knewave",

    fontSize: 20,
    fontWeight: "bold",
    color: "#FF3D00",
  },
  restartButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 10,
  },
  restartText: {
    fontFamily: "Knewave",

    fontSize: 20,
    fontWeight: "bold",
    color: "#FF3D00",
  },
});
