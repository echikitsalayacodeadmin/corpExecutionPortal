import { Image, StyleSheet, View } from "@react-pdf/renderer";
import React from "react";

const Footer = () => {
  const styles = StyleSheet.create({
    footer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      textAlign: "center",
    },
    image: {
      width: "100%",
    },
  });

  return (
    <View style={styles.footer} fixed>
      <Image style={styles.image} src={"/footer.png"} />
    </View>
  );
};

export default Footer;
