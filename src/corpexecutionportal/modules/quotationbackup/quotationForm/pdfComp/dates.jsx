import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

const Dates = ({ data }) => {
  const styles = StyleSheet.create({
    dates: {
      width: "100%",
      marginVertical: "5px",
    },
  });

  return (
    <View style={styles.dates}>
      <Text style={{ fontSize: "10px", textAlign: "right" }}>
        Date: {data?.quotationDate}
      </Text>
      <Text style={{ fontSize: "10px", textAlign: "right" }}>
        Valid Til: {data?.quotationExpirationDate}
      </Text>
    </View>
  );
};

export default Dates;
