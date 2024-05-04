import { Box } from "@mui/material";
import React from "react";

const Footer = () => {
  const styles = {
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
  };

  return (
    <Box style={styles.footer} fixed>
      <img style={styles.image} src={"/footer.png"} />
    </Box>
  );
};

export default Footer;
