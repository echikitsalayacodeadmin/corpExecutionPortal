import { Box, Typography } from "@mui/material";
import React from "react";

const SpocName = ({ data }) => {
  const styles = {
    container: {
      marginBlock: "10px",
    },
    text: {
      fontSize: "15px",
      fontWeight: "600",
      color: "#000000",
    },
  };
  return (
    <Box sx={styles.container}>
      <Typography sx={styles.text}>Dear {data?.corpSpoc},</Typography>
    </Box>
  );
};

export default SpocName;
