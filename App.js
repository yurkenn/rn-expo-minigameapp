import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/color";
import GameOverScreen from "./screens/GameOverScreen";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const App = () => {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setguessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  };

  const gameOverHandler = (numberOfRounds) => {
    setGameIsOver(true);
    setguessRounds(numberOfRounds);
  };

  const startNewGameHandler = () => {
    setUserNumber(null);
    setguessRounds(0);
  };

  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.primary700, Colors.accent500]}
        style={styles.container}
      >
        <ImageBackground
          source={require("./assets/image/background.png")}
          resizeMode="cover"
          style={styles.container}
          imageStyle={styles.image}
        >
          {screen}
        </ImageBackground>
      </LinearGradient>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    opacity: 0.15,
  },
});
