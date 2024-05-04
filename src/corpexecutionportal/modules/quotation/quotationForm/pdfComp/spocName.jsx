import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

const SpocName = ({ data }) => {
  const styles = StyleSheet.create({
    container: {
      marginVertical: "10px",
    },
    text: {
      fontSize: "10px",
      color: "#000000",
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dear {data?.corpSpoc},</Text>
    </View>
  );
};

export default SpocName;
