import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../constants/color";

const InstructionText = ({ children, style }) => {
  return <Text style={[styles.instrcutionText, style]}>{children}</Text>;
};

export default InstructionText;

const styles = StyleSheet.create({
  instrcutionText: {
    fontFamily: "open-sans",
    color: Colors.accent500,
    fontSize: 24,
  },
});
