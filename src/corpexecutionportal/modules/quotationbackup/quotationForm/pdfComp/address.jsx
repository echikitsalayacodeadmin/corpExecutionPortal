import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

const Address = ({ data }) => {
  const styles = StyleSheet.create({
    addressBox: {
      maxWidth: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      border: "1.5px solid #000",
      height: "70px",
    },
  });
  return (
    <View style={styles.addressBox}>
      <View
        style={{
          borderRight: "2px solid #000",
          paddingInline: "5px",
          width: "50%",
          padding: "10px",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: "10px" }}>
          Quotation by:
        </Text>
        <Text style={{ fontSize: "10px" }}>
          Uno care (Mysticdoc Healthcare Pvt Ltd) Regd. Office: 253, Shri
          Krishna Avenue, Phase-1, Limbodi Khandwa Road, Indore-452001
        </Text>
      </View>
      <View style={{ paddingInline: "5px", width: "50%", padding: "10px" }}>
        <Text style={{ fontWeight: "bold", fontSize: "10px" }}>
          Quotation For:
        </Text>
        <Text style={{ fontSize: "10px" }}>{data?.corpName}</Text>
        <Text style={{ fontSize: "10px" }}>{data?.corpAddress}</Text>
      </View>
    </View>
  );
};

export default Address;
