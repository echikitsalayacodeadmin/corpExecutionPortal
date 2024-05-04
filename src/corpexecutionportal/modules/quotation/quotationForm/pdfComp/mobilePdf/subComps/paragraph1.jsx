import { Box, Typography } from "@mui/material";
import React from "react";

const Paragraph1 = ({ data }) => {
  const styles = {
    text: {
      fontSize: "15px",
      color: "#000000",
      whiteSpace: "pre-line",
    },
  };
  return (
    <Box>
      <Typography sx={styles.text}>{data?.details}</Typography>
    </Box>
  );
};

export default Paragraph1;
