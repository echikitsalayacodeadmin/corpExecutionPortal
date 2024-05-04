import { Box, Typography } from "@mui/material";
import React from "react";

const QuotationTitle = ({ data }) => {
  const styles = {
    text: {
      fontSize: "24px",
      color: "#0E54CC",
      fontWeight: "600",
      textAlign: "center",
      textDecoration: "underline",
    },
  };

  return (
    <Box>
      <Typography sx={styles.text}>{data?.title}</Typography>
    </Box>
  );
};

export default QuotationTitle;
