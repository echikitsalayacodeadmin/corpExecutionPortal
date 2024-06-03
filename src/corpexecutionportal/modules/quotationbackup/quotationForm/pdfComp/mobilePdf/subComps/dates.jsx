import { Box, Typography } from "@mui/material";
import React from "react";

const Dates = ({ data }) => {
  const styles = {
    dates: {
      marginBlock: "10px",
    },
  };

  return (
    <Box sx={styles.dates}>
      <Typography
        sx={{ fontSize: "15px", textAlign: "right", fontWeight: "600" }}
      >
        Date: {data?.quotationDate}
      </Typography>
      <Typography
        sx={{ fontSize: "15px", textAlign: "right", fontWeight: "600" }}
      >
        Valid Til: {data?.quotationExpirationDate}
      </Typography>
    </Box>
  );
};

export default Dates;
