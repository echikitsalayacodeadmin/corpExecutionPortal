import { Font, StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

// Register Hyphenation Callback
Font.registerHyphenationCallback((word) => {
  return [word]; // No hyphenation applied
});

const Paragraph1 = ({ data }) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: 10,
      color: "#000000",
    },
  });

  return (
    <View>
      <Text style={styles.text}>{data?.details}</Text>
    </View>
  );
};

export default Paragraph1;
