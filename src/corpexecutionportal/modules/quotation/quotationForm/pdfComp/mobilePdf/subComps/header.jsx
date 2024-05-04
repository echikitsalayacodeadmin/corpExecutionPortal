import { Image, StyleSheet, View, Page } from "@react-pdf/renderer";
import React from "react";

const Header = () => {
  const styles = StyleSheet.create({
    image: {
      width: "100%",
    },
  });

  return (
    <View fixed>
      <Image style={styles.image} src={"/header.png"} />
    </View>
  );
};

export default Header;
