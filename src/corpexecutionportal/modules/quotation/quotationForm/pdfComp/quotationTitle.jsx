import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

const QuotationTitle = ({ data }) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: "15px",
      color: "#0E54CC",
      textAlign: "center",
      textDecoration: "underline",
    },
  });

  return (
    <View>
      <Text style={styles.text}>{data?.title}</Text>
    </View>
  );
};

export default QuotationTitle;
